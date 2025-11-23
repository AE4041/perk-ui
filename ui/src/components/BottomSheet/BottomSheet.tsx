import { useThemeContext } from '@/theme/ThemeContext';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    AccessibilityInfo,
    AccessibilityProps,
    LayoutChangeEvent,
    Modal,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View,
    StyleSheet,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    WithTimingConfig,
} from 'react-native-reanimated';

export type BottomSheetProps = {
    visible: boolean;
    onRequestClose: () => void;
    onClose?: () => void;
    children: React.ReactNode;
    maxHeight?: number;
    enableSwipeToClose?: boolean;
    enableOverlayTapToClose?: boolean;
    variant?: 'primary' | 'secondary';
    showHandleBar?: boolean;
} & AccessibilityProps;

const timingConfig: WithTimingConfig = {
    duration: 400,
    easing: Easing.inOut(Easing.cubic),
};

export const BottomSheet = ({
    visible,
    onRequestClose,
    onClose,
    children,
    maxHeight,
    enableSwipeToClose = false,
    enableOverlayTapToClose = false,
    variant = 'primary',
    showHandleBar = false,
    ...accessibilityProps
}: BottomSheetProps) => {
    const [showModal, setShowModal] = useState(visible);
    const [contentHeight, setContentHeight] = useState<number | undefined>();
    const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
    const { height: windowHeight } = useWindowDimensions();

    // fallback theme
    const { theme } = useThemeContext()

    const translateY = useSharedValue(windowHeight);
    const overlayOpacity = useSharedValue(0);
    const startY = useSharedValue(0);

    const bottomSheetMaxHeight = useMemo(
        () => Math.min(maxHeight ?? windowHeight * 0.8, windowHeight),
        [maxHeight, windowHeight]
    );

    useEffect(() => { if (visible) setShowModal(true); }, [visible]);
    useEffect(() => { AccessibilityInfo.isScreenReaderEnabled().then(setIsScreenReaderEnabled); }, []);

    useEffect(() => {
        if (!contentHeight) return;
        translateY.value = withTiming(visible ? 0 : contentHeight, timingConfig);
        overlayOpacity.value = withTiming(visible ? 0.5 : 0, timingConfig, () => {
            if (!visible) {
                runOnJS(setShowModal)(false);
                runOnJS(setContentHeight)(undefined);
                if (onClose) runOnJS(onClose)();
            }
        });
    }, [visible, contentHeight, onClose]);

    const gesture = Gesture.Pan()
        .enabled(enableSwipeToClose && !isScreenReaderEnabled)
        .onStart(() => { startY.value = translateY.value; })
        .onUpdate(event => {
            const newTranslateY = startY.value + event.translationY;
            if (newTranslateY >= 0) {
                translateY.value = newTranslateY;
                overlayOpacity.value = withTiming(0.5 * (1 - Math.min(newTranslateY / 100, 1)), { duration: 50 });
            }
        })
        .onEnd(event => {
            if (event.translationY > 100) {
                translateY.value = withTiming(contentHeight ?? windowHeight, timingConfig, () => runOnJS(onRequestClose)());
                overlayOpacity.value = withTiming(0, timingConfig);
            } else {
                translateY.value = withTiming(0, timingConfig);
                overlayOpacity.value = withTiming(0.5, timingConfig);
            }
        });

    const bottomSheetAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const overlayAnimatedStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (!contentHeight) {
            translateY.value = height;
            setContentHeight(height);
        }
    }, [contentHeight]);

    return (
        <Modal transparent visible={showModal} onRequestClose={onRequestClose} animationType="none">
            <GestureDetector gesture={gesture}>
                <View style={styles.container}>
                    <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
                        <TouchableWithoutFeedback onPress={enableOverlayTapToClose ? onRequestClose : undefined}>
                            <View style={styles.overlayContent} />
                        </TouchableWithoutFeedback>
                    </Animated.View>

                    <Animated.View
                        style={[
                            styles.sheet,
                            { maxHeight: bottomSheetMaxHeight, backgroundColor: variant === 'primary' ? theme.colors.surfacePrimary : theme.colors.surfaceSecondary },
                            bottomSheetAnimatedStyle,
                        ]}
                        onLayout={handleLayout}
                        accessible
                        accessibilityViewIsModal
                        {...accessibilityProps}
                    >
                        {showHandleBar && (
                            <View style={styles.handleBarContainer}>
                                <View style={[styles.handleBar, { backgroundColor: theme.colors.contentQuaternary }]} />
                            </View>
                        )}
                        {children}
                    </Animated.View>
                </View>
            </GestureDetector>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: { zIndex: 1, ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
    overlayContent: { flex: 1 },
    sheet: { zIndex: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16, position: 'absolute', bottom: 0, left: 0, right: 0 },
    handleBarContainer: { alignItems: 'center', paddingVertical: 12, marginTop: -16 },
    handleBar: { width: 36, height: 4, borderRadius: 2 },
});
