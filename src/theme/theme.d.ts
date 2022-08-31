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
import {fontStyles, gutterStyles, layoutStyles, appAssets} from './vars'
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
    surfaceborder: string
    surfacelightborder: string

    placeholder: string
    text: string

    onSuccess: string
    onError: string
    onWarning: string
    onDanger: string

    // these gradient colors arrays must be of length 8 not >8 not <8 exactly =8
    combinations: {
        blue: string[] // blue gradient colors, application_code_name - bisman
        pink: string[] // pink gradient colors, application_code_name - flamingo
        red: string[] // red gradient colors, application_code_name - Phoenix
        green: string[] // green gradient colors, application_code_name - Emerald
        yellow: string[] // yellow gradient colors, application_code_name - canary
    }
}

// types of theme string
export type ThemeOptions = 'dark' | 'default' | 'light'
export type ThemeColorSchemeOptions =
    | 'blue'
    | 'pink'
    | 'red'
    | 'green'
    | 'yellow'

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
 * types of metrics available
 * this might be padding, margin or anything like that...
 */
export interface MetricSizes {
    extraTiny: number
    tiny: number
    small: number
    regular: number
    medium: number
    large: number
    extraLarge: number
    massive: number
    huge: number

    statusBarHeight: number // special key, this key will provide data specific to status bar's height
}

/**
 * types of margin and padding directions
 * for components
 */
export type MarginDirections =
    | 'Margin'
    | 'MarginBottom'
    | 'MarginTop'
    | 'MarginRight'
    | 'MarginLeft'
    | 'MarginVertical'
    | 'MarginHorizontal'
    | 'MarginExceptTop'
    | 'MarginExceptBotom'
    | 'MarginExceptRight'
    | 'MarginExceptLeft'
export type PaddingDirections =
    | 'Padding'
    | 'PaddingBottom'
    | 'PaddingTop'
    | 'PaddingRight'
    | 'PaddingLeft'
    | 'PaddingVertical'
    | 'PaddingHorizontal'
    | 'PaddingExceptTop'
    | 'PaddingExceptBotom'
    | 'PaddingExceptRight'
    | 'PaddingExceptLeft'

/**
 * all the assets available in the application
 * this is the blueprint of assets in the app
 */
export interface SobyteAssets {
    animations: {
        dancing_logo: any
        rythm: any
    }
    audios: {}
    fonts: {}
    images: {
        logos: {
            named: any
            sobyte_white: any
        }
        icons: {
            backward: any
            backwardb: any
            forward: any
            forwardb: any
            pause: any
            play: any
        }
    }
    videos: {}
}

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
export type ThemeType<T, C, F, G, L, A, CV> = {
    theme: T
    colorscheme: C
    fonts: F
    gutters: G
    layouts: L
    assets: A
    variables: CV
}

/**
 * combination type of all the above types
 */
export type ThemeCombinationParams = Pick<
    ThemeType<
        ThemeColors,
        Array<string>,
        typeof fontStyles,
        typeof gutterStyles,
        typeof layoutStyles,
        typeof appAssets,
        CombinedThemeVariables
    >,
    | 'theme'
    | 'colorscheme'
    | 'fonts'
    | 'gutters'
    | 'layouts'
    | 'assets'
    | 'variables'
>
