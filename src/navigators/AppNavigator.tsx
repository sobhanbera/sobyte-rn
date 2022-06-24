import React from 'react'
import {View, Text} from 'react-native'

import {useTheme} from '@/hooks'

export default function AppNavigator() {
    const {fonts, colorscheme} = useTheme()

    return (
        <View>
            <Text
                style={[
                    fonts.titleMedium,
                    {
                        color: colorscheme[0],
                    },
                ]}>
                {' '}
                HEllo
            </Text>
        </View>
    )
}
