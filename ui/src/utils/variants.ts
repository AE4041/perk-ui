import { StyleSheet } from 'react-native';


export type VariantConfig<T> = {
    [K in keyof T]?: Record<string, any>;
};


// applyVariants(baseStyles, props, config)
export function applyVariants<T extends object>(
    base: any,
    props: T,
    config: VariantConfig<T>
) {
    const variantStyles: any[] = [];

    for (const key in config) {
        const value = (props as any)[key];
        if (value == null) continue;
        const group = (config as any)[key] as Record<string, any>;
        if (typeof value === 'boolean') {
            if (value && group['true']) variantStyles.push(group['true']);
        } else if (group[value]) {
            variantStyles.push(group[value]);
        }
    }


    return StyleSheet.flatten([base, ...variantStyles]);
}