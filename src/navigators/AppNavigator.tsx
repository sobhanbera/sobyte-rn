import React from 'react'
import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LANGUAGE_CODE_STORAGE_KEY} from '@/configs/storage'
import {useTheme} from '@/hooks'

export default function AppNavigator() {
    const {t, i18n} = useTranslation()
    const {fonts, theme} = useTheme()

    const lang = 'bn'
    const changeLanguage = async () => {
        await i18n.changeLanguage(lang, async (_err, _t) => {
            await AsyncStorage.setItem(LANGUAGE_CODE_STORAGE_KEY, lang)
            console.log(
                'changed',
                await AsyncStorage.getItem(LANGUAGE_CODE_STORAGE_KEY),
            )
        })
    }

    return (
        <View>
            <Text
                style={[
                    fonts.titleMedium,
                    {
                        color: theme.primary.main,
                    },
                ]}
                onPress={changeLanguage}>
                {t('lang:hello')}
            </Text>
        </View>
    )
}
