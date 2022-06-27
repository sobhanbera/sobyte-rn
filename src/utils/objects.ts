/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - util functions for objects and all...
 */

import {MAX_DISPLAY_TEXT_LENGTH} from '@/configs'
import {
    ARTWORK_HEIGHT_WIDTH_PART_WITH_SIZE,
    ENCLOSURES_SURROUNDED_TEXT,
} from '@/configs/regex'
import {ArtworkObject, SongArtistObject} from '@/schemas'

/**
 * get a changed quality image of any song object
 * using its existing artwork data
 *
 * @param {ArtworkObject} artwork any artwork object from song object or else
 * @param {number} wantedSize the height and width to update
 * @param {number} wantedQuality optional, the quality of the image
 * @returns a URL with high quality of the image
 */
export function updateArtworkQuality(
    artwork: ArtworkObject,
    wantedSize: number,
    wantedQuality: number = 90,
): string {
    // demo url - https://lh3.googleusercontent.com/WP7l4p-2WhWzLM6lXJ0n2gXLK6u07eCejpybWzb-yhEyt9Y0aOkxMlLhpayO7PdXYOYy2NgkWu9hGBPy=w60-h60-l90-rj
    // here size is 60
    const {height, url} = artwork

    if (artwork.url.match(ARTWORK_HEIGHT_WIDTH_PART_WITH_SIZE)) {
        const qualityPartOfURL = `w${height}-h${height}-s-l90-rj`
        const updatedQuality = `w${wantedSize}-h${wantedSize}-s-l${wantedQuality}-rj`
        return url.replace(qualityPartOfURL, updatedQuality)
    } else {
        const qualityPartOfURL = `w${height}-h${height}-l90-rj`
        const updatedQuality = `w${wantedSize}-h${wantedSize}-l${wantedQuality}-rj`
        return url.replace(qualityPartOfURL, updatedQuality)
    }
}

/**
 * @param {string} text any string
 * @returns returns the same string after capitalizing the first character
 */
export function firstLetterCap(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * @param {string} text the text which is to be tested and if it is larger than the thresold constant we will add dots after that length
 * @param {number} length the max length of the string
 * @returns the result of the above operation
 */
export function trimLargeString(
    text: string,
    length: number = MAX_DISPLAY_TEXT_LENGTH,
): string {
    if (text.length > length) return text.substring(0, length) + '...'
    return firstLetterCap(text)
}

/**
 * get artists formatted string comma (,) seperated
 *
 * @param {Array<SongArtistObject>} artists array of artists with multiple values
 * @returns the string of list of names of artist in the arguments of function
 */
export function formatArtistsListFromArray(
    artists: Array<SongArtistObject>,
): string {
    let str = ''
    for (let i = 0; i < artists.length; ++i) {
        str += firstLetterCap(`${artists[i].name}`)
        if (i < artists.length - 1) str += ', ' // we are not adding comma after the last artist's name
    }
    return str
}

/**
 * capitalize all words of a string
 * @param {string} string the sentence or the statement
 * @returns a string which contains capital letter after each spaces...
 */
export function capitalizeWords(string: string): string {
    /**
     * we are converting the whole string to lowercase because
     * the input string may be like this:
     * Input:- THIS IS A SENTENCE OR STRING
     * Output:- THIS IS A SENTENCE OR STRING
     * But We Want:- This Is A Sentence Or String
     * that's why
     *
     * this is one of the edge case....
     */
    return string
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, function (character) {
            // upper case character after every space
            return character.toUpperCase()
        })
        .replace(/(?:\.)\S/g, function (character) {
            /**
             * uppercase character after every period
             * this will be helpful to show artist name
             * like - a.r. rahman will be A.r. Rahman without this function
             * and with this function it will be A.R. Rahman
             * which is the correct format of the artists to show in the UI
             */
            return character.toUpperCase()
        })
}

/**
 *
 * @param {string} trackTitle the song's title or the artists list in string format
 * @returns a string which does not contain Unnecessary Characters
 */
export function removeUnnecessaryCharacters(trackTitle: string): string {
    return trackTitle // replacing every unnecessary characters
        .replace("'", '') // '
        .replace('"', '') // "
}

/**
 * @param {string} trackTitle the name or the string of the song
 * @returns the capitalized words string
 * but the change is this function replaces text between (), [] and {} to null/empty
 */
export function formatTrackTitle(trackTitle: string): string {
    // we are checking if the trackTitle contain only one word
    // in that case we will return the full uppercase of the word...
    if (trackTitle.split(' ').length - 1 <= 0) {
        return capitalizeWords(
            trackTitle.replace(ENCLOSURES_SURROUNDED_TEXT, ''),
        ).toUpperCase()
    }
    return capitalizeWords(
        removeUnnecessaryCharacters(
            trackTitle.replace(ENCLOSURES_SURROUNDED_TEXT, ''),
        ),
    )
}
