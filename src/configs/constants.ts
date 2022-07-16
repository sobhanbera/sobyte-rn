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
import RNFetchBlob from 'rn-fetch-blob'

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

export const DEFAULT_SMALL_ARTWORK_SIZE = 60 // default small/low quality image width and height in string...
export const DEFAULT_SMALL_ARTWORK_QUALITY = 90 // default small/low quality image quality in string...

export const DEFAULT_MEDIUM_ARTWORK_SIZE = 446 // default medium quality image width and height in string...
export const DEFAULT_MEDIUM_ARTWORK_QUALITY = 90 // default medium quality image quality in string...

export const DEFAULT_LARGE_ARTWORK_SIZE = 594 // default high quality image width and height in string...
export const DEFAULT_LARGE_ARTWORK_QUALITY = 100 // default high quality image quality in string...

export const DEFAULT_EXTRA_LARGE_ARTWORK_SIZE = 720 // default extra high/extreme quality image width and height in string...
export const DEFAULT_EXTRA_LARGE_ARTWORK_QUALITY = 100 // default extra high/extreme quality image quality in string...

// TODO: this value needs to be changed
export const DEFAULT_PLAYER_ARTWORK_SIZE = DEFAULT_SMALL_ARTWORK_SIZE // this could be changed as per need during development
export const DEFAULT_PLAYER_ARTWORK_QUALITY = DEFAULT_SMALL_ARTWORK_QUALITY // this could be changed as per need during development

// below value should not be changed regarding the shades on notification panel
export const DEFAULT_NOTIFICATION_ARTWORK_SIZE = 300 // the size (width/height) of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...
export const DEFAULT_NOTIFICATION_ARTWORK_QUALITY = 100 // the quality of the image which will be shown in the notification of when a track is played short size of image would take less time to load and play the song faster then previously...

// TODO: this value needs to be changed
export const TRACK_SHARE_ARTWORK_SIZE = 120 // the size of the image which will be used during sharing any track
export const TRACK_SHARE_ARTWORK_QUALITY = 100 // the quality of the image which will be used during sharing any track

export const SHARED_IMAGE_LOCATION = RNFetchBlob.fs.dirs.CacheDir // here "/" character is very important or the app will crash
export const ANDROID_FILE_ACCESSOR = 'file://'

export const MUSIC_PLAYER_BLUR = 25 // blur value of music player image background
export const DEFAULT_IMAGE_BLUR = 45 // blurRadius value

// marquee constants
export const MARQUEE_SCROLL_SPEED = 30 // scroll speed of the marquee text
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
export const TRACK_ARTWORK_SCREEN_WIDTH_OCCUPICATION = 0.82 // the artwork will take 82% of the available screen width
export const TRACK_ARTWORK_SCREEN_WIDTH_SMALL_OCCUPICATION = 0.7 // the artwork will take 82% of the available screen width
export const TRACK_ARTWORK_SCREEN_WIDTH_LARGE_OCCUPICATION = 0.9 // the artwork will take 82% of the available screen width
export const TRACK_DATA_OVERFLOW_HEIGHT = 70
export const TRACK_ARTWORK_PARENT_VERTICAL_PADDING = 35
export const TRACK_ARTWORK_WIDTH =
    SCREEN_WIDTH * TRACK_ARTWORK_SCREEN_WIDTH_OCCUPICATION // track artwork width
export const TRACK_ARTWORK_HEIGHT = TRACK_ARTWORK_WIDTH // default track artwork height

export const TRACK_ARTWORK_WIDTH_SMALL =
    SCREEN_WIDTH * TRACK_ARTWORK_SCREEN_WIDTH_SMALL_OCCUPICATION // somewhat small than default track artwork width

export const TRACK_ARTWORK_WIDTH_LARGE =
    SCREEN_WIDTH * TRACK_ARTWORK_SCREEN_WIDTH_LARGE_OCCUPICATION // somewhat larger than default track artwork width

export const TRACK_ARTWORK_SPACING = 10
export const TRACK_ARTWORK_HORIZONAL_SPACING =
    (SCREEN_WIDTH - TRACK_ARTWORK_WIDTH) / 2 // divide by 2, since the padding will be on both sides...
export const NUMBER_OF_VISIBLE_PLAYER_TRACKS = 2
export const MAX_DISPLAY_HEIGHT_OF_TRACK_ARTWORK_WRAPPER =
    TRACK_ARTWORK_PARENT_VERTICAL_PADDING + // since vertical padding would be on both side, top & bottom
    TRACK_ARTWORK_PARENT_VERTICAL_PADDING + // since vertical padding would be on both side, top & bottom
    TRACK_ARTWORK_HEIGHT +
    SCREEN_HEIGHT * 0.02 // 2% of the screen's height available
// TRACK_ARTWORK_SPACING // this is also on both side as above, the difference is, this is just a extra padding
// commented for now since it is covering a huge height // + TRACK_ARTWORK_SPACING // this is also on both side as above, the difference is, this is just a extra padding

export const ARTWORK_WIDTH_IN_QUEUE = 60
export const ARTIST_ARTWORK_WIDTH_SMALL = 50

export const DEFAULT_SONG_LIST_TRACK_ARTWORK_WIDTH = 50 // this is the default width and height of the artwork in song's list
export const DEFAULT_PLAYLIST_LIST_TRACK_ARTWORK_MIN_WIDTH = SCREEN_WIDTH * 0.41 // this is the default width and height of the artwork in playlist's list 41% of the screen's width
export const DEFAULT_ARTIST_LIST_TRACK_ARTWORK_MIN_WIDTH = SCREEN_WIDTH * 0.37 // this is the default width and height of the artwork in artist's list 41% of the screen's width

export const LAST_TRACKS_REMAIN_TO_LOAD_MORE_TRACK = 1

export const NEXT_TITLE_COLOR_ALPHA = 'B0' // the alpha value of text next to title

export const DEFAULT_SLIDER_THUMB_SIZE = 8 // the width and height of the thumb in sliders
export const DEFAULT_SLIDER_TRACK_HEIGHT = 2.6 // the default height of the slider's track

export const TINY_ICON_SIZE = 22 // size of tiny icons
export const DEFAULT_ICON_SIZE = 24 // default icon size
export const SMALL_ICON_SIZE = 28 // somewhat larger than tiny and deafult icon
export const MEDIUM_ICON_SIZE = 32 // icon size for medium icons
export const LARGE_ICON_SIZE = 38 // large icons size
export const EXTRA_LARGE_ICON_SIZE = 45 // extra large icons size
export const PLAY_PAUSE_ICON_SIZE = 80 // icon size for play/pause button

export const DEFAULT_TOUCHABLE_OPACITY_BUTTON_ACTIVE_OPACITY = 0.75 // default active opacity value of the touchable opacity component

/**
 * urls related to the personal uscase of application
 * like apps website, origin
 * share url, etc
 */
export const SOBYTE_URL = 'https://sobyte.sobhanbera.com'
export const MUSIC_SHARE_SUBJECT = 'Listen Music In Sobyte!'

/**
 * music URL related constants
 */
export const TRACK_REQUEST_BASE_URL = 'https://www.youtube.com/'
export const TRACK_REQUEST_MAIN_ROUTE = 'watch?v='

/**
 * constants related to tracks URL quality and more
 */
export const EXTREME_QUALITY_AUDIO_BITRATE = 160 // bitrate we are providing for the very high quality songs
export const HIGH_AUDIO_BITRATE = 128 // bitrate quality we are providing is high quality songs
export const NORMAL_AUDIO_BITRATE = 64 // bitrate quality we are providing is average quality songs
export const LOW_AUDIO_BITRATE = 48 // bitrate quality we are providing is low quality songs

export const EXTREME_QUALITY_AUDIO_MINIMUM_BITRATE = 129 // this is the bitrate just after high quality, so that if sometime 160 is not available we can use this value to get equal to or more
export const HIGH_AUDIO_MINIMUM_BITRATE = 64 // just after normal quality
export const NORMAL_AUDIO_MINIMUM_BITRATE = 49 // just after low quality
export const LOW_AUDIO_MINIMUM_BITRATE = 33 // a minimal thresold for every quality of bitrates we are providing...

export const REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH = 11
export const SOBYTE_MUSIC_ID_MAXIMUM_LENGTH = 11

/**
 * colors related constants
 */
export const DEFUALT_LENGTH_OF_LINEAR_GRADIENT_COLORS = 7
export const COLOR_SMOOTHNING_ALPHAS = [
    '00',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    'A0',
    'B0',
    'C0',
    'D0',
    'E0',
    'F0',
]

export const DEFAULT_TRACK_PLAYER_RATE = 1 // this is the default rate of speed of every track, just nonsense... :)
export const DEFAULT_BORDER_RADIUS = 12 // the default border radius value for any kind of card or so..

/**
 * these are some heights and width of the logo images
 * these all are in the same ratio as of the image's aspect ratio
 */
export const NAMED_LOGO_ACTUAL_WIDTH = 1564 // the actual width of the "named.png" logo image
export const NAMED_LOGO_ACTUAL_HEIGHT = 511 // the actual height of the "named.png" logo image
export const LOGO_ACTUAL_WIDTH = 218 // the actual width of the "sobyte_white.png" logo image
export const LOGO_ACTUAL_HEIGHT = 276 // the actual height of the "sobyte_white.png" logo image

export const DEFAULT_NAMED_LOGO_DIVISION_RATE = 20 // multiplier/divisor of the size of logo. the same multiplier will be multiplied by both height and width of actual logo
export const DEFAULT_LOGO_DIVISION_RATE = 10 // multiplier/divisor of the size of logo. the same multiplier will be multiplied by both height and width of actual logo

export const DEFAULT_NAMED_LOGO_WIDTH =
    NAMED_LOGO_ACTUAL_WIDTH / DEFAULT_NAMED_LOGO_DIVISION_RATE // a small width version of the "named.png" logo image
export const DEFAULT_NAMED_LOGO_HEIGHT =
    NAMED_LOGO_ACTUAL_HEIGHT / DEFAULT_NAMED_LOGO_DIVISION_RATE // a small height version of the "named.png" logo image

export const DEFAULT_LOGO_WIDTH = LOGO_ACTUAL_WIDTH / DEFAULT_LOGO_DIVISION_RATE // a small width version of the "sobyte_white.png" logo image
export const DEFAULT_LOGO_HEIGHT =
    LOGO_ACTUAL_HEIGHT / DEFAULT_LOGO_DIVISION_RATE // a small height version of the "sobyte_white.png" logo image

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

export const FALLBACK_ARTIST_NAME = '✔  Sobyte Special' // I noticed many tracks don't have artist's name on them, I don't have time to patch the musicparser currently. but will try in future, for now we can show a fallback string btw.

export const TRACK_ARTIST_MENU_NAME = 'TRACK_ARTIST_MENU_NAME' // a menu id for the menu of player track's data

export const APP_INFINITE = 100000000 // a random large number which could act as infinite, this constant could be used in place of loop iteration counts, since the number is so huge, till that no user will open the app, I guess so!
export const ANIMATION_ITERATION_DELAY = 1000 // a delay between lottie animation iteration
export const DEFAULT_LOTTIE_LOGO_ANIMATION_HEIGHT = 40

export const DEFAULT_HEADER_HEIGHT = 55 // the default header's height
export const ACTUAL_HEADER_HEIGHT =
    DEVICE_STATUSBAR_HEIGHT + DEFAULT_HEADER_HEIGHT // the height if header including the statusbar's height

export const ANIMATED_HEADER_EXTENDED_HEIGHT = 250 // the extra height to provide after the acutual height for the header of animated type

export const TOTAL_ANIMATED_HEADER_HEIGHT =
    ACTUAL_HEADER_HEIGHT + ANIMATED_HEADER_EXTENDED_HEIGHT // the is the total header height with animation full component

export const DEFAULT_SCALE_VALUE_FOR_TOUCHABLE_SCALABLE = 0.98 // the default value of the scaler touchable to scale when hovered
export const SEARCH_CATEGORY_CARD_HEIGHT = 120
export const SEARCH_HISTORY_COUNT_LIMIT = 7 // maximum number of search history to save in local storage

export const DEFAULT_MAXIMUM_CHARACTERS_IN_TITLE = 35 // the default number of characters a title can have...

export const TRACK_URL_EXPIRATION_PERIOD = 18000 // the time after which every track url will get expire, NOTE: in seconds
export const TRACK_URL_MINIMUM_LENGTH = 700 // every track's url is more than 1000 characters, but for now to be in the safe side let take this as the minimum length of the track's url

export const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:MM:ss A' // the default string format for datetime

export const ARTIST_ARTWORK_COLOR_UNIQUE_KEY = 'ARTIST_ARTWORK_COLOR_UNIQUE_KEY' // the unique key of caching images color using react-native-image-colors
