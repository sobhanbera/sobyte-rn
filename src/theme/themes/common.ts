/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - colors which are common for every type theme
 */

import {CommonColors, ThemeColors} from '../theme'

/**
 * These are the main common colors
 * @common_colors_interface__object
 * this - @
 */
export const RequiredCommonColors: CommonColors = {
    white: '#FFFFFF',
    black: '#000000',
    grey: '#808080',
    dimGrey: '#696969',
    lightSlateGrey: '#778899',
    slateGrey: '#708090',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00',
    cyan: '#00FFFF',
    pink: '#FF00FF',
    purple: '#800080',
    orange: '#FFA500',
    lightBlue: '#98C1D9',
    darkBlue: '#3D5A80',
    cadetBlue: '#293241',
    transparent: '#00000000',
}

/**
 *
 * @param theme this is the object for Themes Object
 * i.e. @theme_interface__object
 * @returns the an object including all the theme color itself along with the required common colors
 * @deprecated currently deprecated
 */
export function ApplyAllRequiredColor(theme: ThemeColors) {
    return {
        ...theme,
        ...RequiredCommonColors,
    }
}

/**
 * default theme
 */
/**
 * @define as much themes you want below this comment only...
 * @and also give some sutaible detail of the corresponsing theme...
 */
export const DefaultTheme: ThemeColors = {
    /**
     * This is the object for Dark Theme
     */
    primary: {
        main: '#0F60B6',
        light: '#5a8de9',
        dark: '#003785',
    },
    secondary: {
        main: '#EF1559',
        light: '#F9B5AC',
        dark: '#EE7674',
    },

    background: '#101010',
    themecolor: '#000000',
    themecolorrevert: '#FFFFFF',

    surface: '#21242b',
    surfacelight: '#282B32',
    border: '#373737',
    placeholder: '#CFCFCF',
    text: '#EFEFEF',

    onSuccess: '#28a745',
    onError: '#FF5500',
    onWarning: '#ffc107',
    onDanger: '#dc3545',

    combinations: {
        blue: [
            '#0F002D',
            '#0F002D',
            '#0A032B',
            '#07012B',
            '#07012B',
            '#07012B',
            '#10003E',
            '#10004E',
        ],
        pink: [
            '#3D002F',
            '#3D002F',
            '#3B032A',
            '#3B0127',
            '#3B0127',
            '#3B0127',
            '#4E0030',
            '#5E0030',
        ],
        red: [
            '#2D000F',
            '#2D000F',
            '#2B030A',
            '#2B0107',
            '#2B0107',
            '#2B0107',
            '#3E0010',
            '#4E0010',
        ],
        green: [
            '#0F402D',
            '#0F402D',
            '#0A432B',
            '#07412B',
            '#07412B',
            '#07412B',
            '#10403E',
            '#10404E',
        ],
        yellow: [
            '#1F3D00',
            '#1F3D00',
            '#1A3B03',
            '#173B01',
            '#173B01',
            '#173B01',
            '#204E00',
            '#205E00',
        ],
    },
}
