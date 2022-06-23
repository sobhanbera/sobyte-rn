/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - This file contains all application's style relative to fonts
 */

import {StyleSheet} from 'react-native'
import {CombinedThemeVariables} from '../theme'

export default function GetFonts({fontsize}: CombinedThemeVariables) {
    return StyleSheet.create({
        textTiny: {
            fontSize: fontsize.tiny,
        },
        textSmall: {
            fontSize: fontsize.small,
        },
        textRegular: {
            fontSize: fontsize.regular,
        },
        textMedium: {
            fontSize: fontsize.medium,
        },
        textLarge: {
            fontSize: fontsize.large,
        },
        textExtraLarge: {
            fontSize: fontsize.extraLarge,
        },

        titleTiny: {
            fontSize: fontsize.tiny * 2,
            fontWeight: 'bold',
        },
        titleSmall: {
            fontSize: fontsize.small * 2,
            fontWeight: 'bold',
        },
        titleRegular: {
            fontSize: fontsize.regular * 2,
            fontWeight: 'bold',
        },
        titleMedium: {
            fontSize: fontsize.medium * 2,
            fontWeight: 'bold',
        },
        titleLarge: {
            fontSize: fontsize.large * 2,
            fontWeight: 'bold',
        },
        titleExtraLarge: {
            fontSize: fontsize.extraLarge * 2,
            fontWeight: 'bold',
        },

        textCenter: {
            textAlign: 'center',
        },
        textJustify: {
            textAlign: 'justify',
        },
        textLeft: {
            textAlign: 'left',
        },
        textRight: {
            textAlign: 'right',
        },
    })
}
