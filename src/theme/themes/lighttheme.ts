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

    primary: {
        main: '#EF1559',
        light: '#F9B5AC',
        dark: '#EE7674',
    },
    secondary: {
        main: '#EF1559',
        light: '#F9B5AC',
        dark: '#EE7674',
    },

    background: '#101010',
    themecolor: '#000000',
    themecolorrevert: '#FFFFFF',

    surface: '#050505',
    surfacelight: '#21242b',
    border: '#303030',
    placeholder: '#CFCFCF',
    text: '#EFEFEF',

    onSuccess: '#28a745',
    onError: '#FF5500',
    onWarning: '#ffc107',
    onDanger: '#dc3545',
}
