/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - modals for theme, fonts, metrics, layouts, styles, etc
 */

import {RequiredCommonColors} from '.'
import {fontStyles, gutterStyles, layoutStyles} from './vars'
import CombinedVariables from './vars/variables'

/**
 * Some Common Color which always are constant and universal...
 * @common_colors_interface
 */
export interface CommonColors {
    white: string
    black: string
    grey: string
    dimGrey: string
    lightSlateGrey: string
    slateGrey: string
    red: string
    green: string
    blue: string
    yellow: string
    cyan: string
    pink: string
    purple: string
    orange: string
    lightBlue: string
    darkBlue: string
    cadetBlue: string
    transparent: string
}

/**
 * This interface is to create the Theme object with the following properties and
 * including Common Colors
 * @theme_interface + @common_colors_interface
 *
 * above mentions @common_colors_interface is now deprecated for v2 of this application
 * since the common colors are provided as single and seperate parameter in useTheme hook!
 * why to provide the same stuffs everytime in different ways! haha :)
 */
export interface ThemeColors /* extends CommonColors */ {
    primary: {
        main: string
        light: string
        dark: string
    }
    secondary: {
        main: string
        light: string
        dark: string
    }

    /**
     * #000000 for dark or else #FFFFFF
     */
    themecolor: string
    /**
     * vice versa
     */
    themecolorrevert: string

    background: string
    surface: string
    surfacelight: string
    border: string
    placeholder: string
    text: string

    onSuccess: string
    onError: string
    onWarning: string
    onDanger: string

    // these gradient colors arrays must be of length 8 not >8 not <8 exactly =8
    combinations: {
        blueGradient: string[] // blue gradient colors, application_code_name - bisman
        pinkGradient: string[] // pink gradient colors, application_code_name - flamingo
        redGradient: string[] // red gradient colors, application_code_name - Phoenix
        greenGradient: string[] // green gradient colors, application_code_name - Emerald
        yellowGradient: string[] // yellow gradient colors, application_code_name - canary
    }
}

// types of theme string
export type ThemeOptions = 'dark' | 'default' | 'light'

/**
 * all the available font sizes
 */
export interface FontSizes {
    tiny: number
    small: number
    regular: number
    medium: number
    large: number
    extraLarge: number
}

/**
 * types of metrics avilable
 * this might be padding, margin or anything like that...
 */
export interface MetricSizes {
    small: number
    tiny: number
    regular: number
    medium: number
    large: number
}

/**
 * types of margin and padding directions
 * for components
 */
export type MarginDirections =
    | 'MarginBottom'
    | 'MarginTop'
    | 'MarginRight'
    | 'MarginLeft'
    | 'MarginVertical'
    | 'MarginHorizontal'
export type PaddingDirections =
    | 'PaddingBottom'
    | 'PaddingTop'
    | 'PaddingRight'
    | 'PaddingLeft'
    | 'PaddingVertical'
    | 'PaddingHorizontal'

/**
 * all types of properties which could be used throughout the codebase
 * like fontsize, colors, metrics etc
 * this is the type for that
 */
export type CombinedThemeVariables = {
    colors: typeof RequiredCommonColors
    fontsize: typeof CombinedVariables.fontsize
    metrics: typeof CombinedVariables.metrics
}

/**
 * seperate type of theme which will contain all the parameters
 * like font, gutter, layouts etc
 */
export type ThemeType<T, F, G, L, CV> = {
    theme: T
    fonts: F
    gutters: G
    layouts: L
    variables: CV
}

/**
 * combination type of all the above types
 */
export type ThemeCombinationParams = Pick<
    ThemeType<
        ThemeColors,
        typeof fontStyles,
        typeof gutterStyles,
        typeof layoutStyles,
        CombinedThemeVariables
    >,
    'theme' | 'fonts' | 'gutters' | 'layouts' | 'variables'
>
