/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - important variables
 */

import {FontSizes, MetricSizes} from '../theme'

/**
 * all constants for Metrics Sizes
 */
export const MetricSizeTypes: MetricSizes = {
    tiny: 5, // 5
    small: 5 * 2, // 10
    regular: 5 * 3, // 15
    medium: 5 * 3 * 1.5, // 22.5
    large: 5 * 3 * 2, // 30
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

export default CombinedVariables
