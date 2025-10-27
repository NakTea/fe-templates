import { jsonrepair } from 'jsonrepair';
// 移除字符串末尾的斜杠
function removeTrailingSlashStrict(str: string) {
  // 如果不包含//，且以/结尾，去掉末尾的/
  if (!str.endsWith('//') && str.endsWith('/') && str.length > 1) {
    return str.slice(0, -1);
  }
  return str;
}
export const getJsonData = (temp: string) => {
  if (temp) {
    if (typeof temp === 'string') {
      try {
        return JSON.parse(jsonrepair(removeTrailingSlashStrict(temp)));
      } catch (error) {
        console.log('getJsonData error', error, removeTrailingSlashStrict(temp));
      }
    }
    return temp;
  }
  return temp;
};

// 转换json字符串为json/array
export function parseJsonString(input: string): object | any[] | string {
  if (typeof input !== 'string') {
    return input; // 类型保护，非字符串直接返回（根据需要可调整）
  }

  try {
    const parsed = JSON.parse(input);

    // 只有当解析结果是对象（且非 null）或数组时才返回解析后的值
    if (parsed !== null && (typeof parsed === 'object' || Array.isArray(parsed))) {
      return parsed;
    }

    // 其他情况（数字、布尔、null 等）都返回原始字符串
    return input;
  } catch (error) {
    // 解析失败（如普通字符串），返回原字符串
    return input;
  }
}

export function isNotEmpty(value: any): boolean {
  return value !== null && value !== undefined;
}

export function isEmpty(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 解析宽度值，返回数值
 * @param width - 输入的宽度，可能是 number、'100px'、'20%'、非法字符串等
 * @param totalWidth - 总宽度，默认为 300
 * @param defaultValue - 默认值，默认为 100
 * @returns number - 解析后的宽度值
 */
export function getParseWidth(width: number | string | undefined, totalWidth = 360, defaultValue = 100): number {
  if (typeof width === 'number' && !isNaN(width)) {
    return width;
  }

  if (typeof width === 'string') {
    const pxMatch = width.match(/^(\d+(?:\.\d+)?)px$/);
    if (pxMatch) {
      return parseFloat(pxMatch[1]);
    }

    const percentMatch = width.match(/^(\d+(?:\.\d+)?)%$/);
    if (percentMatch) {
      return (totalWidth * parseFloat(percentMatch[1])) / 100;
    }
  }

  return defaultValue;
}

// 将hex颜色转换为rgba
export const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex) {
    return `rgba(53, 133, 243, ${alpha})`;
  }

  // 检查是否为 rgba(...) 格式
  const rgbaMatch = hex.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)/);
  if (rgbaMatch) {
    const [, r, g, b] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 检查是否为 hex 格式 (#rrggbb)
  const hexMatch = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/.exec(hex);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 兼容简写 hex (#rgb)
  const shortHexMatch = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/.exec(hex);
  if (shortHexMatch) {
    const r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16);
    const g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16);
    const b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 默认 fallback
  console.warn(`Invalid color format: ${hex}, using default.`);
  return `rgba(53, 133, 243, ${alpha})`;
};
