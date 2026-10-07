import BaseApi from "./base.api.js";

export default class WorkspaceApi extends BaseApi {
    createWorkspace(data) {
        return this.client.post('/api/workspaces', data)
    }
}