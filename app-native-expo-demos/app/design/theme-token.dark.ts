const systemDark = {
  // ===================================
  // 📐 圆角 (Radius)
  // ===================================
  radiusImageS: 4, // 小图片圆角
  radiusImageM: 12, // 中等图片圆角
  radiusInCard: 12, // 卡片内元素圆角
  radiusCard: 16, // 卡片容器圆角
  radiusComp1: 20, // 特殊组件圆角（如气泡）
  radiusComp2: 4, // 次要组件小圆角

  // ===================================
  // 🧱 间距 (Spacing)
  // ===================================
  spaceElementsMin: 0,
  spaceElementsXxxs: 2,
  spaceElementsXxs: 4,
  spaceElementsXs: 8,
  spaceElementsS: 12,
  spaceElementsM: 16,
  spaceElementsL: 20,
  spaceElementsXl: 24,

  // 卡片内边距
  spaceCardPaddingUpdownS: 24, // 垂直内边距（标准）
  spaceCardPaddingLeftRightS: 24, // 水平内边距（标准）
  spaceCardPaddingUpdownXs: 12, // 垂直内边距（小）
  spaceCardPaddingLeftRightXs: 16, // 水平内边距（小）
  spaceCardPaddingXms: 12, // 自定义小垂直间距
  spaceCardPaddingLeftRightXxs: 8, // 更小水平内边距
  spaceCardPaddingLeftRightXxxs: 4, // 极小水平内边距

  // ===================================
  // ✍️ 文字与图标颜色 (Text & Icon)
  // ===================================
  iconPrimary: 'rgba(255, 255, 255, 0.9)', // 主要图标
  textPrimary: 'rgba(255, 255, 255, 0.8)', // 常规文字
  textTitle: 'rgba(255, 255, 255, 1)', // 标题文字（高强调）
  textPrimaryDisabled: 'rgba(255, 255, 255, 0.4)', // 禁用文字
  textInverse: 'rgba(255, 255, 255, 1)', // 反色文字（用于深色背景）
  textSecondary: 'rgba(255, 255, 255, 0.6)', // 次要文字
  textErrorDefault: 'rgba(217, 72, 56, 1)', // 错误文字
  textInfoDefault: 'rgba(71, 150, 196, 1)', // 信息文字
  textWarningDefault: 'rgba(224, 140, 58, 1)', // 警告文字
  textCautionDefault: 'rgba(209, 167, 56, 1)', // 注意文字
  textMethodDefault: 'rgba(71, 150, 196, 1)', // 方法/链接类文字

  // ===================================
  // 📊 图表颜色 (Chart)
  // ===================================
  chartBorderRain: 'rgba(19, 174, 241, 1)', // 降雨边框
  chartBgRain: 'rgba(19, 174, 241, 0.1)', // 降雨背景

  // ===================================
  // 🧱 容器背景色 (Container Backgrounds)
  // ===================================
  containerPrimary: 'rgba(0, 0, 0, 0.4)', // 主要容器（半透明黑）
  containerPrimaryWeather: 'rgba(63, 113, 202, 0.702)', // 天气模块专用背景
  containerSecondary: 'rgba(255, 255, 255, 0.15)', // 次要容器（浅白透明）
  containerTertiary: 'rgba(0, 0, 0, 0.1)', // 第三级容器
  containerFifth: 'rgba(255, 255, 255, 0.1)', // 第五级背景（如列表项）
  containerPrimaryDisabled: 'rgba(255, 255, 255, 0.15)', // 禁用状态背景

  // 按钮背景
  containerBpDefault: 'rgba(49, 122, 247, 1)', // 主按钮默认
  containerBpPress: 'rgba(64, 127, 255, 1)', // 主按钮按下
  containerBpDisabled: 'rgba(49, 122, 247, 0.4)', // 主按钮禁用
  containerBsDefault: 'rgba(255, 255, 255, 0.15)', // 次按钮默认
  containerBsPress: 'rgba(255, 255, 255, 0.3)', // 次按钮按下
  containerBsDisabled: 'rgba(255, 255, 255, 0.4)', // 次按钮禁用

  // 弱态背景（带语义）
  containerBpWeakDefault: 'rgba(255, 255, 255, 0.15)', // 主色弱态
  containerErrorWeakDefault: 'rgba(217, 72, 56, 0.3)', // 错误弱态
  containerWarningWeakDefault: 'rgba(224, 140, 58, 0.3)', // 警告弱态
  containerInfoWeakDefault: 'rgba(71, 150, 196, 0.3)', // 信息弱态
  containerCautionWeakDefault: 'rgba(224, 140, 58, 0.3)', // 注意弱态

  containerSwitchOffDisabled: 'rgba(255, 255, 255, 0.4)', // 开关关闭且禁用

  // ===================================
  // 📏 分隔线与边框 (Dividers & Borders)
  // ===================================
  dividerDefault: 'rgba(255, 255, 255, 0.2)', // 默认分隔线
  dividerList: 'rgba(255, 255, 255, 0.1)', // 列表分隔线
  dividerBp: 'rgba(49, 122, 247, 1)', // 主色分隔线
  borderWeakDefault: 'rgba(255, 255, 255, 0.1)', // 弱边框

  // ===================================
  // 🔲 尺寸 (Sizes)
  // ===================================
  sizeIconXs: 16, // 超小图标
  sizeIconM: 24, // 中等图标
  sizeIconXl: 40, // 大图标
  sizeIconXxl: 48, // 超大图标

  sizeCompXxxs: 16, // 超小组件高度
  sizeComphXxs: 20, // 极小高度
  sizeComphXs: 28, // 小高度
  sizeComphS: 32, // 标准小高度
  sizeComphM: 40, // 标准中高度
  sizeComphL: 48, // 大高度
  sizeSwitch: 22, // 开关高度

  sizeComphMin: 4, // 最小高度（占位）
  sizeComphWM: 40, // 宽按钮中等高度
  sizeComphWXl: 88, // 宽按钮大高度
  sizeComphWXxl: 104, // 超宽按钮
  sizeComphWXxxl: 120, // 极宽按钮

  sizeAvatarL: 80, // 大头像
  sizeAvatarM: 64, // 中头像

  // ===================================
  // 🖋️ 字体样式 (Typography)
  // ===================================
  cnHeadlineXxsStrong: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.4,
  },
  cnHeadlineXsStrong: {
    fontSize: 14,
    fontWeight: 800,
    lineHeight: 1.4,
  },
  cnHeadlineMStrong: {
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1.2,
  },
  cnBodyS: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.66,
  },
  cnBodyM: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.66,
  },
  cnBodyL: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.66,
  },
  cnDisplayLStrong: {
    fontSize: 60,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  cnDisplayMStrong: {
    fontSize: 48,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  cnDisplayXsStrong: {
    fontSize: 28,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  cnDisplayXxsStrong: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  cnDisplayXxs: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  cnDisplayXxxsStrong: {
    fontSize: 16,
    fontWeight: 800,
    lineHeight: 1.4,
  },

  // ===================================
  // 🎨 渐变与特效 (Gradients & Effects)
  // ===================================
  containerLinearGradient: '0deg, #ECECEC 0%, rgba(236,236,236,0.00) 50%', // 浅色渐变遮罩

  // 毛玻璃效果（适用于悬浮层、顶部栏）
  backgroundBlur:
    'webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); background-color: rgba(0, 0, 0, 0.2);',
};

export default systemDark;
