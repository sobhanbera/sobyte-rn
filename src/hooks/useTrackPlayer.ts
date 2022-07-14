/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - useTrackPlayer hook to provide all the theme data
 */

import TrackPlayer from 'react-native-track-player'
import getTrackURLModule from '@sobhanbera/react-native-sobyte-ytdl'
import {useDispatch, useSelector} from 'react-redux'

import {
    addTrackURL,
    // resetPlayerData,
    SobyteState,
    updateCurrentTrack,
    updateCurrentTrackIndex,
    updateTracksData,
} from '@/state'
import {
    MusicDataFetchOptions,
    MusicFormats,
    SongObject,
    TrackDescription,
    TrackMetadataBase,
    TrackURLDataModal,
    TrackURLLocalStorageData,
} from '@/schemas'
import {
    DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
    DEFAULT_NOTIFICATION_ARTWORK_SIZE,
    // EXTREME_QUALITY_AUDIO_MINIMUM_BITRATE,
    LOW_AUDIO_MINIMUM_BITRATE,
    REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH,
    TRACK_URL_EXPIRATION_PERIOD,
    TRACK_URL_MINIMUM_LENGTH,
    TRACK_URL_STORAGE_KEY,
} from '@/configs'
import {
    formatArtistsListFromArray,
    formatTrackTitle,
    getItemFromLocalStorage,
    getTrackToPlay,
    setItemToLocalStorage,
    updateArtworkQuality,
} from '@/utils'
import dayjs from 'dayjs'

/**
 *
 */
export function useTrackPlayer() {
    // Get current theme from the store
    const {currentTrack} = useSelector((state: SobyteState) => state.playerdata)
    const {trackURLs} = useSelector((state: SobyteState) => state.trackurldata)
    const dispatch = useDispatch()

    /**
     * get the tracks origin URL using this function
     *
     * @param musicID the music ID
     * @param options other specific details that need to be checked before providing the actual final data
     * providing options in optional and also not recommended, please use it wisely
     * @returns tracks data with URL...
     */
    async function getTrackURLFromOrigin(
        musicID: string,
        options: MusicDataFetchOptions = {},
    ): Promise<TrackURLDataModal> {
        return new Promise(async (resolve, _reject) => {
            /**
             * the actual option the outer code may provide some arttributes
             * we are setting some default attribute and then we are ovveriding some of them which are provided through
             * the argument of this function
             */
            const finalOptions: MusicDataFetchOptions = {
                audioQuality: 'auto',
                ...options,
                // below two fields should be exactly same and should not be overloaded
                hasAudio: true,
                hasVideo: false,
            }

            /**
             * this is a huge data and contains many formats of the same track data
             * we are filtering some of them is the basis of the options provided
             * and default settings...
             */
            const trackResultData: MusicFormats = await getTrackURLModule(
                musicID,
                finalOptions,
            )

            /**
             * extracting different format's object from whole trackResults data...
             * and filtering them to get only the audio files URL,
             * there are three audio files data formats
             * 1. bitrate - 160, format - audio/webm
             * 2. bitrate - 128, format - audio/mp4
             * 3. bitrate - 64, format - audio/webm
             * 4. bitrate - 48, format - audio/webm
             * here the 2nd format is the average quality format with mp4 audio
             *
             * so just filtering those formats which includes the audio string on them
             *
             */
            const {formats} = trackResultData
            const audios = formats.filter(format => {
                return format.mimeType.includes('audio')
            })

            audios.forEach(audio => {
                // the url of currently itteration audio
                const url = audio.url

                /**
                 * returning the actual data which is needed by the audio player
                 * but this data is total based on the bitrate quality the use set in settings
                 */
                if (audio.bitrate >= LOW_AUDIO_MINIMUM_BITRATE) {
                    dispatch(
                        addTrackURL({
                            musicId: musicID,
                            url: url,
                        }),
                    ) // saving to reducer's store

                    resolve({
                        url: url,
                    })

                    /**
                     * now setting the data to the local storage also
                     * here the key should be the same as the below one where we are getting the data from
                     * the local storage
                     */
                    const expirationTimestamp = dayjs().add(
                        TRACK_URL_EXPIRATION_PERIOD,
                        'second',
                    )

                    // this time is after adding number of expiration period's seconds to current time, which is the expiration time
                    setItemToLocalStorage(
                        TRACK_URL_STORAGE_KEY,
                        musicID,
                        // in string format
                        JSON.stringify({
                            musicId: musicID,
                            url: url,
                            expire: expirationTimestamp,
                        }),
                    )
                }
            })
        })
    }

    /**
     * get the tracks origin URL using this function
     * but at first this function checks if the track's url is saved in the reducer's store
     * and then check if the data is saved in the async local storage and is not expired
     * then provide the data from there, (in this way the data of the user will not be used again & again)
     *
     * if the data is not found then only we will load the data from the actual origin API...
     *
     * @param musicID the music ID
     * @param options other specific details that need to be checked before providing the actual final data
     * providing options in optional and also not recommended, please use it wisely
     * @returns tracks data with URL...
     */
    async function getTrackURL(
        musicID: string,
        options: MusicDataFetchOptions = {},
    ): Promise<TrackURLDataModal> {
        return new Promise(async (resolve, _reject) => {
            // setItemToLocalStorage(TRACK_URL_STORAGE_KEY, musicID, '')

            /**
             * if the URL is already fetched once than return it
             *
             * TODO: we need to update this feature... because
             * let's say the person has pinned our App to there recent and now,
             * the app could be opened for more than 6 hours
             * but our URLs are only valid for upto 6 hours
             *
             * so to resolve this we can have a time field along with the URL in trackURLs reducer
             * so that we can check if the URL was generated under 3 hours (our thresold) and then procced to use it...
             */
            if (musicID in trackURLs) {
                return resolve({
                    url: trackURLs[musicID],
                })
            }

            /**
             * if the track is not in the reducer's store then check if the url is saved in the asyncronous local storage
             * ok see, we are saving every track's URL in the local storage with a timestamp of when it will get expire
             *
             */
            getItemFromLocalStorage(TRACK_URL_STORAGE_KEY, musicID)
                .then((data: string) => {
                    const URLData: TrackURLLocalStorageData = JSON.parse(data)

                    if (
                        URLData &&
                        data &&
                        URLData?.expire.length > 0 && // and if the expiration time is present in the data object
                        URLData?.url?.length > TRACK_URL_MINIMUM_LENGTH // if the url is valid to some point
                    ) {
                        const currentTime = dayjs() // the current time
                        const expirationTime = dayjs(URLData.expire) // the time expiration, if it is expired then currentTime should be greater than this

                        /**
                         * checking if the timestamp when the data was saved is more than @constant @TRACK_URL_EXPIRATION_PERIOD units of time
                         * then loads the data from the original origin and provide the url
                         */
                        if (
                            expirationTime.diff(currentTime, 'seconds') <= 0 // the different is negative, means the url time is more than @TRACK_URL_EXPIRATION_PERIOD value
                        ) {
                            // the link is expired provide a new one in this case...
                            getTrackURLFromOrigin(musicID, options).then(
                                urlDataFromOrigin => {
                                    resolve(urlDataFromOrigin)
                                },
                            )
                        } else {
                            // if the data is found provide it
                            resolve({
                                url: URLData.url,
                            })

                            dispatch(
                                addTrackURL({
                                    musicId: musicID,
                                    url: URLData.url,
                                }),
                            ) // and also saving to reducer's store
                        }
                    } else {
                        // the data is not been loaded yet
                        getTrackURLFromOrigin(musicID, options).then(
                            urlDataFromOrigin => {
                                resolve(urlDataFromOrigin)
                            },
                        )
                    }
                })
                .catch(_ERR => {
                    // any error in getting the data from the local storage
                    // get load the track's url from the origin only, the actual API work now...
                    getTrackURLFromOrigin(musicID, options).then(
                        urlDataFromOrigin => {
                            resolve(urlDataFromOrigin)
                        },
                    )
                })
        })
    }

    /**
     * this function reset the track player by clearing the queue...
     */
    const resetPlayer = async () => {
        TrackPlayer.reset()
            .then(_res => {
                // dispatch(resetPlayerData()) // there is empty currentTrack data everytime, so commented
            })
            .catch(_ERR => {})
    }

    /**
     * this method does a very important task
     * this method is responsible to play every song only using the song's data
     *
     * @param trackData the full song object data of the track (optional) since this function is also used to just play the song if track is paused
     * @param extraDescription the screen data from where the track is being played
     * @param addAndPlayTrack if the track should be played just after adding it to the queue
     * @returns a promise when the track is loaded/played
     */
    const playTrack = (
        trackData?: SongObject,
        extraDescription: TrackDescription = {
            context: 'player',
            query: '',
        },
        addAndPlayTrack: boolean = true,
    ): Promise<boolean> => {
        return new Promise((resolve, _reject) => {
            const start = new Date().getTime() // JUST_FOR_DEV

            /**
             * now see since the trackData is optional so
             *
             * checking if the trackData is passed from in the argument
             * if it is provided
             *      then check if it is already loaded and is the current one only. in this case play the track
             *      else if the track is different then fetch the Remote origin URL for the track and play the track
             * else if the track is not provided
             *      then once check if the current song could be played
             *          if so, then play it
             *      else
             *          return from the method
             */
            if (!trackData) {
                // if the track data is not provided
                if (
                    currentTrack &&
                    currentTrack.musicId.length >=
                        REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH
                )
                    /**
                     * if the current track is available, play it
                     * this is the case when the user only wants to toggle pause state for the track
                     */
                    TrackPlayer.play()
                return
            } else if (trackData.musicId === currentTrack.music) {
                // the track is provided but it is same as the current track
                TrackPlayer.play()
                return
            }

            /**
             * stopping the previous current track so that there is no
             * gaps between playing songs
             *
             * if we don't pause at this time then, after going to
             * next song the player will play the previous song for few second till the current song's URL is not loaded
             */
            TrackPlayer.pause()
            resetPlayer()

            /**
             * if the song is being played not from music player
             * then immediately update the tracks list in the reducer
             * so that it is shown immediately aftre pressing
             * even if the song is not being loaded yet
             *
             * this will give a sense of non-laging experience
             */
            if (extraDescription.context !== 'player') {
                // now update the new song data from the outside we got
                dispatch(
                    updateTracksData({
                        tracks: [
                            getTrackToPlay(trackData, {
                                ...extraDescription,
                                trackData: trackData,
                            }),
                        ],
                        continuationData: {
                            clickTrackingParams: '',
                            continuation: '',
                        },
                    }),
                )
                dispatch(updateCurrentTrackIndex({index: 0}))
            }

            /**
             * whenever the currentTrack changes
             * this dispatch is becuase I want till the track's URL is being loaded we can even show the
             * track's duration, which is only shown after the track has been loaded
             * now even if the track is not loaded but loading, we will show the duration of the track
             *
             * for that this dispatch is neccessary
             *
             * or else it will display 0:00 in the duration text
             */
            dispatch(
                updateCurrentTrack({
                    currentTrack: getTrackToPlay(trackData, {
                        ...extraDescription,
                        trackData: trackData,
                    }),
                }),
            )

            getTrackURL(trackData.musicId)
                .then(TrackURLData => {
                    const notificationArtwork = updateArtworkQuality(
                        trackData.artworks[0],
                        DEFAULT_NOTIFICATION_ARTWORK_SIZE,
                        DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
                    )
                    const formattedTrackTitle = formatTrackTitle(
                        trackData.title,
                    )
                    const formattedArtist = formatArtistsListFromArray(
                        trackData.artists,
                    )
                    /**
                     * this data will be required in future when any song will be
                     * played outside of the music player
                     */
                    const track: TrackMetadataBase & SongObject = {
                        // ...trackData, not working with spread operation

                        // musicId: trackData.musicId, // just in case
                        // playlistId: trackData.playlistId, // just in case
                        //
                        // artists: trackData.artists,
                        // artworks: trackData.artworks,
                        // album: trackData.album,
                        // params: trackData.params,
                        // type: trackData.type,

                        // url: TrackURLData.url,
                        // title: trackData.title,
                        // artist: formattedArtist,
                        // artwork: notificationArtwork,
                        // duration: trackData.duration,
                        // description: extraDescription,
                        // genre: '',
                        //
                        // contentType: trackData.type,

                        ...getTrackToPlay(
                            trackData,
                            {
                                ...extraDescription,
                                trackData: trackData,
                            }, // we need this in string format, and the function will do this itself
                            TrackURLData.url,
                        ), // optional but why not, we can use the above object also to create this track data
                    }

                    /**
                     * adding required data to the queue of track player
                     */
                    TrackPlayer.add({
                        url: TrackURLData.url,
                        title: formattedTrackTitle,
                        artist: formattedArtist,
                        artwork: notificationArtwork,
                        duration: trackData.duration,
                        description: JSON.stringify({
                            ...extraDescription, // and this must be spread operator, else the descriptions will not be scatered in this object
                            trackData: trackData, // this data contains music id which is important or else the filter process after searching could not be done, when the track is played from another screen and a query is being searched for
                        }), // we need this in string format
                        genre: '',

                        contentType: trackData.type,
                    })

                    /**
                     * after adding the track to queue and before playing it
                     * just make sure that the currentTrack data is updated in the redux store
                     * properly, or else it will cause difficulties in many places
                     */
                    dispatch(
                        updateCurrentTrack({
                            currentTrack: track,
                        }),
                    )

                    if (extraDescription.context !== 'player') {
                        // now update the new song data from the outside we got
                        dispatch(
                            updateTracksData({
                                tracks: [trackData],
                                continuationData: {
                                    clickTrackingParams: '',
                                    continuation: '',
                                },
                            }),
                        )
                        dispatch(updateCurrentTrackIndex({index: 0}))
                    }

                    // and now play the song/track
                    if (addAndPlayTrack)
                        TrackPlayer.play()
                            .then(_RES => {
                                console.log(
                                    'Played',
                                    trackData.title,
                                    'in',
                                    new Date().getTime() - start,
                                    'milliseconds.',
                                ) // JUST_FOR_DEV
                            })
                            .catch(err => {
                                console.log(
                                    'Cannot play the song right now!',
                                    err,
                                )
                            })

                    /**
                     * resolving a true value so that the caller function could procced furthur
                     * this data is neccessary to load the next songs URL (if any) only after loading this ones
                     */
                    resolve(true)
                })
                .catch(() => {
                    resolve(false) // always sending resolve not reject so that it can compair itself while loading the next songs data

                    console.log(
                        'useTrackPlayer.ts',
                        'cannot play the song! sorry!',
                    )
                })
        })
    }

    const trackPlayer = {
        getTrackURL,
        playTrack,
        getTrackURLFromOrigin,
    }

    return trackPlayer
}
