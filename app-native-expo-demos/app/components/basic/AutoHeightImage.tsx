import React, { useEffect, useState } from 'react';
import { Image, ImageProps, ImageSourcePropType, ImageStyle, LayoutChangeEvent } from 'react-native';

interface IImageSize {
  width: number;
  height: number;
}

interface IAutoHeightImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType;
  style?: ImageStyle;
  onImageSize?: (size: IImageSize) => void;
  onError?: (error: Error) => void;
}

const AutoHeightImage: React.FC<IAutoHeightImageProps> = props => {
  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const [imageSize, setImageSize] = useState<IImageSize>({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setLayoutWidth(width);
  };

  useEffect(() => {
    if (layoutWidth === 0) return;
    if (props?.source?.uri) {
      Image.getSize(
        props.source.uri,
        (imageWidth, imageHeight) => {
          const scaleFactor = layoutWidth / imageWidth;
          const size = {
            width: layoutWidth,
            height: imageHeight * scaleFactor,
          };
          setImageSize(size);
          props.onImageSize?.(size);
        },
        error => {
          const size = {
            width: layoutWidth,
            height: layoutWidth,
          };
          setImageSize(size);
          props.onError?.(error);
        },
      );
    }
  }, [props?.source?.uri, layoutWidth]);

  return (
    <Image
      onLayout={onLayout}
      resizeMode="cover"
      {...props}
      style={{
        ...(props?.style || {}),
        width: '100%',
        height: imageSize.height,
      }}
    />
  );
};

export default AutoHeightImage;
