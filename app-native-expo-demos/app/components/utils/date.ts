import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

// 启用相对时间插件
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

/**
 * 时间转换方法
 * @param input 输入的时间字符串或数字
 * @returns 转换后的相对时间字符串，如果无法转换则返回原值
 */
export function formatRelativeTime(input: string | number): string {
  // 如果输入为空或undefined，返回原值
  if (!input && input !== 0) {
    return String(input);
  }

  let targetTime: Dayjs;

  try {
    // 尝试解析时间
    if (typeof input === 'number') {
      // 数字类型，判断是否为时间戳
      if (input.toString().length === 10) {
        // 10位时间戳（秒）
        targetTime = dayjs.unix(input);
      } else if (input.toString().length === 13) {
        // 13位时间戳（毫秒）
        targetTime = dayjs(input);
      } else {
        return String(input);
      }
    } else {
      // 字符串类型
      targetTime = dayjs(input);
    }

    // 检查是否为有效时间
    if (!targetTime.isValid()) {
      return String(input);
    }

    // 计算时间差
    const now = dayjs();
    const diffInSeconds = now.diff(targetTime, 'second');
    const diffInMinutes = now.diff(targetTime, 'minute');
    const diffInHours = now.diff(targetTime, 'hour');
    const diffInDays = now.diff(targetTime, 'day');
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = now.diff(targetTime, 'month');
    const diffInYears = now.diff(targetTime, 'year');

    // 如果是未来时间，返回原值
    if (diffInSeconds < 0) {
      return String(input);
    }

    // 按照规则返回相应格式
    if (diffInSeconds < 1) {
      return '刚刚';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds}秒前`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}分钟前`;
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`;
    } else if (diffInDays < 7) {
      return `${diffInDays}天前`;
    } else if (diffInDays < 31) {
      return `${diffInWeeks}周前`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths}个月前`;
    } else {
      // 超过1年，可以选择显示具体日期或相对年份
      // 这里提供两种选择，可根据需要调整

      // 选择1: 显示具体日期
      return targetTime.format('YYYY年MM月DD日');

      // 选择2: 显示相对年份（取消注释下面这行，注释上面那行）
      // return `${diffInYears}年前`;
    }
  } catch (error) {
    // 解析失败，返回原值
    return String(input);
  }
}

// 使用示例和测试
export function testFormatRelativeTime() {
  const now = dayjs();

  console.log('=== 测试用例 ===');

  // 正常时间戳测试
  console.log('30秒前:', formatRelativeTime(now.subtract(30, 'second').valueOf()));
  console.log('5分钟前:', formatRelativeTime(now.subtract(5, 'minute').valueOf()));
  console.log('2小时前:', formatRelativeTime(now.subtract(2, 'hour').valueOf()));
  console.log('3天前:', formatRelativeTime(now.subtract(3, 'day').valueOf()));
  console.log('2周前:', formatRelativeTime(now.subtract(2, 'week').valueOf()));
  console.log('3个月前:', formatRelativeTime(now.subtract(3, 'month').valueOf()));
  console.log('2年前:', formatRelativeTime(now.subtract(2, 'year').valueOf()));

  // 字符串时间测试
  console.log('ISO字符串:', formatRelativeTime('2024-01-01T10:00:00Z'));
  console.log('日期字符串:', formatRelativeTime('2024-01-01'));

  // 无法转换的输入测试
  console.log('今天 -> ', formatRelativeTime('今天'));
  console.log('16:14 -> ', formatRelativeTime('16:14'));
  console.log('无效字符串 -> ', formatRelativeTime('无效字符串'));
  console.log('空字符串 -> ', formatRelativeTime(''));
  console.log('undefined -> ', formatRelativeTime(undefined as any));
}

/**
 * 高级版本：支持更灵活的格式化选项
 * @param input 输入的秒数（字符串或数字）
 * @param options 格式化选项
 * @returns 转换后的字符串，如果无法转换则返回原值
 */
export interface ConvertOptions {
  precision?: number; // 小数点精度，默认1位
  unit?: string; // 单位，默认"分钟"
  showUnit?: boolean; // 是否显示单位，默认true
  minThreshold?: number; // 最小阈值（秒），小于此值时返回原值
  maxThreshold?: number; // 最大阈值（秒），大于此值时返回原值
}

export function convertSecondsToMinutes(input: string | number, options: ConvertOptions = {}): string {
  const { precision = 0, unit = '分钟', showUnit = true, minThreshold = 0, maxThreshold = Infinity } = options;

  if (input === null || input === undefined || input === '') {
    return String(input);
  }

  let seconds: number;

  try {
    if (typeof input === 'number') {
      seconds = input;
    } else {
      const numericValue = Number(input);
      if (isNaN(numericValue)) {
        return String(input);
      }
      seconds = numericValue;
    }

    // 检查阈值
    if (seconds < minThreshold || seconds > maxThreshold) {
      return String(input);
    }

    const minutes = seconds / 60;
    let result: string;

    if (minutes % 1 === 0) {
      result = String(Math.floor(minutes));
    } else {
      result = minutes.toFixed(precision);
    }

    return showUnit ? `${result}${unit}` : result;
  } catch (error) {
    return String(input);
  }
}

// 使用示例和测试
export function testConvertSecondsToMinutes() {
  console.log('=== 基础转换测试 ===');
  console.log('60 -> ', convertSecondsToMinutes(60)); // "1分钟"
  console.log('"120" -> ', convertSecondsToMinutes('120')); // "2分钟"
  console.log('90 -> ', convertSecondsToMinutes(90)); // "1.5分钟"
  console.log('30 -> ', convertSecondsToMinutes(30)); // "0.5分钟"
  console.log('0 -> ', convertSecondsToMinutes(0)); // "0分钟"

  console.log('\n=== 无法转换的输入测试 ===');
  console.log('"4S" -> ', convertSecondsToMinutes('4S')); // "4S"
  console.log('"4分钟" -> ', convertSecondsToMinutes('4分钟')); // "4分钟"
  console.log('"abc" -> ', convertSecondsToMinutes('abc')); // "abc"
  console.log('null -> ', convertSecondsToMinutes(null as any)); // "null"
  console.log('"" -> ', convertSecondsToMinutes('')); // ""

  console.log('\n=== 高级版本测试 ===');
  console.log('自定义精度:', convertSecondsToMinutes(90, { precision: 2 })); // "1.50分钟"
  console.log('自定义单位:', convertSecondsToMinutes(60, { unit: 'min' })); // "1min"
  console.log('不显示单位:', convertSecondsToMinutes(60, { showUnit: false })); // "1"
  console.log('阈值限制:', convertSecondsToMinutes(30, { minThreshold: 60 })); // "30"
}
