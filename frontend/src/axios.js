import axios from "axios";
import userstate from "./store/UserState";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

class API {
  async submitForm(params) {
    let { url, formdata } = params;
    let res = await axiosInstance({
      method: "post",
      url: url,
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  }
  async fetchSecuredData(params) {
    let { url } = params;
    let res = await axiosInstance({
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${userstate.token}`,
      },
    });
    return res;
  }
}

export default new API();
