import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../basic/Button';
import CardContainer from '../basic/CardContainer';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TButton = {
  text?: string;
  onPress?: () => void;
};

type TSettingItem = {
  label?: string;
  button?: TButton;
};

type TSettingGroup = {
  title?: string;
  items?: TSettingItem[];
};

type TData = {
  title?: string;
  groups?: TSettingGroup[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeSettingsGroupList: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 430, maxHeight = 445 } = opts || {};
  const { title, groups } = data || {};

  // Token解构
  const {
    textPrimary,
    textSecondary,
    containerBsDefault,
    spaceElementsS,
    spaceElementsM,
    radiusInCard,
    cnDisplayXxxsStrong,
    cnHeadlineXsStrong,
    cnBodyM,
  } = system || {};

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    title: {
      ...cnDisplayXxxsStrong,
      color: textPrimary,
      margin: 0,
    },
    settingGroup: {
      gap: spaceElementsM,
    },
    groupTitle: {
      ...cnHeadlineXsStrong,
      color: textSecondary,
      margin: 0,
    },
    settingList: {
      gap: spaceElementsS,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: containerBsDefault,
      paddingVertical: spaceElementsS,
      paddingHorizontal: spaceElementsM,
      borderRadius: radiusInCard,
    },
    settingLabel: {
      ...cnBodyM,
      color: textPrimary,
      flex: 1,
    },
    buttonContainer: {
      marginLeft: spaceElementsM,
    },
  });

  const handleItemPress = (onPress?: () => void) => {
    onPress?.();
  };

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题 */}
      {title && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      {groups?.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.settingGroup}>
          {/* 分组标题 */}
          {group.title && <Text style={styles.groupTitle}>{group.title}</Text>}

          {/* 设置项列表 */}
          {group?.items && group?.items?.length > 0 && (
            <View style={styles.settingList}>
              {group.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingItem}>
                  {/* 设置项标签 */}
                  {item.label && <Text style={styles.settingLabel}>{item.label}</Text>}

                  {/* 操作按钮 */}
                  {item.button?.text && (
                    <View style={styles.buttonContainer}>
                      <Button
                        title={item.button.text}
                        type="primary"
                        size="small"
                        onPress={() => handleItemPress(item.button?.onPress)}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </CardContainer>
  );
};

export default KnowledgeSettingsGroupList;
