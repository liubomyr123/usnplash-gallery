import React, { useState } from 'react';
import { View, StyleSheet, Animated, StyleProp, ImageStyle, ImageSourcePropType, ImageResizeMode } from 'react-native';

interface ProgressiveImageProps {
    smallSource: ImageSourcePropType;
    fullSource: ImageSourcePropType;
    style: StyleProp<ImageStyle>;
    resizeMode: ImageResizeMode;
};

export const ProgressiveImage = (props: ProgressiveImageProps) => {
    const { smallSource, fullSource, style, ...restProps } = props;

    const [thumbnailAnimated] = useState(new Animated.Value(0));
    const [imageAnimated] = useState(new Animated.Value(0));

    const handleSmallLoad = () => Animated.timing(thumbnailAnimated, { toValue: 1, useNativeDriver: true }).start();
    const handleFullLoad = () => Animated.timing(imageAnimated, { toValue: 1, useNativeDriver: true }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                {...restProps}
                source={smallSource}
                style={[style, { opacity: thumbnailAnimated }]}
                onLoad={handleSmallLoad}
                blurRadius={1}
            />
            <Animated.Image
                {...restProps}
                source={fullSource}
                style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                onLoad={handleFullLoad}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    container: {
        backgroundColor: '#e1e4e8',
    },
});
