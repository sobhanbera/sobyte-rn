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

import CombinedVariables, {FontSizeTypes, MetricSizeTypes} from './variables'

export const VariablesCollection: CombinedThemeVariables = {
    colors: RequiredCommonColors,
    fontsize: CombinedVariables.fontsize,
    metrics: CombinedVariables.metrics,
}

/**
 * styles related to fonts, gutter and layout in single variable
 */
export const fontStyles = GetFonts(VariablesCollection)
export const gutterStyles = GetGutters(VariablesCollection)
export const layoutStyles = GetLayouts()

export {
    GetFonts,
    GetGutters,
    GetLayouts,
    CombinedVariables,
    FontSizeTypes,
    MetricSizeTypes,
}
