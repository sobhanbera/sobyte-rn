/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - theme based redux reducer
 */

import {createSlice} from '@reduxjs/toolkit'

import {ThemeColorSchemeOptions, ThemeOptions} from '@/theme/theme'
import {DarkTheme, LightTheme, ThemeColorSchemeOptionsArray} from '@/theme'

/**
 * theme distributed along with the name as key
 */
export const ThemeDistribution = {
    default: DarkTheme,
    dark: DarkTheme,
    light: LightTheme,
}

// state of this theme
export type ThemeState = {
    themeName: ThemeOptions
    isDarkTheme: boolean
    colorSchemeName: ThemeColorSchemeOptions
}
// default payload type
type ThemePayload = {
    payload: Partial<ThemeState>
}

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        themeName: 'dark',
        isDarkTheme: true,
        colorSchemeName: 'blue',
    } as ThemeState,

    reducers: {
        /**
         * update the theme for overall application
         * @param state initial state (this is not provided during dispatch of any action)
         * @param param payload
         */
        changeTheme: (
            state,
            {payload: {themeName = 'dark', isDarkTheme = true}}: ThemePayload,
        ) => {
            /**
             * if themeName passed from argument is 'light' of isDarkTheme is false
             * then change the theme to light theme
             * else change it to dark theme
             */
            if (themeName === 'light' || isDarkTheme === false)
                return {
                    ...state,
                    themeName: 'light',
                    isDarkTheme: false,
                }
            else
                return {
                    ...state,
                    themeName: 'dark',
                    isDarkTheme: true,
                }
        },

        /**
         * toggles the current theme
         * i.e. light -> dark, dark -> light
         * @param state initial state
         */
        toggleTheme: (state: ThemeState, {}) => {
            // if the current theme is light theme, then update it to dark
            if (state.themeName === 'light')
                return {
                    ...state,
                    themeName: 'dark',
                    isDarkTheme: true,
                }
            // vice versa
            else
                return {
                    ...state,
                    themeName: 'light',
                    isDarkTheme: false,
                }
        },

        changeColorScheme: (
            state: ThemeState,
            {payload: {colorSchemeName = 'blue'}}: ThemePayload,
        ) => {
            // checking whether the passed colorSchemeName is valid or not
            if (ThemeColorSchemeOptionsArray.includes(colorSchemeName))
                return {
                    ...state,
                    colorSchemeName,
                }
            return state
        },
    },
})

export const {changeTheme, toggleTheme, changeColorScheme} = themeSlice.actions

const {reducer} = themeSlice
export {reducer as ThemeReducer}
