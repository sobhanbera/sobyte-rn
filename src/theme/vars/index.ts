/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - some important collection or combined styles in one place
 */

import {CombinedThemeVariables} from '../theme'
import {RequiredCommonColors} from '..'

import GetFonts from './fonts'
import GetGutters from './gutters'
import GetLayouts from './layouts'
import GetAssets from './assets'

import CombinedVariables, {
    FontSizeTypes,
    MetricSizeTypes,
    ThemeColorSchemeOptionsArray,
} from './variables'

export const VariablesCollection: CombinedThemeVariables = {
    colors: RequiredCommonColors,
    fontsize: CombinedVariables.fontsize,
    metrics: CombinedVariables.metrics,
}

/**
 * styles related to fonts, gutter and layout in single variable
 * also all types of assets...
 */
export const fontStyles = GetFonts(VariablesCollection)
export const gutterStyles = GetGutters(VariablesCollection)
export const layoutStyles = GetLayouts()
export const appAssets = GetAssets()

export {
    GetFonts,
    GetGutters,
    GetLayouts,
    GetAssets,
    CombinedVariables,
    FontSizeTypes,
    MetricSizeTypes,
    ThemeColorSchemeOptionsArray,
}
