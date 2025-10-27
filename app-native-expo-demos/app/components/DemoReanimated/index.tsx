import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, Platform } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 200;

// 定义8个区域的倾斜角度
const TILT_ANGLES = {
  topLeft: { x: -20, y: 20 },
  top: { x: 0, y: 20 },
  topRight: { x: 20, y: 20 },
  left: { x: -10, y: 0 },
  right: { x: 20, y: 0 },
  bottomLeft: { x: -20, y: -20 },
  bottom: { x: 0, y: -20 },
  bottomRight: { x: 20, y: -20 },
};

export default function TiltCard() {
  const [tiltData, setTiltData] = useState({});
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const scale = useSharedValue(1);

  const springConfig = {
    damping: 10,
    mass: 1,
    stiffness: 100,
  };

  // 确定点击区域
  const determineZone = (x, y) => {
    const horizontalThird = CARD_WIDTH / 3;
    const verticalThird = CARD_HEIGHT / 3;

    const isLeft = x < horizontalThird;
    const isRight = x > horizontalThird * 2;
    const isTop = y < verticalThird;
    const isBottom = y > verticalThird * 2;

    if (isLeft && isTop) {
      return 'topLeft';
    }
    if (isRight && isTop) {
      return 'topRight';
    }
    if (isLeft && isBottom) {
      return 'bottomLeft';
    }
    if (isRight && isBottom) {
      return 'bottomRight';
    }
    if (isTop) {
      return 'top';
    }
    if (isBottom) {
      return 'bottom';
    }
    if (isLeft) {
      return 'left';
    }
    if (isRight) {
      return 'right';
    }
    return 'center';
  };

  const handleInteraction = useCallback(event => {
    let x, y;
    if (Platform.OS === 'web') {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    } else {
      x = event.nativeEvent.locationX;
      y = event.nativeEvent.locationY;
    }

    const zone = determineZone(x, y);
    const angles = TILT_ANGLES[zone] || { x: 0, y: 0 };

    tiltX.value = withSpring(angles.x, springConfig);
    tiltY.value = withSpring(angles.y, springConfig);
    // scale.value = withSpring(0.95, springConfig);
  }, []);

  const handleReset = useCallback(() => {
    tiltX.value = withSpring(0, springConfig);
    tiltY.value = withSpring(0, springConfig);
    scale.value = withSpring(1, springConfig);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const totalTilt = Math.abs(tiltX.value) + Math.abs(tiltY.value);

    // console.log(tiltX.value, tiltY.value, totalTilt);

    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${tiltY.value}deg` },
        { rotateY: `${tiltX.value}deg` },
        { scale: scale.value },
      ],
      // 将所有阴影相关样式放在同一个样式对象中
      style: {
        shadowOffset: {
          width: interpolate(tiltX.value, [-20, 0, 20], [-12, 0, 12]),
          height: interpolate(tiltY.value, [-20, 0, 20], [-12, 0, 12]),
        },
        shadowOpacity: interpolate(totalTilt, [0, 40], [0.2, 0.5]),
        shadowRadius: interpolate(totalTilt, [0, 40], [8, 16]),
        shadowColor: '#000',
      },
    };
  });

  // 创建区域指示器（用于开发调试）
  const renderZoneIndicators = () => {
    return (
      <View style={styles.zoneContainer}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={[styles.zoneIndicator, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { ...animatedStyle }]}>
        <Image source={{ uri: 'https://picsum.photos/400/200' }} style={styles.cardImage} />
        {/* 开发时可以取消注释查看区域划分 */}
        {/* {renderZoneIndicators()} */}
        <Text style={{ position: 'absolute', top: 20, left: 20 }}>你好，世界</Text>
        <Text style={{ position: 'absolute', color: '#ee0', top: 40, left: 20 }}>{JSON.stringify(tiltData)}</Text>
        <View
          style={styles.touchArea}
          onTouchStart={handleInteraction}
          onTouchEnd={handleReset}
          onClick={handleInteraction}
          onMouseLeave={handleReset}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: Platform.OS === 'web' ? 'pointer' : 'default',
  },
  // 区域指示器样式（用于开发调试）
  zoneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  zoneIndicator: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});
