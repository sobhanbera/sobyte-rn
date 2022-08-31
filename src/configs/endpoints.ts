/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - constants for endpoints and links...
 */

// the music api where we are getting all the data
export const PRIMARY_MUSIC_API = 'https://music.youtube.com/'

// the primary music endpoints we are supporting
export const PRIMARY_MUSIC_API_ENDPOINTS = {
    next: 'next',
    search: 'search',
    browse: 'browse',
    player: 'player',
    get_search_suggestions: 'music/get_search_suggestions',
}

// the image of the logo along with name of app
export const APP_LOGO_WITH_NAME_IMG_LINK =
    'https://raw.githubusercontent.com/sobhanbera/sobyte/main/.github_src/named_logo.png?token=GHSAT0AAAAAABQFG2BGPQJ52HNZZLJ44FAKYWS34QA'

// this is a random route URL which doesn't exists currently
export const NOTHING_URL = 'https://sobhanbera.com/sobyte/image'

/**
 * this is the URL from where the explore screen's data will be fetched
 * this URL links to a GitHub JSON file...
 */
export const EXPLORE_SCREEN_DATA_GITHUB_FILE_URL =
    'https://raw.githubusercontent.com/sobhanbera/src/main/sobyte/mobile/explorescreendata.json?token=GHSAT0AAAAAABQFG2BGEHKLPJW5FNCJ3INOYXBLVPA'
