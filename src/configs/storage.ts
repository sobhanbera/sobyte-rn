/**
 * © 2021 Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - storage related constants like storage keys, values, codes, etc
 */

export const LANGUAGE_CODE_STORAGE_KEY = '@APP:LANGUAGE_CODE' // Storage key where the app language variable exists, for internationlization purpose
export const API_CONFIG_DATA_STORAGE_KEY = '@APP:API_CONFIG_DATA' // Storage key for header fetched by the api everytime...
export const MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY =
    '@APP:MUSIC_PLAYER_SONGS_RESULT_STORAGE_KEY' // the storage key where the user data like email, username, etc will be stored in android itself...
/**
 * like the searched query is New Bollywood songs and the category is PLAYLIST (may be)
 * then the results of it would be saved in here
 * "@APP:SEARCHED_SONG_OFFLINE_DATA:New Bollywood songs:PLAYLIST"
 * at this local storage key refrence...
 *
 * we can then get this value when there is no internet connection available OR
 * when any error occurred while searching results...
 */
export const SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY =
    '@APP:SEARCHED_SONG_OFFLINE_DATA:' // the storage key where the fallbacks searched songs results will be stored this method is available in main music api under api/index.tsx in search method