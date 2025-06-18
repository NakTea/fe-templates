import { http } from './index';

export const getOssUploadUri = async (data: object) => {
  return http({
    url: '/ccb/oss/get-presign-url',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...data,
  });
};

export const uploadOssFile = async (data: object) => {
  return http({
    method: 'put',
    ...data,
  });
};
