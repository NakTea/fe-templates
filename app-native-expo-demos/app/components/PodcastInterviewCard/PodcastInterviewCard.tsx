import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { IconFont } from '../basic/Icon';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 用户信息类型定义
type TUser = {
  name?: string;
  role?: string;
  avatar?: string;
};

// 按钮类型定义
type TButton = {
  title?: string;
  action?: string;
  type?: 'primary' | 'secondary' | 'text';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

// 数据类型定义
type TData = {
  title?: string;
  users?: TUser[];
  desc?: string;
  buttons?: TButton[];
};

// 组件Props定义
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const PodcastInterviewCard: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 解构system tokens
  const {
    containerSecondary,
    containerBpDefault,
    textTitle,
    textSecondary,
    radiusInCard,
    spaceElementsXs,
    spaceElementsM,
    spaceCardPaddingUpdownXs,
    spaceCardPaddingLeftRightXs,
    sizeIconXxl,
    cnHeadlineXsStrong,
    cnBodyM,
    cnDisplayXxxsStrong,
  } = system || {};

  // 安全解构，添加兜底逻辑
  const { width = 300, maxHeight } = opts || {};
  const { title, users, desc, buttons } = data || {};

  const styles = StyleSheet.create({
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      textAlign: 'center',
    },
    usersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spaceElementsM,
    },
    userInfo: {
      alignItems: 'center',
      gap: spaceElementsXs,
    },
    avatar: {
      width: sizeIconXxl,
      height: sizeIconXxl,
      borderRadius: 999,
    },
    userName: {
      ...cnDisplayXxxsStrong,
      color: textSecondary,
    },
    soundWaveIcon: {
      marginHorizontal: spaceElementsXs,
    },
    descContainer: {
      backgroundColor: containerSecondary,
      borderRadius: radiusInCard,
      padding: spaceCardPaddingUpdownXs,
      paddingHorizontal: spaceCardPaddingLeftRightXs,
      width: '100%',
    },
    descText: {
      ...cnBodyM,
      color: textSecondary,
      textAlign: 'left',
    },
    buttonsContainer: {
      width: '100%',
      gap: spaceElementsM, // 使用24px间距（中按钮间距）
    },
  });

  const handleButtonPress = (action?: string) => {
    if (action) {
      console.log('按钮点击:', action);
      switch (action) {
        case 'podcastPlay':
          // 播放播客逻辑
          break;
        case 'share':
          // 分享逻辑
          break;
        default:
          break;
      }
    }
  };

  // 渲染用户信息
  const renderUsers = () => {
    if (!users?.length) return null;

    const userElements = users
      ?.map((user, index) => {
        if (!user?.name) return null;

        return (
          <View key={index} style={styles.userInfo}>
            {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
            <Text style={styles.userName}>
              {user.role || ''}
              {user.name}
            </Text>
          </View>
        );
      })
      .filter(Boolean); // 过滤掉null值

    if (userElements.length === 0) return null;

    return (
      <View style={styles.usersContainer}>
        {userElements.map((element, index) => (
          <React.Fragment key={index}>
            {element}
            {/* 在两个用户之间显示声波图标 */}
            {index === 0 && userElements.length > 1 && (
              <View style={styles.soundWaveIcon}>
                <IconFont name="systemSoundWave" size={24} color={containerBpDefault || '#317AF7'} />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // 渲染按钮组
  const renderButtons = () => {
    if (!buttons?.length) return null;

    return (
      <View style={styles.buttonsContainer}>
        {buttons?.map((button, index) => {
          if (!button?.title) return null;

          return (
            <Button
              key={index}
              title={button?.title}
              type={button?.type || 'primary'}
              size={button?.size || 'medium'}
              disabled={button?.disabled}
              loading={button?.loading}
              icon={<IconFont name={button?.icon} size={18} />}
              iconPosition={button?.iconPosition}
              onPress={() => handleButtonPress(button?.action)}
            />
          );
        })}
      </View>
    );
  };

  return (
    <CardContainer
      width={width}
      maxHeight={maxHeight}
      style={{
        alignItems: 'center',
        gap: spaceElementsM || 16,
      }}>
      {/* 标题 */}
      {title && <Text style={styles.title}>{title}</Text>}

      {/* 用户信息 */}
      {renderUsers()}

      {/* 描述卡片 */}
      {desc && (
        <View style={styles.descContainer}>
          <Text style={styles.descText} numberOfLines={3}>
            {desc}
          </Text>
        </View>
      )}

      {/* 按钮组 */}
      {renderButtons()}
    </CardContainer>
  );
};

export default PodcastInterviewCard;
