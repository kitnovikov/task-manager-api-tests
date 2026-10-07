import AuthApi from "./auth.api.js";
import UserApi from "./user.api.js";
import WorkspaceApi from "./workspace.api.js";

export default class API {
    constructor(client) {
        this.client = client

        this.auth = new AuthApi(this.client)
        this.user = new UserApi(this.client)
        this.workspace = new WorkspaceApi(this.client)
    }
}