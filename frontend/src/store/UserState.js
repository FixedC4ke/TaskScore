import { makeAutoObservable } from "mobx";

class UserState {
  token = "";
  constructor() {
    makeAutoObservable(this);
  }
  login(token) {
    this.token = token;
  }
  logout() {
    this.token = "";
  }
}

export default new UserState();