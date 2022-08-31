/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - screen for user's profile....
 */

import React from 'react'
import {Text, View} from 'react-native'
import {NavigationHelpers} from '@react-navigation/native'

export interface UserProfileScreenProps {
    navigation: NavigationHelpers<any>
}
export function UserProfileScreen({navigation}: UserProfileScreenProps) {
    return (
        <View>
            <Text>Profile</Text>
        </View>
    )
}
