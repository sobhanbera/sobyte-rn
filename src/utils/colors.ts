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
 * @param repeatReversed a boolean value if true then provides the array concating the reverse of it
 * @param reverse a boolean value if the array should be returned reverse or not
 * @param numberOfColors size of the array which will be returned as a linear gradient color elements
 * @returns a color string containing array for linear gradient purpose
 */
export function getSmoothLinearGradient(
    color: string,
    repeatReversed: boolean = false,
    reverse: boolean = false, // initial value if false, so that we will return proper array..
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

    // if repeatReversed is true than we will return array+reverse(array)
    if (repeatReversed) {
        // console.log([...smooothenedColors.reverse(), ...smooothenedColors])
        /**
         * both are reverse because -
         * we are by default providing low opacity to high, but in this case we need to provide high-low-high opacity color array
         * to do that first we need to reverse the actual array
         * then the value get reversed too
         * so, to get the initial actual array we need to reverse it once more...
         */
        return [...smooothenedColors.reverse(), ...smooothenedColors.reverse()] // both are reversed because
    }
    // if reverse is true than return reverse(array)
    if (reverse) return smooothenedColors.reverse()

    // else return the normal color array
    return smooothenedColors
}
