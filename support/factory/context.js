import ConfigService from "../../config/config.service.js";
import HttpClient from "../../infrastructure/http/http.client.js";
import API from "../../interfaces/api/api.js";

export function createApi() {
    const config = new ConfigService()
    const httpClient = new HttpClient(config)
    const api = new API(httpClient)

    return { config, httpClient, api }
}