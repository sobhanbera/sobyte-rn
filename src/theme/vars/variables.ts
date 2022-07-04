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
    extraTiny: 3, // 3
    tiny: 5, // 5
    small: 5 * 2, // 10
    regular: 5 * 3, // 15
    medium: 5 * 3 * 1.5, // 22.5
    large: 5 * 3 * 2, // 30
    extraLarge: 5 * 4 * 2, // 40
    massive: 5 * 4 * 5, // 100
    huge: 3 * 5 * 5 * 2, // 150

    statusBarHeight: DEVICE_STATUSBAR_HEIGHT, // this special key contains the value of status bar's height
}

/**
 * FontSize of almost all usecase...
 */
export const FontSizeTypes: FontSizes = {
    tiny: 12,
    small: 16,
    regular: 20,
    medium: 30,
    large: 36,
    extraLarge: 48,
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
