import { isInIcestark } from '@ice/stark-app';
import type { GetProp, UploadProps } from 'antd';

export const agentUriPrefix = isInIcestark() ? '/studio/agent' : '';
export const uiStudioUriPrefix = isInIcestark() ? '/studio/agent/ui' : '';

export function uniqueArrayBy(arr, key = 'id') {
  const unique = arr.reduce((acc, current) => {
    const x = acc.find((item) => item[key] === current[key]);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return unique;
}

export function generateUID() {
  const timestamp = Date.now().toString(36); // 将时间戳转换为36进制字符串
  const uid = 'xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return `${timestamp}-${uid}`;
}

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// 将对象转换为数组
export const schemaConvertedArray = (formSchema) => {
  return Object.keys(formSchema).map((key) => {
    return {
      key: generateUID(),
      name: key, // 将键作为 name 属性
      ...formSchema[key], // 展开原始对象的内容
    };
  });
};

// 反转方法：将数组格式转换回对象格式，并将索引写入 x-index
export const reverseArrayToFormSchema = (array) => {
  const result = {};

  array.forEach((item, index) => {
    const { name, ...rest } = item; // 拆分出 name 和其他属性
    result[name] = {
      ...rest,
      'x-index': index, // 添加 x-index 表示数组中的索引
    };
  });

  return result;
};
