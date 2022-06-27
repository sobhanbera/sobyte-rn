/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - any type of constants...
 */

import {NativeModules, Dimensions} from 'react-native'

/** App details */
export const APP_NAME = 'Sobyte'
export const APP_TAG_LINE = ''

// dimension instance for the device
export const WINDOW_DIMENSION = Dimensions.get('window')
export const SCREEN_DIMENSION = Dimensions.get('screen')
// the window's dimenstions and diff parts
export const WINDOW_WIDTH = WINDOW_DIMENSION.width // window's width
export const WINDOW_HEIGHT = WINDOW_DIMENSION.height // window's height
export const WINDOW_SCALE = WINDOW_DIMENSION.scale // window's scale
export const WINDOW_FONT_SCALE = WINDOW_DIMENSION.fontScale // window's font scale
// the screen's dimenstions and diff parts
export const SCREEN_WIDTH = SCREEN_DIMENSION.width // screen's width
export const SCREEN_HEIGHT = SCREEN_DIMENSION.height // screen's height
export const SCREEN_SCALE = SCREEN_DIMENSION.scale // screen's scale
export const SCREEN_FONT_SCALE = SCREEN_DIMENSION.fontScale // screen's font scale

const {StatusBarManager} = NativeModules
export const DEVICE_STATUSBAR_HEIGHT = StatusBarManager.HEIGHT

export const MAX_DISPLAY_TEXT_LENGTH = 30 // length of the text after which "..." will be shown

// IMAGE CONSTANTS ABOUT QUALITIES.
export const DEFAULT_ARTWORK_SIZE = 200 // default image width and height in string...
export const DEFAULT_ARTWORK_QUALITY = 90 // default image quality in string...

export const DEFAULT_LARGE_ARTWORK_SIZE = 576 // default high quality image width and height in string...
export const DEFAULT_LARGE_ARTWORK_QUALITY = 100 // default high quality image quality in string...

export const DEFAULT_EXTRA_LARGE_ARTWORK_SIZE = 720 // default high quality image width and height in string...
export const DEFAULT_EXTRA_LARGE_ARTWORK_QUALITY = 100 // default high quality image quality in string...

export const DEFAULT_PLAYER_ARTWORK_SIZE = 400 // default size image for the music player UI in string...
export const DEFAULT_PLAYER_ARTWORK_QUALITY = 100 // default quality image quality for music player UI string...

// below value should not be changed regarding the shades on notification panel
export const DEFAULT_NOTIFICATION_ARTWORK_SIZE = 250 // the size (width/height) of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...
export const DEFAULT_NOTIFICATION_ARTWORK_QUALITY = 90 // the quality of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...

export const MUSIC_PLAYER_BLUR = 25 // blur value of music player image background

// marquee constants
export const MARQUEE_SCROLL_SPEED = 25 // scroll speed of the marquee text
export const MARQUEE_REPEAT_SPACER = 100 // the distance between text of every repetation of marquee text
export const MARQUEE_DELAY = 1000 // value of delay for each marquee animation
export const MARQUEE_BOUNCE_DELAY = 0 // the delay between bounces for the same marquee

// fonts name as per there files
export const CircularBlack = 'Circular-Black'
export const CircularBold = 'Circular-Bold'
export const CircularMedium = 'Circular-Medium'
export const CircularRegular = 'Circular-Regular'
export const CircularLight = 'Circular-Light'

/**
 * music player interface constants and vars...
 */
export const TRACK_DATA_OVERFLOW_HEIGHT = 70
export const TRACK_ARTWORK_SPACING = 10
export const TRACK_ARTWORK_WIDTH = SCREEN_WIDTH * 0.82
export const TRACK_ARTWORK_HEIGHT = TRACK_ARTWORK_WIDTH
export const NUMBER_OF_VISIBLE_PLAYER_TRACKS = 2

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
