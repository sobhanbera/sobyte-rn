/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - this is a template to create screens or components....
 */

import React from 'react'
import {View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

export interface TemplateDemoProps {
    navigation: NavigationHelpers<any>
}
export function TemplateDemo({navigation}: TemplateDemoProps) {
    return <View></View>
}
