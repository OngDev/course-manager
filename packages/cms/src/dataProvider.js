import crudProvider from "ra-data-nestjsx-crud";
import { HttpError } from "react-admin";
import axios from "./axios";
import omitBy from 'lodash.omitby';

const fetchJson = async function (url, options = {}) {
  try {
    const res = await axios(url, options);
    return {
      status: res.status,
      headers: res.headers,
      body: null,
      json: res.data,
    };
  } catch (error) {
    const {message, status, body} = error
    return Promise.reject(new HttpError(message, status, body))
  }
};

const countDiff = (o1, o2) =>
  omitBy(o1, (v, k) => o2[k] === v);

const dataProvider = crudProvider("http://localhost:3456", fetchJson);

const myDataProvider = {
  ...dataProvider,
  create: async (resource, params) => {
    if (!params.data.thumbnail) {
      // fallback to the default implementation
      return dataProvider.create(resource, params);
    }
    const formData = new FormData();
    formData.append("file", params.data.thumbnail.rawFile);
    if (resource === "courses") {
      formData.append("type", "course-thumb");
    }
    const res = await axios.post("/file", formData);
      const thumbnailUrl = res.data && res.data.data;
      if (thumbnailUrl) {
          const { thumbnail, ...rest } = params.data;
          const requestData = {
              ...rest,
              thumbnailUrl,
          };
          return axios
              .post("/courses", JSON.stringify(requestData))
              .then(({ status, data }) => ({ status, data }));
      }
  },
  update: async (resource, params) => {
    if (!params.data.thumbnail) {
      // fallback to the default implementation
      const data = countDiff(params.data, params.previousData);
      return axios
              .patch(`/${resource}/${params.id}`, data)
              .then(({ status, data }) => ({ status, data }));
    }
    const formData = new FormData();
    formData.append("file", params.data.thumbnail.rawFile);
    if (resource === "courses") {
      formData.append("type", "course-thumb");
    }

    const res = await axios.post("/file", formData);
      const thumbnailUrl = res.data && res.data.data;
      if (thumbnailUrl) {
          const { thumbnail, ...rest } = params.data;
          const requestData = {
              ...rest,
              thumbnailUrl,
          };
          return axios
              .patch(`/${resource}/${params.id}`, JSON.stringify(requestData))
              .then(({ status, data }) => ({ status, data }));
      }
  },
};

export default myDataProvider;
