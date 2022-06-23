/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - light theme colorschemes
 */

import {ThemeColors} from '../theme'
import {DefaultTheme} from './common'

/**
 * Here different Theme could be written which should include all the following properties of @theme_interface
 * and includig @common_colors_interface as the object given above @theme_interface__object + @common_colors_interface__object
 *
 * @define as much themes you want below this comment only...
 * @and also give some sutaible detail of the corresponsing theme...
 */
export const LightTheme: ThemeColors = {
    ...DefaultTheme,

    // TODO: entries for light theme
    combinations: {
        blueGradient: [],
        greenGradient: [],
        pinkGradient: [],
        redGradient: [],
        yellowGradient: [],
    },
}
