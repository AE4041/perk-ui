import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { applyVariants } from '../../utils/variants';


type Size = 'small' | 'medium' | 'large';


export type ButtonProps = {
    children?: React.ReactNode;
    onPress?: (e: GestureResponderEvent) => void;
    size?: Size;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
    style?: any;
};


const baseStyles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '600'
    }
});


const variants = {
    size: {
        small: { paddingVertical: 6, paddingHorizontal: 10 },
        medium: { paddingVertical: 10, paddingHorizontal: 16 },
        large: { paddingVertical: 14, paddingHorizontal: 20 }
    },
    variant: {
        primary: { backgroundColor: '#0b74ff' },
        secondary: { backgroundColor: '#e5e7eb' },
        ghost: { backgroundColor: 'transparent' }
    },
    disabled: {
        true: { opacity: 0.5 }
    }
};


export const Button = ({ children, onPress, size = 'medium', variant = 'primary', disabled = false, style }: ButtonProps) => {
    const btnStyle = applyVariants(baseStyles.button, { size, variant, disabled }, variants as any);


    return (
        <Pressable onPress={disabled ? undefined : onPress} style={[btnStyle, style]} accessibilityRole="button" disabled={disabled}>
            <Text style={baseStyles.text}>{children}</Text>
        </Pressable>
    );
};


export default Button;