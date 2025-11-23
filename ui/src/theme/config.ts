export const colors = {
    gray50: '#fafaf9',
    gray100: '#f5f5f4',
    gray150: '#f0efec',
    gray200: '#e7e5e4',
    gray300: '#d6d3d1',
    gray400: '#beb9b6',
    gray500: '#837b75',
    gray600: '#57534e',
    gray700: '#44403c',
    gray800: '#292524',
    gray900: '#1c1917',
    gray950: '#110e0c',

    teal150: '#d4edf0',
    teal300: '#a3d6da',
    teal400: '#6bbbc4',
    teal500: '#048391',
    teal600: '#007884',
    teal700: '#006771',
    teal800: '#004247',
    teal900: '#00282c',

    // Semantic colors
    green150: '#d2f2dd',
    green300: '#86efac',
    green500: '#22c55e',
    green700: '#15803d',
    green800: '#166534',

    red150: '#f0dada',
    red300: '#d19a9a',
    red500: '#c44e4e',
    red700: '#9b3535',
    red800: '#7a2828',

    blue300: '#6aa7f1',
    blue700: '#1d4ed8',

    // Non-semantic colors
    grape600: '#544171',
    eggplant600: '#714148',
    fjord600: '#415171',
    olive600: '#456138',
    sunshine200: '#f5be0a',
} as const;

const fontSizes = {
    xxlarge: {
        fontSize: 32,
        lineHeight: 32,
    },
    xlarge: {
        fontSize: 24,
        lineHeight: 30,
    },
    large: {
        fontSize: 18,
        lineHeight: 25,
    },
    medium: {
        fontSize: 16,
        lineHeight: 21,
    },
    small: {
        fontSize: 14,
        lineHeight: 19,
    },
    xsmall: {
        fontSize: 13,
        lineHeight: 16,
    },
} as const;

export const lightTheme = {
    colors: {
        backgroundPrimary: colors.gray100,
        backgroundSecondary: colors.gray200,
        backgroundTertiary: colors.gray300,
        backgroundQuaternary: colors.gray400,

        surfacePrimary: colors.gray100,
        surfaceSecondary: colors.gray200,
        surfaceTertiary: colors.gray300,
        surfaceQuaternary: colors.gray500,

        surfaceReversedPrimary: colors.gray800,
        surfaceReversedSecondary: colors.gray700,

        accentPrimary: colors.teal700,
        accentSecondary: colors.teal800,
        accentTertiary: colors.teal300,
        accentQuaternary: colors.teal150,

        contentPrimary: colors.gray950,
        contentSecondary: colors.gray800,
        contentTertiary: colors.gray600,
        contentQuaternary: colors.gray500,
        contentReversed: colors.gray50,
        contentAccent: colors.teal700,

        borderPrimary: colors.gray300,
        borderSecondary: colors.gray200,

        shadowPrimary: colors.gray800,

        overlay: colors.gray600,

        transparent: 'transparent',

        // Semantic colors
        informativePrimary: colors.blue700,

        positivePrimary: colors.green800,
        positiveSecondary: colors.green700,
        positiveTertiary: colors.green300,
        positiveQuaternary: colors.green150,

        negativePrimary: colors.red800,
        negativeSecondary: colors.red700,
        negativeTertiary: colors.red300,
        negativeQuaternary: colors.red150,

        // Non-semantic colors
        white: colors.gray50,
        black: colors.gray950,
        berryStrong: colors.grape600,
        wineStrong: colors.eggplant600,
        imperialBlueStrong: colors.fjord600,
        darkOliveStrong: colors.olive600,
        sunshineStrong: colors.sunshine200,
    },
    borderRadius: {
        xsmall: 4,
        small: 8,
        medium: 12,
        large: 16,
        xlarge: 24,
        full: 999,
    },
    fontSizes,
    spacing: {
        xxsmall: 2,
        xsmall: 4,
        small: 8,
        medium: 12,
        large: 16,
        xlarge: 24,
        xxlarge: 32,
    },
    textVariants: {
        heading1: {
            ...fontSizes.xxlarge,
            fontWeight: '900',
            letterSpacing: -1,
        },
        heading2: {
            ...fontSizes.xlarge,
            fontWeight: '800',
        },
        heading3: {
            ...fontSizes.large,
            fontWeight: '700',
        },
        body1: {
            ...fontSizes.medium,
            fontWeight: '400',
        },
        body2: {
            ...fontSizes.small,
            fontWeight: '400',
        },
        body3: {
            ...fontSizes.xsmall,
            fontWeight: '400',
        },
    },
} as const;

export const darkTheme = {
    ...lightTheme,
    colors: {
        ...lightTheme.colors,

        backgroundPrimary: colors.gray900,
        backgroundSecondary: colors.gray950,
        backgroundTertiary: colors.gray800,
        backgroundQuaternary: colors.gray600,

        surfacePrimary: colors.gray800,
        surfaceSecondary: colors.gray700,
        surfaceTertiary: colors.gray600,
        surfaceQuaternary: colors.gray500,

        surfaceReversedPrimary: colors.gray100,
        surfaceReversedSecondary: colors.gray200,

        accentPrimary: colors.teal600,
        accentSecondary: colors.teal700,
        accentTertiary: colors.teal800,
        accentQuaternary: colors.teal900,

        contentPrimary: colors.gray50,
        contentSecondary: colors.gray300,
        contentTertiary: colors.gray400,
        contentAccent: colors.teal400,
        contentReversed: colors.gray900,

        borderPrimary: colors.gray700,
        borderSecondary: colors.gray900,

        shadowPrimary: colors.gray600,

        overlay: colors.gray600,

        // Semantic colors
        informativePrimary: colors.blue300,

        positivePrimary: colors.green300,
        positiveSecondary: colors.green150,
        positiveTertiary: colors.green700,
        positiveQuaternary: colors.green800,

        negativePrimary: colors.red300,
        negativeSecondary: colors.red150,
        negativeTertiary: colors.red700,
        negativeQuaternary: colors.red800,
    },
} as const;
