import { AxiosRequestConfig, default as Axios } from "axios";

const appInstance = Axios.create();

export interface TResponse<T> {
  status: boolean;
  data: T;
}

const axios = {
  get: <T, V = TResponse<T>>(
    uri: string,
    config?: AxiosRequestConfig
  ): Promise<V> => {
    return appInstance
      .get<V>(uri, config)
      .then((result) => result)
      .catch((err) => err);
  },
};

export default axios;
