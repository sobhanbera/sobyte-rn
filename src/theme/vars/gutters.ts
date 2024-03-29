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
                [`${key}Margin`]: {
                    margin: value,
                },
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
                [`${key}MarginExceptTop`]: {
                    marginHorizontal: value,
                    marginBottom: value,
                },
                [`${key}MarginExceptBottom`]: {
                    marginHorizontal: value,
                    marginTop: value,
                },
                [`${key}MarginExceptRight`]: {
                    marginVertical: value,
                    marginLeft: value,
                },
                [`${key}MarginExceptLeft`]: {
                    marginVertical: value,
                    marginRight: value,
                },

                /* Paddings */
                [`${key}Padding`]: {
                    padding: value,
                },
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
                [`${key}PaddingExceptTop`]: {
                    paddingHorizontal: value,
                    paddingBottom: value,
                },
                [`${key}PaddingExceptBottom`]: {
                    paddingHorizontal: value,
                    paddingTop: value,
                },
                [`${key}PaddingExceptRight`]: {
                    paddingVertical: value,
                    paddingLeft: value,
                },
                [`${key}PaddingExceptLeft`]: {
                    paddingVertical: value,
                    paddingRight: value,
                },
            }),
            {},
        ) as Gutters,
    )
}
