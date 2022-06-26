/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Tyepscript
 *
 * Purpose - internationalization configurations...
 */

import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {AvailableLanguages, LanguageOptions} from './resources'
import {LANGUAGE_CODE_STORAGE_KEY} from '@/configs'

/**
 * initialize internationalization feature for app
 * using i18next along with react-i18next package to init this service
 */
i18next
    .use({
        type: 'languageDetector',
        async: true, // If this is set to true, your detect function receives a callback function that you should call with your language, useful to retrieve your language stored in AsyncStorage for example

        init: function (
            _services: any,
            _detectorOptions: any,
            _i18nextOptions: any,
        ) {
            /* use services and options */
        },
        detect: async function (callback: Function) {
            // You'll receive a callback if you passed async true
            const savedDataJSON: LanguageOptions | any =
                await AsyncStorage.getItem(LANGUAGE_CODE_STORAGE_KEY)

            callback(savedDataJSON || 'hi')
        },
        cacheUserLanguage: function (_language: string) {},
    })
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',

        fallbackLng: 'hi',
        react: {
            useSuspense: false,
        },

        ns: ['commons'],
        defaultNS: 'commons',

        interpolation: {
            escapeValue: false,
        },
        /**
         * collecting all the language objects inside of single and passing it to the resources
         * these resource will be used when any translation is being called at any part of the application
         */
        resources: AvailableLanguages,
    })

export default i18next // just in case to get the full name of the package without developer's ambiguity
export {i18next as i18n} // just to match with the folder name
