import axiosClient from "./axiosClient";

const orderApi = {
  create: (data) => axiosClient.post("/orders", data),
};

export default orderApi;
