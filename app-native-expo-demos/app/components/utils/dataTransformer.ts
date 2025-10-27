/**
 * 通用的深度遍历对象方法，根据指定的key提取所有匹配的值
 * @param obj 要遍历的对象
 * @param targetKey 要查找的key
 * @returns 包含所有匹配值的数组
 */
export function extractValuesByKey<T = any>(obj: any, targetKey: string): T[] {
  const results: T[] = [];

  function traverse(current: any, path: string = '') {
    if (current === null || current === undefined) {
      return;
    }

    // 如果是数组，遍历每个元素
    if (Array.isArray(current)) {
      current.forEach((item, index) => {
        traverse(item, `${path}[${index}]`);
      });
      return;
    }

    // 如果是对象，遍历所有属性
    if (typeof current === 'object') {
      Object.keys(current).forEach(key => {
        const currentPath = path ? `${path}.${key}` : key;

        // 如果找到目标key，添加到结果中
        if (key === targetKey) {
          results.push(current[key]);
        }

        // 递归遍历子对象
        traverse(current[key], currentPath);
      });
    }
  }

  traverse(obj);
  return results;
}

/**
 * 根据路径获取对象中的值
 * @param path 路径字符串，如 'a.b.c' 或 'a.[0].b.c' 或空字符串（表示整个对象）
 * @param obj 目标对象
 * @returns 获取到的值，如果路径不存在则返回 undefined
 */
export function getValueByPath(path: string, obj: any): any {
  // 如果路径为空，返回整个对象
  if (path === '') {
    return obj;
  }

  try {
    // 分割路径，处理数组索引的情况
    const keys = path.split('.').reduce((acc: string[], key: string) => {
      // 处理数组索引，如 [0], [1] 等
      if (key.includes('[') && key.includes(']')) {
        const parts = key.split(/[\[\]]+/).filter(part => part !== '');
        acc.push(...parts);
      } else {
        acc.push(key);
      }
      return acc;
    }, []);

    // 逐级访问对象属性
    let result = obj;
    for (const key of keys) {
      if (result === null || result === undefined) {
        return undefined;
      }

      // 如果key是数字，说明是数组索引
      if (/^\d+$/.test(key)) {
        const index = parseInt(key, 10);
        if (Array.isArray(result) && index >= 0 && index < result.length) {
          result = result[index];
        } else {
          return undefined;
        }
      } else {
        // 普通对象属性访问
        if (typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return undefined;
        }
      }
    }

    return result;
  } catch (error) {
    return undefined;
  }
}

/**
 * 数据填充方法
 * @param template 需要填充的数据模板
 * @param dataSource 数据源
 * @param excludeKeys 不进行替换处理的关键字列表
 * @returns 填充后的数据
 */
export function fillTemplateByData<T = any>(
  template: any,
  dataSource: any,
  excludeKeys: string[] = ['event', 'fieldMapping'],
): T {
  // 如果模板是字符串且以$开头，进行替换
  if (typeof template === 'string' && template.startsWith('$')) {
    return getValueByPath(template.slice(1), dataSource);
  }

  // 如果模板是数组，递归处理每个元素
  if (Array.isArray(template)) {
    return template.map(item => fillTemplateByData(item, dataSource, excludeKeys)) as T;
  }

  // 如果模板是对象，递归处理每个属性
  if (template !== null && typeof template === 'object') {
    const result: any = {};
    for (const key in template) {
      if (template.hasOwnProperty(key)) {
        // 如果key在排除列表中，直接赋值不进行递归处理
        if (excludeKeys.includes(key)) {
          result[key] = template[key];
        } else {
          result[key] = fillTemplateByData(template[key], dataSource, excludeKeys);
        }
      }
    }
    return result as T;
  }

  // 其他类型直接返回
  return template;
}

export function getFilledData(data, nativeData) {
  let filledData = JSON.parse(JSON.stringify(data));
  nativeData.forEach(item => {
    filledData = fillTemplateByData(filledData, item?.response);
  });
  return filledData;
}
