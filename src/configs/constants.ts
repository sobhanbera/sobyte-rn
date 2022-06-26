/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - any type of constants...
 */

// user agent while making api request
export const MUSIC_API_USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'
// allowed languages during making api request...
export const MUSIC_API_ACCEPTED_LANGUAGE = 'en-IN,en-US,HI,BN,en;q=0.5'
// type of music api request
export const MUSIC_API_NEXT = 'next'
// currently it is public but plan is to make it private as env var
export const MUSIC_API_KEY = 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30'
// value type returned by music api
export const MUSIC_API_ALT = 'json'

/**
 * constants required by util method of music api
 * or may be by parser sometimes...
 */
export const LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED =
    'LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED'
export const MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE =
    'MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE'
export const MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE =
    'MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE'
export const PWA_INSTALLABILITY_STATUS_UNKNOWN =
    'PWA_INSTALLABILITY_STATUS_UNKNOWN'
