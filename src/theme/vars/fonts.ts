/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - This file contains all application's style relative to fonts
 */

import {
    CircularBlack,
    CircularBold,
    CircularLight,
    CircularMedium,
    CircularRegular,
} from '@/configs'
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
            fontFamily: CircularBold,
            fontSize: fontsize.tiny * 1.5,
        },
        titleSmall: {
            fontFamily: CircularBold,
            fontSize: fontsize.small * 1.5,
        },
        titleRegular: {
            fontFamily: CircularBold,
            fontSize: fontsize.regular * 1.5,
        },
        titleMedium: {
            fontFamily: CircularBold,
            fontSize: fontsize.medium * 1.5,
        },
        titleLarge: {
            fontFamily: CircularBold,
            fontSize: fontsize.large * 1.5,
        },
        titleExtraLarge: {
            fontFamily: CircularBold,
            fontSize: fontsize.extraLarge * 1.5,
        },

        lightFont: {
            fontFamily: CircularLight,
        },
        regularFont: {
            fontFamily: CircularRegular,
        },
        mediumFont: {
            fontFamily: CircularMedium,
        },
        boldFont: {
            fontFamily: CircularBold,
        },
        blackFont: {
            fontFamily: CircularBlack,
        },

        textCenter: {
            textAlign: 'center',
        },
        textVCenter: {
            textAlignVertical: 'center',
        },
        textAllCenter: {
            textAlign: 'center',
            textAlignVertical: 'center',
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
