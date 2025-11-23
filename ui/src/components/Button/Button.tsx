import React from "react";
import {
    Pressable,
    View,
    Text,
    AccessibilityProps,
    StyleSheet,
} from "react-native";
import { useThemeContext } from "@/theme/ThemeContext"; // your ThemeProvider hook

// Button size config
const config = {
    small: { buttonMinWidth: 44, buttonMinHeight: 30, hitSlop: 5 },
    regular: { buttonMinWidth: 44, buttonMinHeight: 40, hitSlop: 2 },
    large: { buttonMinWidth: 44, buttonMinHeight: 50, hitSlop: 0 },
};

type Size = "small" | "regular" | "large";
type Variant = "solid" | "outlined" | "subtle" | "text";
type Intent = "primary" | "secondary" | "positive" | "negative";

export type ButtonProps = {
    children: string | string[];
    variant?: Variant;
    intent?: Intent;
    size?: Size;
    disabled?: boolean;
    onPress: () => void;
} & AccessibilityProps;

// -------------------- BUTTON STYLES --------------------
const getButtonStyles = (
    variant: Variant,
    intent: Intent,
    pressed: boolean,
    disabled: boolean,
    colors: any
) => {
    if (disabled) {
        return {
            backgroundColor: variant === "text" ? "transparent" : colors.backgroundTertiary,
            ...(variant === "outlined" && { borderWidth: 1, borderColor: colors.backgroundTertiary }),
        };
    }

    const variantColors = {
        solid: {
            primary: [colors.accentPrimary, colors.accentSecondary],
            secondary: [colors.surfaceTertiary, colors.surfaceQuaternary],
            positive: [colors.positiveSecondary, colors.positivePrimary],
            negative: [colors.negativeSecondary, colors.negativePrimary],
        },
        subtle: {
            primary: [colors.accentQuaternary, colors.accentTertiary],
            secondary: [colors.surfaceSecondary, colors.surfaceTertiary],
            positive: [colors.positiveQuaternary, colors.positiveTertiary],
            negative: [colors.negativeQuaternary, colors.negativeTertiary],
        },
        outlined: {
            primary: [colors.accentPrimary, colors.accentQuaternary],
            secondary: [colors.contentSecondary, colors.surfaceSecondary],
            positive: [colors.positivePrimary, colors.positiveQuaternary],
            negative: [colors.negativePrimary, colors.negativeQuaternary],
        },
        text: {
            primary: [colors.accentAccent, colors.accentQuaternary],
            secondary: [colors.contentPrimary, colors.surfaceSecondary],
            positive: [colors.positivePrimary, colors.positiveQuaternary],
            negative: [colors.negativePrimary, colors.negativeQuaternary],
        },
    };

    switch (variant) {
        case "solid":
        case "subtle":
            return { backgroundColor: pressed ? variantColors[variant][intent][1] : variantColors[variant][intent][0] };
        case "outlined":
            return {
                backgroundColor: pressed ? variantColors.outlined[intent][1] : "transparent",
                borderWidth: 1,
                borderColor: variantColors.outlined[intent][0],
            };
        case "text":
            return { backgroundColor: pressed ? variantColors.text[intent][1] : "transparent" };
    }
};

// -------------------- TEXT COLOR --------------------
const getTextColor = (
    variant: Variant,
    intent: Intent,
    disabled: boolean,
    colors: any
) => {
    if (disabled) return colors.contentTertiary;

    if (variant === "solid") {
        if (intent === "secondary") return colors.contentPrimary;
        return colors.contentReversed;
    }

    if (["outlined", "subtle", "text"].includes(variant)) {
        switch (intent) {
            case "primary":
                return colors.contentAccent;
            case "secondary":
                return colors.contentPrimary;
            case "positive":
                return colors.positivePrimary;
            case "negative":
                return colors.negativePrimary;
        }
    }

    return colors.contentPrimary;
};

// -------------------- BUTTON COMPONENT --------------------
export const Button = ({
    children,
    variant = "solid",
    intent = "primary",
    size = "regular",
    disabled = false,
    onPress,
    ...acc
}: ButtonProps) => {
    const { theme } = useThemeContext();

    // dynamic styles
    const baseStyle = [
        styles.base,
        {
            paddingHorizontal: theme.spacing.medium,
            paddingVertical: theme.spacing.small,
            minHeight: config.regular.buttonMinHeight,
            minWidth: config.regular.buttonMinWidth,
            borderRadius: theme.borderRadius.medium,
            opacity: disabled ? 0.5 : 1,
        },
        size === "small" && {
            paddingHorizontal: theme.spacing.small,
            paddingVertical: theme.spacing.xsmall,
            minHeight: config.small.buttonMinHeight,
            minWidth: config.small.buttonMinWidth,
            borderRadius: theme.borderRadius.small,
        },
        size === "large" && {
            paddingHorizontal: theme.spacing.large,
            paddingVertical: theme.spacing.medium,
            minHeight: config.large.buttonMinHeight,
            minWidth: config.large.buttonMinWidth,
            borderRadius: theme.borderRadius.large,
        },
    ];

    const textStyle: any = [
        styles.text,
        size === "small" && theme.textVariants.body3,
        size === "regular" && theme.textVariants.body2,
        size === "large" && theme.textVariants.body2,
        { fontWeight: "bold" },
    ];

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            hitSlop={{ top: config[size].hitSlop, bottom: config[size].hitSlop }}
            role="button"
            {...acc}
        >
            {({ pressed }) => (
                <View style={[baseStyle, getButtonStyles(variant, intent, pressed, disabled, theme.colors)]}>
                    <Text style={[textStyle, { color: getTextColor(variant, intent, disabled, theme.colors) }]}>
                        {children}
                    </Text>
                </View>
            )}
        </Pressable>
    );
};

// -------------------- STATIC STYLES --------------------
const styles = StyleSheet.create({
    base: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
    },
});
