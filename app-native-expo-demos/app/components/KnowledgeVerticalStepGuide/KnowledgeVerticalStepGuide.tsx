import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardContainer from '../basic/CardContainer';
import Stepper from '../basic/Stepper';
import Tips from '../basic/Tips';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

// 步骤接口定义
interface IStep {
  number: number;
  title: string;
  description?: string;
  image?: string;
  tip?: {
    position: 'top' | 'bottom';
    title: string;
    type: 'error' | 'success' | 'warning' | 'info';
    message: string;
    iconSize: number;
  };
}

// 提示数据接口定义
interface ITipData {
  position?: 'top' | 'bottom';
  type?: 'error' | 'success' | 'warning' | 'info';
  message?: string;
  iconSize?: number;
}

// 数据接口定义
interface TData {
  title?: string;
  steps?: IStep[];
  tip?: ITipData;
}

// Props接口定义
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeVerticalStepGuide: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system } = theme || {};

  // 安全解构
  const { width = 364, maxHeight = 376 } = opts || {};
  const { title, steps, tip } = data || {};

  // Token解构
  const { textTitle, cnHeadlineXsStrong, spaceElementsM } = system || {};

  const tipPosition = tip?.position || 'bottom';

  const styles = StyleSheet.create({
    container: {
      gap: spaceElementsM,
    },
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
      margin: 0,
    },
    stepsList: {
      gap: 0, // Stepper组件自己控制间距
    },
  });

  return (
    <CardContainer width={width} maxHeight={maxHeight} style={styles.container}>
      {/* 标题 */}
      {title && <Text style={styles.title}>{title}</Text>}

      {/* 顶部提示 */}
      {tip && tipPosition === 'top' && (
        <Tips type={tip.type || 'info'} message={tip.message || ''} iconSize={tip.iconSize} />
      )}

      {/* 滚动容器 */}
      <View style={styles.stepsList}>
        {/* 步骤列表 */}
        {steps?.map((step, index) => (
          <Stepper
            key={index}
            step={{
              number: step.number || index + 1,
              title: step.title || '',
              description: step.description,
              image: step.image,
            }}
            tip={step.tip}
            stepperCardMarginBottom={index === steps.length - 1 ? 0 : undefined}
          />
        ))}
      </View>

      {/* 底部提示 */}
      {tip && tipPosition === 'bottom' && (
        <Tips type={tip.type || 'info'} message={tip.message || ''} iconSize={tip.iconSize} />
      )}
    </CardContainer>
  );
};

export default KnowledgeVerticalStepGuide;
