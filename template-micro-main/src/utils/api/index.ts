import axios from 'axios';
import { generateUID } from '../index';

// 创建axios实例
const service = axios.create();

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['ST-TraceId'] = generateUID();
    return config;
  },
  (error) => {
    // 请求错误处理
    console.log(error); // for debug
    // 为了保证接口顺利执行，不做reject处理
    Promise.resolve(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理，例如只返回data部分
    // console.log('response', response);
    if (response?.data?.code === 401) {
      // console.log('to login');
      // location.href = '/admin/user/login';
    }
    return response;
  },
  (error) => {
    console.log(`err: ${error}`); // for debug
    // 为了保证接口顺利执行，不做reject处理
    return error;
  },
);

export interface IHttp {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  host: string;
  mock: boolean;
  withCredentials: boolean;
  params: {
    [key: string]: any;
  };
  opts: {
    [key: string]: any;
  };
  headers: {
    [key: string]: any;
  };
}

const hostDefault = process.env.NODE_ENV === 'development' ? '/mock' : 'https://website.name.com';

export const http = async ({
  method = 'post',
  url = '',
  mock = false,
  host = hostDefault,
  responseType = '',
  params = {},
  opts = {},
  headers = {},
  timeout = 8000,
  onUploadProgress = () => {},
  withCredentials = true,
}) => {
  if (mock && opts) {
  }
  // console.log('http-params', params);
  // return new Promise(async (resolve, reject) => {
  let response = {};
  const config = {
    timeout,
    headers,
    withCredentials,
    onUploadProgress,
  };
  if (responseType) {
    config.responseType = responseType;
  }
  // console.log('config', config);
  let tempUrl = url;
  const match = tempUrl.match(/\{.*?\}/g);
  // console.log(match, opts);
  if (match) {
    match.forEach((item) => {
      // console.log('item.slice(1, -1)', item.slice(1, -1));
      const value = opts[item.slice(1, -1)];
      if (value) tempUrl = tempUrl.replaceAll(item, value);
    });
  }

  // let tempParams = params
  // if (headers['Content-Type'] === 'multipart/form-data') {
  //   tempParams = new FormData();
  //   for (let key in params) {
  //     tempParams.append(key, params[key]);
  //   }
  // }

  const uri = host + tempUrl;
  if (method === 'put' || method === 'post' || method === 'patch') {
    response = await service[method](uri, params, config);
  } else {
    // config.params = newParams
    response = await service[method](uri, {
      params,
      ...config,
    });
  }
  return response;
  // });
};

export default service;
