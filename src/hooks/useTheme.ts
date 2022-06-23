/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - useTheme hook to provide all the theme data
 */

import {useSelector} from 'react-redux'

import {ThemeState, ThemeDistribution} from '@/redux/reducers/Theme'
import {
    RequiredCommonColors,
    fontStyles,
    gutterStyles,
    layoutStyles,
    FontSizeTypes,
    MetricSizeTypes,
} from '@/theme'
import {ThemeCombinationParams} from '@/theme/theme'

/**
 * a simple hook to get all the theme data related things throughout the whole application...
 * @returns {ThemeCombinationParams} the full collection/combination of all the available font styles, gutter styles, themedata, etc.
 */
export function useTheme(): ThemeCombinationParams {
    // Get current theme from the store
    const themeState = useSelector((state: ThemeState) => state)

    /**
     * Build the default theme
     * this is the combination of all the available style type parameters
     *
     * @param {ThemeColors} theme: colorscheme based on themes
     * @param {FontStyles} fonts: all the font styles
     * @param {GutterStyles} gutters: every gutter styles
     * @param {LayoutStyles} layouts: all styles related to layouts and all
     * @param {CombinedThemeVariables} variables: {
     *      @param {CommonColors} colors: common colors for both the themes
     *      @param {[key: string]: number} fontsize: all the font sizes we can use
     *      @param {[key: string]: number} metrics: all the metrics sizes we can use
     * }
     */
    const baseTheme: ThemeCombinationParams = {
        theme: ThemeDistribution[themeState.themeName],
        fonts: fontStyles,
        gutters: gutterStyles,
        layouts: layoutStyles,
        variables: {
            colors: RequiredCommonColors,
            fontsize: FontSizeTypes,
            metrics: MetricSizeTypes,
        },
    }

    return baseTheme
}
