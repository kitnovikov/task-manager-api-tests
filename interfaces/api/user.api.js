import BaseApi from "./base.api.js";

export default class UserApi extends BaseApi {
  deleteById(id) {
    return this.client.delete(`/api/auth/users/${id}`);
  }
}
