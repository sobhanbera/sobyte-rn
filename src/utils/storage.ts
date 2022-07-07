/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - storage related util functions
 */

import AsyncStorage from '@react-native-async-storage/async-storage'

import {SearchOptions} from '@/schemas'

/**
 * saves some string to the local storage directory given some parameters depending on the data type
 *
 * @param key any default constants where the name of alias of save location starts
 * @param category category name could be song, artist, playlist, album, etc.
 * @param query the actual query which is queried to get the @value
 * @param value the value to save
 * @returns {Promise<void>}
 */
export function setDataToLocalStorage(
    key: string,
    category: SearchOptions,
    query: string,
    value: string,
): Promise<void> {
    return AsyncStorage.setItem(`${key}-${category}-${query}`, value)
}

/**
 * provides the data from the local storage after getting with the help of AsyncStorage
 * provided the following paramter about the location
 *
 * @param key alias of the starting location name where the data will be saved
 * @param category data about query type song, artist, album, playlist, etc
 * @param query the actual query done to get the data
 * @returns a value from the local storage
 */
export function getDataFromLocalStorage(
    key: string,
    category: SearchOptions,
    query: string,
): Promise<Object> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(`${key}-${category}-${query}`)
            .then((res: any) => {
                resolve(JSON.parse(res))
            })
            .catch(err => {
                reject(err)
            })
    })
}
