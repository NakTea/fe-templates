import { StyleSheet, View } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { isEmpty } from '../utils';
import { IconInformationSMethod, IconWarningSDanger, IconWarningSNotice, IconWarningSWarning } from './Icon';
import MarkdownRenderer from './MarkdownRenderer';

export interface ITipsProps {
  type?: 'error' | 'success' | 'warning' | 'info';
  message: string;
  style?: object;
  iconSize?: number;
  iconColor?: string;
  iconRightPadding?: number;
  cardBottomPadding?: number;
  cardInnerPadding?: number;
  cardRadius?: number;
  tipTextFontStyle?: {
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: '400' | '500' | '600' | '700' | 'normal' | 'bold';
  };
  tipTextColor?: string;
  position?: 'top' | 'bottom';
}

const Tips = ({
  type = 'info',
  message,
  style,
  iconSize,
  iconColor,
  iconRightPadding,
  cardBottomPadding,
  cardInnerPadding,
  cardRadius,
  tipTextFontStyle,
  tipTextColor,
}: ITipsProps) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { tips } = components;
  const getContainerStyle = () => {
    switch (type) {
      case 'error':
        return tips.containerErrorColor;
      case 'success':
        return tips.containerSuccessColor;
      case 'warning':
        return tips.containerWarningColor;
      case 'info':
      default:
        return tips.containerInfoColor;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: isEmpty(cardInnerPadding) ? tips.cardInnerPadding : cardInnerPadding,
      backgroundColor: getContainerStyle(),
      borderRadius: isEmpty(cardRadius) ? tips.cardRadius : cardRadius,
      marginBottom: isEmpty(cardBottomPadding) ? tips.cardBottomPadding : cardBottomPadding,
      ...style,
    },
    icon: { paddingTop: 2, display: 'flex', justifyContent: 'flex-start', height: '100%' },
    message: {
      marginLeft: 8, //iconRightPadding || tips.iconRightPadding,
      color: tipTextColor || tips.tipTextColor,
      flex: 1,
      fontSize: tipTextFontStyle?.fontSize || tips.tipTextFontStyle.fontSize,
      lineHeight: tipTextFontStyle?.lineHeight || tips.tipTextFontStyle.lineHeight,
      fontWeight:
        tipTextFontStyle?.fontWeight ||
        (tips.tipTextFontStyle.fontWeight as '400' | '500' | '600' | '700' | 'normal' | 'bold'),
    },
  });
  const getIcon = () => {
    const size = iconSize || tips.iconSize;
    switch (type) {
      case 'error':
        return (
          <View style={styles.icon}>
            <IconWarningSDanger size={size} color={iconColor || tips.iconErrorColor} />
          </View>
        );
      case 'success':
        return (
          <View style={styles.icon}>
            <IconWarningSNotice size={size} color={iconColor || tips.iconSuccessColor} />
          </View>
        );
      case 'warning':
        return (
          <View style={styles.icon}>
            <IconWarningSWarning size={size} color={iconColor || tips.iconWarningColor} />
          </View>
        );
      case 'info':
        return (
          <View style={styles.icon}>
            <IconInformationSMethod size={size} color={iconColor || tips.iconInfoColor} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {getIcon()}
      {/* <Text style={styles.message}>{message}</Text> */}
      <MarkdownRenderer noParagraphMargin style={styles.message} content={message} />
    </View>
  );
};

export default Tips;
