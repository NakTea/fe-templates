import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import AutoHeightImage from './AutoHeightImage';

interface ContentItem {
  type: 'text' | 'image';
  text: string;
}

export interface StepItem {
  number: number;
  title: string;
  contents: ContentItem[];
}

export interface IStepperHorizontalProps {
  style?: ViewStyle;
  steps: StepItem[];
  activeStep?: number;
  activeBtnTextPreix?: string;
}

const StepperHorizontal = ({
  style = {},
  steps,
  activeStep = 1,
  activeBtnTextPreix = '步骤',
}: IStepperHorizontalProps) => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const [currentStep, setCurrentStep] = useState(activeStep - 1);
  const [containerWidth, setContainerWidth] = useState(0);

  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { stepperHorizontal } = components;
  const {
    stepButton,
    containerGap,
    containerMarginBottom,
    stepButtonActive,
    stepNumberText,
    stepNumberTextActive,
    stepTitle,
    contentText,
    contentImage,
  } = stepperHorizontal;

  const s = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
    },
    stepsContainer: {
      flexDirection: 'row',
      gap: containerGap,
      marginBottom: containerMarginBottom,
    },
    scrollContent: {
      flex: 1,
    },
    stepButton: {
      justifyContent: 'center',
      alignItems: 'center',
      ...stepButton,
    },
    stepButtonActive: {
      width: 'auto',
      ...stepButtonActive,
    },
    stepNumberText: {
      ...stepNumberText,
    },
    stepNumberTextActive: {
      ...stepNumberTextActive,
    },
    stepTitle: {
      ...stepTitle,
    },
    contentText: {
      ...contentText,
    },
    contentImage: {
      width: '100%',
      ...contentImage,
    },
  });

  const handleStepPress = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    carouselRef.current?.scrollTo({ index: stepNumber, animated: true });
  };

  const handleSnapToItem = (index: number) => {
    setCurrentStep(index);
  };

  const renderContent = (contents: ContentItem[]) => {
    return contents?.map((item, index) => {
      if (item.type === 'text') {
        return (
          <Text key={index} style={s.contentText}>
            {item.text}
          </Text>
        );
      } else {
        return <AutoHeightImage key={index} source={{ uri: item.text }} style={s.contentImage} />;
      }
    });
  };

  const renderCarouselItem = ({ item: step }: { item: StepItem }) => {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={s.scrollContent}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}>
        <Text style={s.stepTitle}>{step.title}</Text>
        {renderContent(step.contents)}
      </ScrollView>
    );
  };

  const handleContainerLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View
      style={{
        ...style,
        ...s.container,
      }}
      onLayout={handleContainerLayout}>
      <View style={s.stepsContainer}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={`btns-${index}`}
            style={[s.stepButton, currentStep === index && s.stepButtonActive]}
            onPress={() => handleStepPress(index)}
            activeOpacity={0.7}>
            <Text style={[s.stepNumberText, currentStep === index && s.stepNumberTextActive]}>
              {' '}
              {currentStep === index ? activeBtnTextPreix : ''}
              {index + 1}{' '}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {containerWidth > 0 && (
        <Carousel
          ref={carouselRef}
          data={steps}
          renderItem={renderCarouselItem}
          width={containerWidth}
          containerStyle={{ flex: 1 }}
          defaultIndex={activeStep - 1}
          onSnapToItem={handleSnapToItem}
          enabled={true}
          autoPlay={false}
          loop={false}
          scrollAnimationDuration={300}
          onConfigurePanGesture={panGesture => {
            // fix panGesture so that the carousel works correctly
            // within a ScrollView
            panGesture.config.touchAction = 'pan-y'; // for web

            // for iOS and Android
            panGesture.activeOffsetX([-5, 5]);
            panGesture.failOffsetY([-5, 5]);
          }}
          // vertical={false}
          // pagingEnabled={true}
        />
      )}
    </View>
  );
};

export default StepperHorizontal;
