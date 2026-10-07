import axios, {AxiosError} from "axios";
import { instrumentAxios } from "allure-axios";
import Logger from "../logger/logger.js";
import HttpResponse from "./http.response.js";
import ResponseSuccessLogger from "../../src/entity/responseSuccessLogger.js";
import ResponseErrorLogger from "../../src/entity/responseErrorLogger.js";

export default class HttpClient {
    methods = {
        post: 'post',
        delete: 'delete',
    }

    constructor(config) {
        this.config = config
        this.instance = axios.create({
            baseURL: `${this.config.get('BASE_URL')}:${this.config.get('PORT')}`,
        })

        // instrumentAxios(this.instance)

        this.logger = new Logger()
        this.interceptors()
    }

    interceptors() {
        this.instance.interceptors.request.use((config) => {
            config.metadata.startTime = performance.now()

            this.logger.info({
                type: 'request',
                method: config.method,
                url: `${config.baseURL}${config.url}`,
                headers: config.headers,
                data: config.data,
            })

            return config
        }, (error) => {
            return error
        })

        this.instance.interceptors.response.use((response) => {
            const endTime = performance.now()
            const duration = (endTime - response.config.metadata.startTime).toFixed(2)
            response.config.metadata.duration = duration

            this.logger.info(new ResponseSuccessLogger(response))

            return response
        }, (error) => {
            if (error.config?.metadata) {
                const endTime = performance.now()
                error.config.metadata.duration = (endTime - error.config.metadata.startTime).toFixed(2)
            }

            if (error instanceof AxiosError) {
                if (error.response) {
                    this.logger.error(new ResponseErrorLogger(error))
                    return error.response
                }

                this.logger.fatal(error)
            } else {
                this.logger.error(new ResponseErrorLogger(error))
            }

            return Promise.reject(error)
        })
    }

    async request(method, route, data = {}, headers = {}) {
        try {
            const response = await this.instance[method](route, data, { headers })

            return new HttpResponse({
                status: response.status,
                data: response.data,
                headers: response.headers,
                timeout: response.config?.metadata?.duration,
            })
        } catch (error) {
            this.logger.fatal(error)
            throw error
        }
    }

    post(route, data, headers) {
        return this.request(this.methods.post, route, data, headers)
    }

    delete(route, data, headers) {
        return this.request(this.methods.delete, route, data, headers)
    }
}
