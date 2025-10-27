const systemLight = {
  // ----- 圆角 -----
  radiusImageS: 4,
  radiusImageM: 12,
  radiusInCard: 12,
  radiusCard: 16,
  radiusComp1: 20,
  radiusComp2: 4,

  // ----- 间距 -----
  spaceElementsMin: 0,
  spaceElementsXxxs: 2,
  spaceElementsXxs: 4,
  spaceElementsXs: 8,
  spaceElementsS: 12,
  spaceElementsM: 16,
  spaceElementsL: 20,
  spaceElementsXl: 24,
  spaceCardPaddingUpdownS: 24,
  spaceCardPaddingLeftRightS: 24,
  spaceCardPaddingUpdownXs: 12,
  spaceCardPaddingLeftRightXs: 16,
  spaceCardPaddingXms: 12,
  spaceCardPaddingLeftRightXxs: 8,
  spaceCardPaddingLeftRightXxxs: 4,

  // ----- 图标与文字 -----
  iconPrimary: '#1A1A1A',
  textPrimary: '#262626',
  textTitle: '#000000',
  textPrimaryDisabled: '#8C8C8C',
  textInverse: '#FFFFFF', // 用于深色元素上的白字（如深色按钮）
  textSecondary: '#595959',
  textErrorDefault: '#CF1322',
  textInfoDefault: '#0050B3',
  textWarningDefault: '#D48806',
  textCautionDefault: '#AD8B00',
  textMethodDefault: '#0050B3',

  // ----- 图表颜色 -----
  chartBorderRain: '#1890FF',
  chartBgRain: '#E6F7FF',

  // ----- 容器背景 -----
  containerPrimary: '#F5F5F5',
  containerPrimaryWeather: '#BAE7FF',
  containerSecondary: '#FFFFFF',
  containerTertiary: '#F0F0F0',
  containerFifth: '#F5F5F5',
  containerPrimaryDisabled: '#F0F0F0',

  // 主按钮（Bp = Primary Button）
  containerBpDefault: '#1890FF',
  containerBpPress: '#096DD9',
  containerBpDisabled: '#9EC9FF',

  // 次要按钮（Bs = Secondary Button）
  containerBsDefault: '#E6F7FF',
  containerBsPress: '#BAE7FF',
  containerBsDisabled: '#D6E4FF',

  // 弱态容器
  containerBpWeakDefault: '#E6F7FF',
  containerErrorWeakDefault: '#FFF1F0',
  containerWarningWeakDefault: '#FFF7ED',
  containerInfoWeakDefault: '#E6F7FF',
  containerCautionWeakDefault: '#FFFBE6',

  containerSwitchOffDisabled: '#D9D9D9',

  // ----- 分隔线 -----
  dividerDefault: '#D9D9D9',
  dividerList: '#F0F0F0',
  dividerBp: '#1890FF',

  // ----- 边框 -----
  borderWeakDefault: '#D9D9D9',

  // ----- 尺寸 -----
  sizeIconXs: 16,
  sizeIconM: 24,
  sizeIconXl: 40,
  sizeIconXxl: 48,
  sizeCompXxxs: 16,
  sizeComphXxs: 20,
  sizeComphXs: 28,
  sizeComphS: 32,
  sizeComphM: 40,
  sizeComphL: 48,
  sizeSwitch: 22,
  sizeComphMin: 4,
  sizeComphWM: 40,
  sizeComphWXl: 88,
  sizeComphWXxl: 104,
  sizeComphWXxxl: 120,
  sizeAvatarL: 80,
  sizeAvatarM: 64,

  // ----- 字体 -----
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

  // ----- 背景渐变 -----
  containerLinearGradient: '0deg, #F5F5F5 0%, #FFFFFF 50%',

  // ----- 背景模糊（白天通常不用模糊，可用浅色遮罩替代）-----
  backgroundBlur: 'backdrop-filter: blur(12px); background-color: rgba(255, 255, 255, 0.8);',
};

export default systemLight;
