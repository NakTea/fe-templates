// 收发消息卡片
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from '../basic/Icon';
import TypewriterText from '../basic/TypewriterText';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type IButton = {
  label: string;
  event: {
    name: string;
    info: object;
  };
};
type TData = {
  /* 卡片header， 发送给 */
  header?: string;
  message?: string;
  /* 消息渠道 */
  recipientIcon?: string;
  recipientName?: string;
  buttonSend?: IButton;
  buttonCancel?: IButton;
  statusSendingText?: string;
  statusSentText?: string;
  statusCancelText?: string;
  cardStatus?: number;
};

export interface IPorps {
  data: TData;
  opts?: {
    ownCard?: boolean;
    streaming?: boolean;
  };
  designToken?: {
    [key: string]: string;
  };
  RNConfigModule: any;
}

const MessageSendCard = ({ data, opts, RNConfigModule }: IPorps): JSX.Element => {
  const {
    header,
    message,
    recipientIcon,
    recipientName,
    buttonSend,
    buttonCancel,
    statusSendingText = '',
    statusSentText = '',
    statusCancelText = '',
    cardStatus = 0,
  } = data || {};
  const { ownCard, streaming } = opts || {};
  const [sendStatus, setSendStatus] = useState(cardStatus); // 0.未发送，1.发送中，2. 发送成功 3. 取消发送
  const [isHoveringSend, setIsHoveringSend] = useState(false);
  const [isHoveringCancel, setIsHoveringCancel] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  const { theme } = useFlexUIConfig();
  const { basic, system, components } = theme;

  const statusText = {
    1: statusSendingText,
    2: statusSentText,
    3: statusCancelText,
  } as {
    [key: string | number]: string;
  };

  useEffect(() => {
    setSendStatus(cardStatus);
  }, [cardStatus]);

  const {
    textTertiary,
    textPrimary,
    textInverse,
    spaceCardPaddingUpdownL,
    containerBsWeakDefault,
    containerBpDefault,
    containerBsWeakSecondary,
    containerBpPress,
    borderPrimaryDefault,
    borderPrimaryPress,
    containerOverlayWeak3,
    radiusCard,
    radiusInCard,
    cnBodyL,
    cnBodyM,
    cnBodyS,
    cnHeadlineXsStrong,
    containerBsWeakTertiary,
  } = system;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: containerBsWeakDefault,
      borderRadius: radiusCard,
      paddingHorizontal: spaceCardPaddingUpdownL,
      paddingVertical: spaceCardPaddingUpdownL,
    },
    content: {
      backgroundColor: containerBsWeakSecondary,
      borderRadius: radiusInCard,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    header: {
      ...cnBodyS,
      color: textTertiary,
      marginBottom: 4,
      textAlign: 'left',
    },
    recipientContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 16,
    },
    icon: {
      marginRight: 4,
      borderRadius: 4,
    },
    recipientName: {
      ...cnHeadlineXsStrong,
      color: textPrimary,
      paddingTop: 2,
    },
    scrollMsg: {
      maxHeight: 318,
    },
    message: {
      ...cnBodyL,
      color: textPrimary,
      // maxHeight: 318,
      paddingBottom: 16,
      textAlign: 'left',
      // marginBottom: 0,
    },
    separator: {
      height: 1,
      backgroundColor: containerBsWeakTertiary,
      marginTop: 14,
      marginBottom: 14,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    button: {
      flex: 1,
      height: 40,
      minWidth: 80,
      borderRadius: 40,
      marginTop: 32,
      marginHorizontal: 16,
      justifyContent: 'center',
    },
    sendButton: {
      backgroundColor: containerBpDefault,
      borderColor: borderPrimaryDefault,
    },
    sendButtonHover: {
      backgroundColor: containerBpPress,
      borderColor: borderPrimaryPress,
    },
    buttonText: {
      ...cnBodyM,
      textAlign: 'center',
      color: textInverse,
    },
    cancelButton: {
      borderWidth: 1,
      borderColor: borderPrimaryDefault,
    },
    cancelButtonText: {
      ...cnBodyM,
      textAlign: 'center',
      color: textPrimary,
    },
    cancelButtonHover: {
      borderColor: borderPrimaryPress,
      backgroundColor: containerOverlayWeak3,
    },
    SendingText: {
      marginTop: 16,
      color: textTertiary,
      textAlign: 'center',
    },
  });

  const handleSend = () => {
    if (buttonDisable) {
      return false;
    }
    setButtonDisable(true);
    if (buttonSend?.event?.name === 'card.event.native') {
      RNConfigModule?.bridgeToNative(buttonSend?.event?.info, (res: string) => {
        if (res === 'success') {
          console.log('您已发送消息。', buttonSend?.event?.info);
          // setSendStatus(1);
          setTimeout(() => {
            setButtonDisable(false);
          }, 2000);
        } else {
          setButtonDisable(false);
        }
      });
    }
    // alert('您的消息已成功发送给小王。');
  };

  const handleCancel = () => {
    if (buttonDisable) {
      return false;
    }
    // alert('您已取消发送消息。');
    // toast('您已取消发送消息。');
    setButtonDisable(true);
    if (buttonSend?.event?.name === 'card.event.native') {
      RNConfigModule?.bridgeToNative(buttonCancel?.event?.info, (res: string) => {
        if (res === 'success') {
          console.log('您已取消发送消息。', buttonCancel?.event?.info);
          // setSendStatus(3);
          setTimeout(() => {
            setButtonDisable(false);
          }, 2000);
        } else {
          setButtonDisable(false);
        }
      });
    }
  };

  return (
    <View style={[ownCard && styles.container]}>
      <View style={styles.content}>
        {header && <Text style={styles.header}>{header}</Text>}
        <View style={styles.recipientContainer}>
          {recipientIcon && (
            <View style={styles.icon}>
              <Icon size={24} name={recipientIcon} />
            </View>
          )}
          {recipientName && <Text style={styles.recipientName}>{recipientName}</Text>}
        </View>
        {message && (
          <ScrollView style={styles.scrollMsg} nestedScrollEnabled={true}>
            <Text style={styles.message}>{streaming ? <TypewriterText text={message} /> : message}</Text>
          </ScrollView>
        )}
      </View>
      {/* <View style={styles.separator} /> */}

      {sendStatus === 0 ? (
        <View style={styles.buttonContainer}>
          {buttonSend && (
            <TouchableOpacity
              style={[styles.button, styles.sendButton, isHoveringSend && styles.sendButtonHover]}
              onPress={handleSend}
              disabled={sendStatus !== 0}
              activeOpacity={1}
              onPressIn={() => setIsHoveringSend(true)}
              onPressOut={() => setIsHoveringSend(false)}>
              <Text style={styles.buttonText}>{buttonSend?.label || '确认发送'}</Text>
            </TouchableOpacity>
          )}
          {buttonCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, isHoveringCancel && styles.cancelButtonHover]}
              onPress={handleCancel}
              activeOpacity={1}
              onPressIn={() => setIsHoveringCancel(true)}
              onPressOut={() => setIsHoveringCancel(false)}>
              <Text style={[styles.cancelButtonText]}>{buttonCancel?.label || '取消'}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.SendingText}>{statusText?.[sendStatus] || ''}</Text>
      )}
    </View>
  );
};

export default MessageSendCard;
