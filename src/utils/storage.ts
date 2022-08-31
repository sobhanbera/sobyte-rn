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
import {
    SEARCHED_ARTIST_OFFLINE_DATA_STORAGE_KEY,
    SEARCHED_PLAYLIST_OFFLINE_DATA_STORAGE_KEY,
    SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY,
} from '@/configs'

/**
 * this method returns a string which denotes where to save differen kinds of search data in the app's
 * local storage
 *
 * @param searchCategory the type of category to search for
 * @returns a string based on what type of search location to save the searched data
 */
export function getLocationKeyForSavingSearchData(
    searchCategory: SearchOptions,
) {
    switch (searchCategory) {
        case 'ARTIST':
            return SEARCHED_ARTIST_OFFLINE_DATA_STORAGE_KEY
        case 'PLAYLIST':
            return SEARCHED_PLAYLIST_OFFLINE_DATA_STORAGE_KEY
        case 'SONG':
            return SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY
        default:
            return ''
    }
}

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

/**
 * this method saves any string data to the to the local storage after getting a valid
 * reference id and a unique local storage id
 *
 * @param storageKey a unique key as the storage key/location
 * @param id the unique id
 * @returns a promise when the item is returned from the storage
 */
export function setItemToLocalStorage(
    storageKey: string,
    id: string,
    data: string,
) {
    return AsyncStorage.setItem(`${storageKey}-${id}`, data)
}

/**
 * this method provides data from the local storage with providing to storage
 * reference string, where the data was saved previously
 *
 * @param storageKey a unique key as the storage key/location
 * @param id the unique id
 * @returns a promise when the item is returned from the storage
 */
export function getItemFromLocalStorage(
    storageKey: string,
    id: string,
): Promise<any> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(`${storageKey}-${id}`)
            .then((res: any) => resolve(res))
            .catch(err => reject(err))
    })
}
