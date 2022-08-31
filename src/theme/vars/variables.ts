/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - important variables
 */

import {FontSizes, MetricSizes, ThemeColorSchemeOptions} from '../theme'
import {DEVICE_STATUSBAR_HEIGHT} from '@/configs'

/**
 * all constants for Metrics Sizes
 */
export const MetricSizeTypes: MetricSizes = {
    extraTiny: 2,
    tiny: 5,
    small: 10,
    regular: 15,
    medium: 20,
    large: 26,
    extraLarge: 32,
    massive: 5 * 4 * 5, // 100
    huge: 3 * 5 * 5 * 2, // 150

    statusBarHeight: DEVICE_STATUSBAR_HEIGHT, // this special key contains the value of status bar's height
}

/**
 * FontSize of almost all usecase...
 */
export const FontSizeTypes: FontSizes = {
    tiny: 12,
    small: 14,
    regular: 16,
    medium: 18,
    large: 22,
    extraLarge: 26,
}

const CombinedVariables = {
    metrics: MetricSizeTypes,
    fontsize: FontSizeTypes,
}

/**
 * all the types of colorschemes we have
 * and could be available to customize in both theme
 */
export const ThemeColorSchemeOptionsArray: ThemeColorSchemeOptions[] = [
    'blue',
    'pink',
    'red',
    'green',
    'yellow',
]

export default CombinedVariables
