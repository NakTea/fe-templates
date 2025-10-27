import { Text, View } from 'react-native';
import CardContainer from '../../components/basic/CardContainer';
import { useFlexUIConfig } from '../../components/provider/useFlexUIConfig';

const props = {
  // 基础样式示例
  basic: {
    width: 300,
    // height: 200,
    maxHeight: 200,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.8,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  // 自定义样式示例
  custom: {
    width: 350,
    maxHeight: 100,
    borderRadius: 24,
    backgroundColor: '#EE0',
    opacity: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
};

export default function CardContainerDemo() {
  const { direction, locale, theme, themeName } = useFlexUIConfig();
  // console.log('direction', direction, locale, theme, themeName);
  return (
    <View style={{ gap: 20 }}>
      {/* 基础用法示例 - 无自定义样式 */}
      <CardContainer>
        <Text>
          自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器
        </Text>
        <Text>展示不同的宽高、圆角和背景色</Text>
      </CardContainer>

      {/* 基础用法示例 */}
      <CardContainer {...props.basic}>
        <Text>基础卡片容器示例</Text>
        <Text>可以放置任意内容</Text>
      </CardContainer>

      {/* 自定义样式示例 */}
      <CardContainer {...props.custom}>
        <Text>
          自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器自定义样式的卡片容器
        </Text>
        <Text>展示不同的宽高、圆角和背景色</Text>
      </CardContainer>
    </View>
  );
}
