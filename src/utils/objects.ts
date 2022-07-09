/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - util functions for objects and all...
 */

import {Animated, StyleProp, ViewStyle} from 'react-native'

import {
    DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
    DEFAULT_NOTIFICATION_ARTWORK_SIZE,
    DEFAULT_PLAYER_ARTWORK_QUALITY,
    DEFAULT_PLAYER_ARTWORK_SIZE,
    FALLBACK_ARTIST_NAME,
    GLOBAL_QUERIES,
    MAX_DISPLAY_TEXT_LENGTH,
    SHARED_IMAGE_LOCATION,
    SOBYTE_URL,
} from '@/configs'
import {
    ARTWORK_HEIGHT_WIDTH_PART_WITH_SIZE,
    BRACES_SURROUNDED_TEXT,
    BRACKETS_SURROUNDED_TEXT,
    PARATHESIS_SURROUNDED_TEXT,
} from '@/configs/regex'
import {
    ArtworkObject,
    SongArtistObject,
    SongObject,
    TrackMetadataBase,
} from '@/schemas'

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
    wantedSize: number = DEFAULT_PLAYER_ARTWORK_SIZE,
    wantedQuality: number = DEFAULT_PLAYER_ARTWORK_QUALITY,
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
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
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
        str += capitalizeWords(`${artists[i].name}`)
        if (i < artists.length - 1) str += ', ' // we are not adding comma after the last artist's name
    }

    return str || FALLBACK_ARTIST_NAME
}

/**
 * get the first artist from the artist's object as string
 * @param artists the artist object
 * @returns the first artist from the artist object
 */
export function getFirstArtistFromTrackData(
    artists: Array<SongArtistObject>,
): string {
    // since some tracks don't have artist's name on them
    if (artists.length >= 1) return artists[0].name
    return ''
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
        .replace(/(?:\-)\S/g, function (character) {
            /**
             * uppercase character after every hyphen
             * this will be helpful to show artist name
             * like - tu jo mila-raabta will be Tu Jo Mila-Raabta without this function
             * and with this function it will be Tu Jo Mila-Raabta
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
    // if (trackTitle.split(' ').length - 1 <= 0) {
    //     return capitalizeWords(
    //         trackTitle.replace(ENCLOSURES_SURROUNDED_TEXT, ''),
    //     ).toUpperCase()
    // }
    return capitalizeWords(
        removeUnnecessaryCharacters(
            trackTitle
                .replace(BRACES_SURROUNDED_TEXT, '')
                .replace(BRACKETS_SURROUNDED_TEXT, '')
                .replace(PARATHESIS_SURROUNDED_TEXT, ''),
        ),
    )
}

/**
 * this method will return a min:second formatted string when the number of second is passed through its parameter
 *
 * @param seconds number which shows number of seconds
 * @returns a string in min:second format
 */
export function secondsToHms(seconds: number) {
    // I hope any song will not proccedd over 1 hours so for now the use of hours is deprecated
    // var hrs = ('0' + hr).slice(-2)

    var min = Math.floor((seconds % 3600) / 60) // now getting the number of minutes left after getting hours
    var sec = Math.floor((seconds % 3600) % 60) // finally getting few seconds left from the seconds {number}

    // not to min
    var secs = ('0' + sec).slice(-2)

    return `${min}:${secs}`
}

/**
 * this method is specifically designed to update the state of the currently playing track and also to
 * the play() method of the track player
 *
 * since when this data is passed in the parameter of play() method of track player, it takes sometime to load the track URL and play it
 * and we can make the user to wait for the track to load but not wait for the track data to display
 * we must immediately display the track's data as soon as it got changed
 * so to display the data pre loading the track
 * this method could be useful, since this method returns a empty string for the URL.
 *
 * NOTE: there must be provided with a URL with the data is used to play a track, else the track is not gonna play in entire life
 *
 * @param trackData songobject the track data
 * @param extraDescription any description about the track
 * @param URL URL of the sogn
 * @returns a object which can be provided to track player's play() method to play tracks
 */
export function getTrackToPlay(
    trackData: SongObject,
    extraDescription: string = '',
    URL: string = '',
): TrackMetadataBase & SongObject {
    const notificationArtwork = updateArtworkQuality(
        trackData.artworks[0],
        DEFAULT_NOTIFICATION_ARTWORK_SIZE,
        DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
    )
    const formattedArtist = formatArtistsListFromArray(trackData.artists)

    return {
        musicId: trackData.musicId, // just in case
        playlistId: trackData.playlistId, // just in case

        artists: trackData.artists,
        artworks: trackData.artworks,
        album: trackData.album,
        params: trackData.params,
        type: trackData.type,

        url: URL,
        title: trackData.title,
        artist: formattedArtist,
        artwork: notificationArtwork,
        duration: trackData.duration,
        description: extraDescription,
        genre: '',

        contentType: trackData.type,
    }
}

/**
 * the main task this method does is converting the actual music ID to a different music ID so that a uniquness could be maintained in the ID string
 *
 * now I have designed this algorithm in such a way that this function itself will do both encryption and decryption together with the same code
 * doesn't matter what step is followed at what position
 * irrespective of steps this method will work absolutely fine!!
 *
 *
 * @Algorithm
 *
 * at initial call the method checks if the provided ID is of any length if it is then only it procceds to the next algorithm
 * next this method changes all the lowecase characters to uppercase and uppercase characters to lowecase and saves it in a different variable let's say @var1
 * next up it reverses @var1 and stores it in @var2
 *
 * another task is to change all the characters in the ID
 * so let's create a @var3 to store this string
 * so for that this program generates a random number between 1 and 12 inclusively, you will get to know why only 1 and 9 ( let's store this in a variable named @randomNumber )
 * next up, a itteration start over all the characters of @var2 (the reversed string id)
 *
 * 1. and checks if the character is lowercased then checks if the character is less than 'm' (since 'm' is in the middle of alphabets, so I choosed 13th character to split the operations)
 *      ok now if the lowercase character is less than 'm' then append @var3 after adding @randomNumber to that lowecase character's ascii value and back to character
 *      else if the lowecase character is more than 'm' then append @var3 after subtracting @randomNumber from that lowecase character's ascii value and back to character
 *
 * 2. and checks if the character is uppercased then checks if the character is less than 'm' (since 'm' is in the middle of alphabets, so I choosed 13th character to split the operations)
 *      ok now if the uppercase character is less than 'm' then append @var3 after adding @randomNumber to that uppercase character's ascii value and back to character
 *      else if the uppercase character is more than 'm' then append @var3 after subtracting @randomNumber from that uppercase character's ascii value and back to character
 *
 * the 1st and 2nd task is almost same, the difference is 1st task is for lowercase and 2nd is for uppercase characters
 *
 * 3. if the character is a number than append the @var3 string after subtracting the numbered character from 9
 *      or in other word this -> @var3 += 9 - @var2 [ith character]
 *
 * 4. now if the character is - than replace it with _ and vice versa, - to _ and _ to -
 *
 * this itteration if over
 *
 * and final step is to add the random number to the front of the string, so that at the time of reversing these all (decrypting)
 * we can know what random number we have choosed during encryption
 *
 * and return the final string
 *
 *
 * so now you got to know why we choose a random number betwen 1 and 9, its because if we choose less than 1, let say 0 then after adding/subtracting the character will not change
 *      and also we haven't choosed a number more than 9 (we could choosed more than 9 since we have also choosed 'm' the 13th character, so the limit is 12)
 *      because if we choose a upper range more than 9 then two major things will got affected:
 * 1. first the final string could go length of 13 if we choose @randomNumber as (10, 11, 12 or 13) which we don't want
 * 2. at time of decryption, we cannot decide if the first or both first and second character of the
 *      encrypted string ID is the @randomNumber we generated during encryption.
 *      the second character of encrypted string could be the part of actual ID.
 *      so it will generate ambiguity, for that purpose, we have to choose a random number only between 1 and 9 (yeah inclusive is fine)
 *
 * but at last we decided to choose the random number as static number which would be 13
 * this is because let's say for adding - when we add 9 to 11(k) it becomes more than 13(m) and could be subtracted during decryption easily
 *                                      but when adding 9 to 1(a) if produces 10(j) which is still less than 13 and during decryption we still cannot decided whether this was more than 13 or less than 13 before encryption
 * so finally I have personally decided to make the random number stuck to a static number as 13
 *
 * @param {string} ID any length characters long string denoting a musicID
 * @returns a same length string after encrypting it in other format than the antual ID
 */
export function endcrypt(ID: string): string {
    /**
     * change the casing of every alphabet characters
     * lowecase to upper case and uppercase to lowecase character
     */
    let caseExchange: string = '' // case toggled string ID
    for (let i: number = 0; i < ID.length; ++i)
        if (ID[i] >= 'a' && ID[i] <= 'z') caseExchange += ID[i].toUpperCase()
        else if (ID[i] >= 'A' && ID[i] <= 'Z')
            caseExchange += ID[i].toLowerCase()
        else caseExchange += ID[i]

    /**
     * reversing the whole string
     * since we don't have a reverse method for string itself
     * so first converting the sting to array of characters and reversing it (since array has such methods)
     * and finally converting all the elements to string
     * by join method of string array
     */
    let reversedID: string = caseExchange.split('').reverse().join('')

    /**
     * a random number
     * this is very important for the encryption process,
     * 72% of the decryption process needs acces to this @randomNumber
     */
    const randomNumber: number = 13 // Math.floor(Math.random() * (9 - 1 + 1)) + 1
    let encryptedID: string = '' // a variable to store the encrypted string ID
    for (let i: number = 0; i < reversedID.length; ++i)
        /**
         * if the ith character is lowercase character
         */
        if (reversedID[i] >= 'a' && reversedID[i] <= 'z')
            if (reversedID[i] <= 'm')
                /**
                 * if the ith character is less than 'm'
                 * add the random number to the ith character and append to @encryptedID
                 */
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) + randomNumber,
                )
            /**
             * if the ith character is more than 'm'
             * subtract the random number with the ith character and append to @encryptedID
             */ else
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) - randomNumber,
                )
        /**
         * if the ith character is uppercase character
         */ else if (reversedID[i] >= 'A' && reversedID[i] <= 'Z')
            if (reversedID[i] <= 'M')
                /**
                 * if the ith character is less than 'M'
                 * add the random number to the ith character and append to @encryptedID
                 */
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) + randomNumber,
                )
            /**
             * if the ith character is more than 'M'
             * subtract the random number with the ith character and append to @encryptedID
             */ else
                encryptedID += String.fromCharCode(
                    reversedID[i].charCodeAt(0) - randomNumber,
                )
        /**
         * if the character if a number
         * append @encryptedID after subtracting the number from 9 in string format afterwards
         */ else if (reversedID[i] >= '0' && reversedID[i] <= '9')
            encryptedID += String(Number(9 - Number(reversedID[i])))
        /**
         * if the character is - than change it to _ and append to @encryptedID
         */ else if (reversedID[i] === '-') encryptedID += '_'
        /**
         * if the character is _ than change it to - and append to @encryptedID
         */ else if (reversedID[i] === '_') encryptedID += '-'

    /**
     * finally add the randomNumber at the front of the final string
     * so that it could be accessed at the time of decryption of the ID
     */
    const finalEncryptedID: string = encryptedID // + randomNumber
    // and at last return the whole string
    return finalEncryptedID
    // finally after such a time of thinking this simple encrytion is implemented
}

/**
 * get a share url from music id and playlistId
 * @param musicID a string denoting music id
 * @param playlistID string of playlist id
 * @returns a full url containing encrypted ids which could be shared
 */
export function generateShareableURL(musicID: string, playlistID: string) {
    // checking if the music Id and playlist ID both are provided or not
    if (!musicID || !playlistID) return ''

    const encryptedMusicID = endcrypt(musicID)
    const encryptedPlaylistID = endcrypt(playlistID)

    /**
     * now also checking if the encrypted music id and playlist id are valid
     * since the musicID and playlistID from parameter could be of length less than 11
     */
    if (encryptedMusicID && encryptedPlaylistID)
        return `${SOBYTE_URL}/music?mi=${encryptedMusicID}&pi=${encryptedPlaylistID}`

    return ''
}

/**
 * get the full string message which is to be send to anybody
 * this message will be in format below -
 * `{title}{artist} {some data about app here} {url}`
 * @param trackData data of the track
 * @returns a message to share
 */
export function generateShareableMusicMessage(trackData: SongObject): string {
    // check if the url can be generated
    if (!trackData.musicId || !trackData.playlistId) return ''

    // getting the track title in good format which can be shared
    const trackTitle = formatTrackTitle(trackData.title)
    // getting the first artist of the track
    const trackArtist = getFirstArtistFromTrackData(trackData.artists)

    // shareable url generation
    const shareableURL = generateShareableURL(
        trackData.musicId,
        trackData.playlistId,
    )

    return `Listen to ${trackTitle}${
        trackArtist ? ` by ${trackArtist} ` : ' '
    }on Sobyte - \n${shareableURL}`
}

/**
 * this function returns the path where an image could be saved before sharing it
 * @param musicID music id of the track
 * @returns a path where the shareable image could be saved temprarily
 */
export function getShareableImagePath(musicID: string) {
    if (musicID)
        return `${SHARED_IMAGE_LOCATION}/sobyte_${endcrypt(musicID)}.jpg`

    // if the music id is not provided, just save it in a safe location
    return `${SHARED_IMAGE_LOCATION}/sobyte_share.jpg`
}

/**
 * this function is yet to be implemented, I am working on the language feature for the app,
 * then only this funcction will be fully completed
 *
 * currently this method only provides a random query from GLOBAL_QUERIES array
 *
 * @returns {string} a query to search
 */
export function getARandomQuery() {
    return 't-series mixtape'
    return GLOBAL_QUERIES[Math.floor(Math.random() * GLOBAL_QUERIES.length)]
}

/**
 *
 * @returns the default style for bottom tab bar
 */
export function getDefaultTabBarStyles(): Animated.WithAnimatedValue<
    StyleProp<ViewStyle>
> {
    return {
        height: 58,
        position: 'absolute',
        elevation: 0, // the default elevation is 8, that's why the whole bottom tab bar is somewhat elevated
        backgroundColor: 'transparent', // no colors for the background
        borderTopWidth: 0, // this is rendering a default border on top, so removing it
    }
}

/**
 * this method provides the style for bottom tab bar depending on the background color and more
 * this could be used to display diff background color on diff screens and more...
 *
 * @param backgroundColor any optional color for the background color of the tab bar
 * @returns a style for the bottom tab bar
 */
export function getCustomTabBarStyles(
    backgroundColor: string = 'transparent',
): Animated.WithAnimatedValue<StyleProp<ViewStyle>> {
    return {
        height: 58,
        position: 'absolute',
        elevation: 0, // the default elevation is 8, that's why the whole bottom tab bar is somewhat elevated
        backgroundColor: backgroundColor || 'transparent', // no colors for the background
        borderTopWidth: 0, // this is rendering a default border on top, so removing it
    }
}
