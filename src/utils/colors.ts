/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - util functions for colors and all...
 */

import {
    COLOR_SMOOTHNING_ALPHAS,
    DEFUALT_LENGTH_OF_LINEAR_GRADIENT_COLORS,
} from '@/configs'

/**
 * provide a color and get a linear gradient color containing array
 * @param color and hex color value without alpha value
 * @param numberOfColors size of the array which will be returned as a linear gradient color elements
 */
export function getSmoothLinearGradient(
    color: string,
    numberOfColors: number = DEFUALT_LENGTH_OF_LINEAR_GRADIENT_COLORS,
): string[] {
    // checking if a linear gradient could be formed
    // for that at least 2 colors must be wanted
    if (numberOfColors <= 1) return [color]

    /**
     * if the number of colors we have to return is not valid, that means if it is more that the maximum length
     * we can provide, then we will update it to be cover inside the safe length and then return that
     */
    // if (numberOfColors > COLOR_SMOOTHNING_ALPHAS.length)
    //     numberOfColors %= COLOR_SMOOTHNING_ALPHAS.length // always less than the length of COLOR_SMOOTHNING_ALPHAS

    // or else we can set it to the length of COLOR_SMOOTHNING_ALPHAS
    if (numberOfColors > COLOR_SMOOTHNING_ALPHAS.length)
        numberOfColors = COLOR_SMOOTHNING_ALPHAS.length

    var smooothenedColors: string[] = []
    for (var i = 0; i < numberOfColors; ++i)
        smooothenedColors = [
            ...smooothenedColors,
            `${color}${COLOR_SMOOTHNING_ALPHAS[i]}`,
        ]

    return smooothenedColors
}
