import { Easing } from 'react-native-reanimated';
import { hexToRgba } from '../components/utils';
import systemDark from './theme-token.dark';
import systemLight from './theme-token.light';
import { ISystemTheme } from './type';

const getOrginSystemToken = (type: 'dark' | 'light' = 'light') => {
  const systemTemp = JSON.parse(JSON.stringify(type === 'light' ? systemLight : systemDark));
  Object.keys(systemTemp).forEach(item => {
    const type = typeof systemTemp[item];
    if (type === 'object' && systemTemp[item]?.color && systemTemp[item]?.opacity) {
      systemTemp[item] = hexToRgba(systemTemp[item]?.color, systemTemp[item]?.opacity);
    }
    if (type === 'object' && systemTemp[item]?.lineHeight) {
      systemTemp[item].lineHeight = Math.round(systemTemp[item]?.lineHeight * (systemTemp[item]?.fontSize || 20));
    }
    if (type === 'object' && systemTemp[item]?.fontWeight) {
      systemTemp[item].fontWeight = systemTemp[item]?.fontWeight.toString();
    }
  });
  return systemTemp;
};
const getComponentsToken = (system: ISystemTheme) => {
  return {
    cardContainer: {
      cardContainerWidth: 364, // 默认宽度为五栅格宽度
      cardContainerHeight: 'auto', // 默认高度为自适应
      cardContainerMaxHeight: 376, // 默认最大高度为376
      cardContainerRadius: system.radiusCard, // 16px，大卡圆角
      cardContainerBgColor: system.containerPrimary, // 主要容器背景色
      cardContainerOpacity: 1, // 使用system中已定义的透明度，不再单独设置
      cardContainerUpAndDownPadding: system.spaceCardPaddingUpdownS, // 24px，卡片上下内边距(小), 用于AI卡片
      cardContainerLeftAndRightPadding: system.spaceCardPaddingLeftRightS, // 24px，卡片左右内边距(小), 用于AI卡片
    },

    tips: {
      iconSize: system.sizeComphXxs, // 20px，对应图标尺寸
      iconRightPadding: system.spaceElementsXs, // 8px，极小元素间距
      cardBottomPadding: system.spaceElementsL, // 20px，大元素间距，适用于卡片和段落之间的间距
      cardInnerPadding: system.spaceElementsS, // 12px，提示条左右内边距
      cardRadius: system.radiusInCard, // 12px，提示条圆角
      tipTextFontStyle: system.cnBodyS, // 中文中号正文字体，用于信息提示文字
      tipTextColor: system.textPrimary, // 一级文本颜色
      containerErrorColor: system.containerErrorWeakDefault, // 弱错误状态容器背景
      iconErrorColor: system.textErrorDefault, // 危险状态图标的颜色
      containerSuccessColor: system.containerInfoWeakDefault, // 使用信息提示背景色作为成功色（system中没有专门的成功色）
      iconSuccessColor: system.textInfoDefault, // 使用信息图标颜色作为成功图标色
      containerWarningColor: system.containerWarningWeakDefault, // 弱警告状态容器背景
      iconWarningColor: system.textWarningDefault, // 警告图标的颜色
      containerInfoColor: system.containerInfoWeakDefault, // 弱信息提示状态容器背景
      iconInfoColor: system.textInfoDefault, // 提示图标的颜色
    },

    stepper: {
      stepperSerialNumberFontStyle: system.cnHeadlineXsStrong, // 中文极小加粗标题字体
      stepperSerialNumberColor: system.textTitle, // 标题颜色
      stepperSerialNumberRightPadding: system.spaceElementsM, // 16px，中号元素间距
      stepperSerialNumberBgColor: system.containerBpDefault, // 品牌主色容器背景，用于序号背景
      stepperCardTitleFontStyle: system.cnHeadlineXsStrong, // 中文极小加粗标题字体
      stepperCardTitleColor: system.textTitle, // 标题颜色
      stepperCardDescFontStyle: system.cnBodyM, // 中文中号正文字体
      stepperCardDescColor: system.textSecondary, // 二级文字颜色，用于说明文字
      stepperCardPictureWidth: 150, // 150px，图片宽度
      stepperCardPictureRadius: system.radiusImageS, // 4px，小图片圆角
      stepperCardMarginBottom: system.spaceElementsXs, // 8px，卡片和段落之间的间距
      stepperElementsPadding: system.spaceElementsXs, // 8px，极小元素间距
      stepperVerticalLineColor: system.dividerDefault, // 分割线颜色
      stepperVerticalLineWidth: 2, // 分割线宽度
    },

    table: {
      tableRadius: system.radiusInCard, // 12px，容器中的卡片圆角
      tableBorderColor: system.borderWeakDefault, // 较弱的边框色，用于表格的边框
      tableBgColor: 'transparent',
      headerBgColor: system.containerFifth, // 五级容器背景色，用于表格的表头背景
      hedaderFont: {
        ...system.cnHeadlineXxsStrong, // 中文超极小加粗标题字体，用于表头文字
        color: system.textPrimary, // 一级文本颜色
      },
      cellImgRadius: system.radiusImageS, // 4px，小图片圆角
      cellPaddingHorizontal: system.spaceElementsXs, // 8px，单元格左右内边距
      cellPaddingVertical: system.spaceElementsM, // 16px，单元格上下内边距
      cellFont: {
        ...system.cnBodyM, // 中文中号正文字体
        color: system.textPrimary, // 一级文本颜色
      },
    },

    stepperHorizontal: {
      stepTitle: {
        ...system.cnHeadlineXxsStrong, // 中文超极小加粗标题字体
        color: system.textTitle, // 标题颜色
        marginBottom: system.spaceElementsXxs, // 4px，标题下边距
      },
      stepButton: {
        width: system.sizeComphXs,
        height: system.sizeComphXs,
        borderRadius: system.radiusComp1,
        backgroundColor: system.containerSecondary,
      },
      stepButtonActive: {
        backgroundColor: system.containerBpDefault,
        paddingHorizontal: system.spaceElementsM,
      },
      stepNumberText: {
        ...system.cnHeadlineXxsStrong, // 中文超极小加粗标题字体，序号文字
        color: system.textInverse, // 反色文本颜色
      },
      stepNumberTextActive: {
        color: system.textInverse, // 反色文本颜色
      },
      contentText: {
        ...system.cnBodyM, // 中文中号正文字体
        color: system.textPrimary, // 一级文本颜色
        marginBottom: system.spaceElementsXxs, // 4px，段落下边距
      },
      contentImage: {
        borderRadius: system.radiusInCard, // 12px，容器中的卡片圆角
        marginBottom: system.spaceElementsXxs, // 4px
      },
      containerGap: system.spaceElementsXs, // 8px，极小元素间距
      containerMarginBottom: system.spaceElementsM, // 16px，中号元素间距
    },

    verticalDataCompare: {
      dotSize: system.sizeComphMin, // 4px，进度条高度作为点的尺寸
      dotColor: system.containerBpDefault, // 品牌主色
      lineWidth: system.spaceElementsXxxs, // 2px，极小间距作为线宽
      lineColor: system.containerBpDefault, // 品牌主色
      showDot: true,
      unit: '',
      maxHeight: system.sizeComphM, // 40px，中按钮高度
      valueStyle: {
        ...system.cnBodyM, // 中文中号正文字体
        color: system.textPrimary, // 一级文本颜色
        marginBottom: system.spaceElementsXxs, // 4px
      },
      unitStyle: {
        ...system.cnBodyS, // 中文小号正文字体
        paddingLeft: system.spaceElementsXxxs, // 2px
        color: system.textSecondary, // 二级文字颜色
        marginBottom: system.spaceElementsXxs, // 4px
      },
      labelStyle: {
        ...system.cnBodyM, // 中文中号正文字体
        color: system.textPrimary, // 一级文本颜色
      },
    },

    button: {
      // 尺寸 - 高度
      heightS: system.sizeComphS, // 32px，小按钮高度
      heightM: system.sizeComphM, // 40px，中按钮高度
      heightL: system.sizeComphL, // 48px，大按钮高度

      // 尺寸 - 最小宽度
      minWidthS: system.sizeComphWXl, // 88px，小按钮默认宽度
      minWidthM: system.sizeComphWXxl, // 104px，中按钮默认宽度
      minWidthL: system.sizeComphWXxxl, // 120px，大按钮默认宽度

      // 圆角
      borderRadius: system.radiusComp1, // 20px，按钮圆角

      // 内边距
      paddingHorizontalS: system.spaceCardPaddingXms, // 12px，小按钮左右内边距
      paddingHorizontalM: system.spaceCardPaddingLeftRightXs, // 16px，中按钮左右内边距
      paddingHorizontalL: system.spaceCardPaddingLeftRightS, // 24px，大按钮左右内边距
      paddingHorizontalText: system.spaceElementsXs, // 8px，文字按钮内边距

      // 间距
      spacingBetweenButtons: system.spaceElementsXl, // 24px，按钮与按钮的间距
      spacingBetweenButtonsS: system.spaceElementsS, // 12px，小按钮与小按钮之间的间距
      spacingIconText: system.spaceElementsXs, // 8px，图标与文字间距

      // 颜色 - 主要按钮
      primaryBgDefault: system.containerBpDefault, // 主要按钮背景色(默认)
      primaryBgPressed: system.containerBpPress, // 主要按钮背景色(按压)
      primaryBgDisabled: system.containerBpDisabled, // 主要按钮背景色(禁用)

      // 颜色 - 次要按钮
      secondaryBgDefault: system.containerBsDefault, // 次要按钮背景色(默认)
      secondaryBgPressed: system.containerBsPress, // 次要按钮背景色(按压)
      secondaryBgDisabled: system.containerBsDisabled, // 次要按钮背景色(禁用)

      // 文字颜色
      primaryTextColor: system.textInverse, // 主要按钮文字颜色
      secondaryTextColor: system.textPrimary, // 次要按钮文字颜色
      textColorDisabled: system.textPrimaryDisabled, // 禁用状态文字颜色

      // 字体
      fontL: system.cnBodyL, // 大按钮文字字体
      fontM: system.cnBodyL, // 中号按钮文字字体
      fontS: system.cnBodyM, // 小号按钮文字字体
    },

    tag: {
      // 尺寸相关
      heightL: system.sizeComphXs, // 28px，大标签高度
      heightM: system.sizeComphXxs, // 20px，中标签高度
      heightS: system.sizeCompXxxs, // 16px，小标签高度

      // 间距相关
      paddingL: system.spaceCardPaddingXms, // 12px，大标签左右内边距
      paddingM: system.spaceCardPaddingLeftRightXxs, // 8px，中标签左右内边距
      paddingS: system.spaceCardPaddingLeftRightXxxs, // 4px，小标签左右内边距

      // 颜色相关
      tagBgDefault: system.containerBpWeakDefault, // 二级品牌主色容器背景
      tagTextColor: system.textPrimary, // 一级文本颜色

      // 圆角相关
      radius: system.radiusComp2, // 4px，小标签圆角

      // 字体相关
      fontStyleL: system.cnBodyM, // 14px，大标签字体 - 中文中号正文字体
      fontStyleM: system.cnBodyS, // 12px，中标签字体 - 中文小号正文字体
      fontStyleS: {
        ...system.cnBodyS, // 12px，小标签字体 - 中文小号正文字体
        lineHeight: system.sizeCompXxxs,
      },
    },

    switch: {
      // 尺寸相关
      height: system.sizeSwitch, // 22px - 开关高度
      width: system.sizeComphWM, // 40px - 开关宽度

      // 圆角相关
      radius: system.radiusComp1, // 20px - 圆角

      // 颜色相关 - 前景色
      thumbColor: system.textInverse, // 前景色(滑块颜色)

      // 颜色相关 - 背景色状态
      onBackgroundDefault: system.containerBpDefault, // 开启状态背景色
      offBackgroundDefault: system.containerPrimaryDisabled, // 关闭状态背景色
      onBackgroundDisabled: system.containerBpDisabled, // 开启禁用状态背景色
      offBackgroundDisabled: system.containerSwitchOffDisabled, // 关闭禁用状态背景色
    },

    tab: {
      // 尺寸相关
      height: system.sizeComphXxs, // 20px，页签高度
      heightS: system.sizeCompXxxs, // 16px，小页签高度

      // 颜色相关
      activeBackground: system.containerBpDefault, // 选中态背景色
      inactiveBackground: system.containerBpWeakDefault, // 非选中态背景色
      activeTextColor: system.textInverse, // 选中态文字颜色
      inactiveTextColor: system.textPrimary, // 非选中态文字颜色

      // 间距相关
      paddingHorizontal: system.spaceCardPaddingLeftRightXxs, // 8px，页签左右内边距
      spacing: system.spaceElementsXs, // 8px，页签之间的间距

      // 字体相关
      textStyle: system.cnBodyS, // 文字字体

      // 其他属性
      radius: system.radiusComp2, // 4px，小标签圆角
    },

    gaugePointer: {
      size: 180, // 默认180px，仪表盘尺寸

      pointerColor: system.textInverse, // 默认白色，指针颜色

      valueFontStyle: system.cnDisplayLStrong, // 默认60px，值字体
      valueColor: system.textTitle, // 默认一级文本颜色，值颜色

      labelFontStyle: system.cnDisplayXxsStrong, // 默认28px，标签字体
      labelColor: system.textSecondary, // 默认二级文本颜色，标签颜色
    },

    animationFadeSlide: {
      duration: 500,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1.0),
    },
  };
};

export const getDesignToken = (type: 'dark' | 'light') => {
  const systemTemp = getOrginSystemToken(type);
  const compTemp = getComponentsToken(systemTemp);
  return { system: systemTemp, components: compTemp };
};

export default getDesignToken('dark');
