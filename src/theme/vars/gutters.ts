/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - gutters related stylesheets
 */

import {StyleSheet} from 'react-native'
import {
    CombinedThemeVariables,
    MarginDirections,
    PaddingDirections,
} from '../theme'

// combination of all the metrics and directions of margin
type MarginKeys =
    `${keyof CombinedThemeVariables['metrics']}${MarginDirections}`
// combination of all the metrics and directions of padding
type PaddingKeys =
    `${keyof CombinedThemeVariables['metrics']}${PaddingDirections}`

// overall gutter type
type Gutters = {
    [key in MarginKeys | PaddingKeys]: {
        [k in string]: number
    }
}

/**
 * get the full combination of all the margins and paddings like:
 * tinyMarginBottom, smallPaddingTop, mediumMarginRight, largePaddingLeft, etc...
 * @param param0 object containing all types of metric sizes
 * @returns stylesheet
 */
export default function GetGutters({metrics}: CombinedThemeVariables): Gutters {
    return StyleSheet.create(
        Object.entries(metrics).reduce(
            (acc, [key, value]) => ({
                ...acc,
                /* Margins */
                [`${key}MarginBottom`]: {
                    marginBottom: value,
                },
                [`${key}MarginTop`]: {
                    marginTop: value,
                },
                [`${key}MarginRight`]: {
                    marginRight: value,
                },
                [`${key}MarginLeft`]: {
                    marginLeft: value,
                },
                [`${key}MarginVertical`]: {
                    marginVertical: value,
                },
                [`${key}MarginHorizontal`]: {
                    marginHorizontal: value,
                },
                /* Paddings */
                [`${key}PaddingBottom`]: {
                    paddingBottom: value,
                },
                [`${key}PaddingTop`]: {
                    paddingTop: value,
                },
                [`${key}PaddingRight`]: {
                    paddingRight: value,
                },
                [`${key}PaddingLeft`]: {
                    paddingLeft: value,
                },
                [`${key}PaddingVertical`]: {
                    paddingVertical: value,
                },
                [`${key}PaddingHorizontal`]: {
                    paddingHorizontal: value,
                },
            }),
            {},
        ) as Gutters,
    )
}
