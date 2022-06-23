import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {useTranslation} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch, useSelector} from 'react-redux'

import {LANGUAGE_CODE_STORAGE_KEY} from '@/configs/storage'
import {useTheme} from '@/hooks'
import {changeTheme, SobyteState, toggleTheme} from '@/state'

export default function AppNavigator() {
    const {t, i18n} = useTranslation()
    const {fonts, theme} = useTheme()
    const dispatch = useDispatch()

    const [lang, setLang] = useState('en')

    const changeLanguage = async () => {
        let flangg = 'bn'
        if (lang === 'bn') flangg = 'en'
        if (lang === 'en') flangg = 'hi'
        if (lang === 'hi') flangg = 'mr'
        if (lang === 'mr') flangg = 'bn'
        await i18n.changeLanguage(flangg, async (_err, _t) => {
            await AsyncStorage.setItem(LANGUAGE_CODE_STORAGE_KEY, flangg)
            setLang(flangg)
        })
    }

    const toggleAppTheme = () => {
        // dispatch(toggleTheme({}))
        // dispatch(
        //     changeTheme({
        //         themeName: 'light',
        //     }),
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
                onPress={() => {
                    changeLanguage()
                    toggleAppTheme()
                }}>
                {t('lang:hello')}
            </Text>
        </View>
    )
}
