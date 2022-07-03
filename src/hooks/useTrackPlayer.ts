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
} from '@/state'
import {
    MusicDataFetchOptions,
    MusicFormats,
    SongObject,
    TrackMetadataBase,
    TrackURLDataModal,
} from '@/schemas'
import {
    DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
    DEFAULT_NOTIFICATION_ARTWORK_SIZE,
    EXTREME_QUALITY_AUDIO_MINIMUM_BITRATE,
    LOW_AUDIO_MINIMUM_BITRATE,
    REMOTE_ORIGIN_MUSIC_ID_MAXIMUM_LENGTH,
} from '@/configs'
import {
    formatArtistsListFromArray,
    getTrackToPlay,
    updateArtworkQuality,
} from '@/utils'

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
     * @param musicID the music ID
     * @param options other specific details that need to be checked before providing the actual final data
     * providing options in optional and also not recommended, please use it wisely
     * @returns tracks data with URL...
     */
    async function getTrackURL(
        musicID: string,
        options: MusicDataFetchOptions = {},
    ): Promise<TrackURLDataModal> {
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

        return new Promise(async (resolve, _reject) => {
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
                resolve({
                    url: trackURLs[musicID],
                })
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
                    )

                    resolve({
                        url: url,
                    })
                }
            })
        })
    }

    /**
     * this function reset the track player by clearing the queue...
     */
    const resetPlayer = async () => {
        TrackPlayer.reset().then(_res => {
            // dispatch(resetPlayerData()) // there is empty currentTrack data everytime, so commented
        })
    }

    const playTrack = (
        trackData?: SongObject,
        extraDescription: string = '',
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
            getTrackURL(trackData.musicId)
                .then(TrackURLData => {
                    resetPlayer()

                    const notificationArtwork = updateArtworkQuality(
                        trackData.artworks[0],
                        DEFAULT_NOTIFICATION_ARTWORK_SIZE,
                        DEFAULT_NOTIFICATION_ARTWORK_QUALITY,
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
                            extraDescription,
                            TrackURLData.url,
                        ), // optional but why not, we can use the above object also to create this track data
                    }

                    /**
                     * adding required data to the queue of track player
                     */
                    TrackPlayer.add({
                        url: TrackURLData.url,
                        title: trackData.title,
                        artist: formattedArtist,
                        artwork: notificationArtwork,
                        duration: trackData.duration,
                        description: extraDescription,
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

                    // and now play the song/track
                    if (addAndPlayTrack) TrackPlayer.play()

                    console.log(
                        'Played',
                        trackData.title,
                        'in',
                        new Date().getTime() - start,
                        'milliseconds.',
                    ) // JUST_FOR_DEV

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
    }

    return trackPlayer
}
