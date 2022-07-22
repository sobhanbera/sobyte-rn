/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - music related modal and all...
 */
/**
 * this is the all types of data which could be fetched
 * from the backend api
 * 'ALBUM' is also one option but we are not providing it currently
 */
export type SearchOptions = 'SONG' | 'ARTIST' | 'PLAYLIST' | 'VIDEO'

/**
 * all the endpoints we are supporting right now
 */
type PrimaryMusicApiEndpointsOptions = 'search' | 'music/get_search_suggestions' | 'browse' | 'player' | 'next'

export interface MusicFormats {
    formats: Array<{
        approxDurationMs: string
        audioBitrate: number
        audioChannels: number
        audioCodec: string
        audioQuality: string
        audioSampleRate: string
        averageBitrate: number
        bitrate: number
        codecs: string
        container: string
        contentLength: string
        hasAudio: boolean
        hasVideo: boolean
        indexRange: Array<Object>
        initRange: Array<Object>
        isDashMPD: boolean
        isHLS: boolean
        isLive: boolean
        itag: number
        lastModified: string
        loudnessDb: number
        mimeType: string
        projectionType: string
        quality: string
        qualityLabel: null | string
        s: string
        sp: string
        url: string
        videoCodec: null | string
    }>
    full: boolean
    html5player: string
    page: string
    player_response: {
        adPlacements: Array<Array<Object>>
        annotations: Array<Array<Object>>
        attestation: {playerAttestationRenderer: Array<Object>}
        captions: {
            playerCaptionsRenderer: Array<Object>
            playerCaptionsTracklistRenderer: Array<Object>
        }
        cards: {cardCollectionRenderer: Array<Object>}
        endscreen: {endscreenRenderer: Array<Object>}
        frameworkUpdates: {entityBatchUpdate: Array<Object>}
        microformat: {playerMicroformatRenderer: Array<Object>}
        playabilityStatus: {
            contextParams: string
            miniplayer: Array<Object>
            playableInEmbed: boolean
            status: 'OK' | ''
        }
        playbackTracking: {
            atrUrl: Array<Object>
            googleRemarketingUrl: Array<Object>
            ptrackingUrl: Array<Object>
            qoeUrl: Array<Object>
            videostatsDefaultFlushIntervalSeconds: number
            videostatsDelayplayUrl: Array<Object>
            videostatsPlaybackUrl: Array<Object>
            videostatsScheduledFlushWalltimeSeconds: []
            videostatsWatchtimeUrl: Array<Object>
            youtubeRemarketingUrl: Array<Object>
        }
        playerAds: Array<Array<Object>>
        playerConfig: {
            audioConfig: Array<Object>
            mediaCommonConfig: Array<Object>
            streamSelectionConfig: Array<Object>
            webPlayerConfig: Array<Object>
        }
        responseContext: {
            mainAppWebResponseContext: Array<Object>
            serviceTrackingParams: []
            webResponseContextExtensionData: Array<Object>
        }
        storyboards: {playerStoryboardSpecRenderer: Array<Object>}
        streamingData: {
            adaptiveFormats: []
            expiresInSeconds: string
            formats: []
        }
        trackingParams: string
        videoDetails: {
            allowRatings: boolean
            author: string
            averageRating: number
            channelId: string
            isCrawlable: boolean
            isLiveContent: boolean
            isOwnerViewing: boolean
            isPrivate: boolean
            isUnpluggedCorpus: boolean
            keywords: []
            lengthSeconds: string
            shortDescription: string
        }
    }
}

export interface MusicTrackAsVideoDetails {
    videoDetails: {
        // type: SearchOptions
        // musicId: string
        // playlistId: string
        // name: string
        // artist: string | string[]
        // album: {
        //     name: string
        //     browseId: string
        // }
        // duration: number
        videoId: string
        title: string
        author: string
        lengthSeconds: string
        thumbnail: {
            thumbnails: Array<{
                url: string
            }>
        }
    }
}

/**
 * artists data for songs
 */
export interface SongArtistObject {
    name: string
    browseId: string
}

/**
 * artwork data for songs
 */
export interface ArtworkObject {
    height: number
    url: string
}

/**
 * default artwork modal
 */
export interface Artwork {
    height: number
    width: number
    url: string
}

/**
 * content of songs which are returned when making a request to get songs list
 */
export interface SongObject {
    type: 'song'
    title: string
    musicId: string
    playlistId: string
    artists: Array<SongArtistObject>
    album?: {
        name: string
        browseId: string
    }
    duration: number
    artworks: Array<ArtworkObject>
    params?: string
}

/**
 * artist object when returned from api request
 * whichever arttributes aren't used in the app they are optional in this interface (but not actually)
 */
export interface ArtistObject {
    type: 'artist'
    browseId: string
    title: string
    artworks: Array<Artwork>
}

/**
 * playlist object when returned from api request
 * whichever arttributes aren't used in the app they are optional in this interface (but not actually)
 */
export interface PlaylistObject {
    type: 'playlist'
    browseId: string
    title: string
    trackCount: number
    artworks: Array<Artwork>
    author?: string
}

/**
 * @deprecated
 *
 * album object when returned from api request
 * whichever arttributes aren't used in the app they are optional in this interface (but not actually)
 */
export interface AlbumObject {
    type: 'album' | 'single'
    browseId: string
    playlistId: string
    title: string
    year: string
    artworks: Array<Artwork>
    artist?: string
}

/**
 * this is the artist's page data we get after quering using browseId
 */
export interface ArtistDetailsObject {
    name: string
    thumbnails: Array<Artwork>
    description?: string
    products?: {
        albums: {
            content: []
        }
        singles: {
            browseId: string
            content: []
            params: string
        }
        songs: {
            browseId: string
            content: []
            params: string
        }
        videos: {
            browseId: string
            content: []
            params: string
        }
    }
    views?: number
}

export interface PlaylistTrackObject {
    type: 'song'
    title: string
    musicId: string
    playlistId: string
    artists: Array<SongArtistObject>
    album?: {
        name: string
        browseId: string
    }
    duration: number
    artworks: Array<Artwork>
}
/**
 * this is the playlist's page data we get after quering using browseId
 */
export interface PlaylistDetailsObject {
    title: string
    trackCount: number
    dateYear: number
    content: Array<PlaylistTrackObject>
    artwork: Array<Artwork>
    continuation: ContinuationObjectKeys
    owner?: string
    views?: number
}

/**
 * this is the object which could be used to get any search data infinitely
 */
export interface ContinuationObject {
    continuation: {
        continuation: string
        clickTrackingParams: string
    }
}

/**
 * seperated keys of continuation object of any search result
 */
export interface ContinuationObjectKeys {
    continuation: string
    clickTrackingParams: string
}

/**
 * this is the modal which is the main blueprint representing the schema of any
 * type of search result
 *
 * here it is for searching songs
 */
export interface FetchedSongObject {
    content: Array<SongObject>
    continuation: ContinuationObjectKeys
}

/**
 * this type could be used for any type of fetched data
 * like song, playlist, artists, albums
 * just provide the data type in the generics
 */
export type FetchedData<DataObject> = {
    content: Array<DataObject>
    continuation: ContinuationObjectKeys
}

/**
 * data about from where does a track/song is being played
 * a song could be loaded in the music player's UI at initial app's launch
 * or either it can be played from other screens as well
 *
 * so this is the type which describes it
 *
 * here 'player' is the only way that the song is played from the player's interface
 *
 * here context is the position of screen from where the track is been played
 * musicId is the current music's id
 * musicId is the current music's playlist's id
 * query is the query executed to get the song's list
 * this query will be executed again to get the rest of songs
 * which will be pushed after the song which is being played/changed
 */
export interface TrackDescription {
    context: 'player' | 'explore' | 'search' | 'other' | ''
    trackData?: SongObject
    query: string
}

/**
 * metadata which every track contains...
 */
export interface TrackMetadataBase {
    url: string
    artist: string
    artwork: string
    description: string // actual type is string, we need to parse the JSON from this string, if we want to use
    genre?: string
    contentType?: string

    [key: string]: any
}

/**
 * here onwards all the interface, modals and schemas for the TRACK's actual URL goes....
 *
 * like tracks data, track's url, track's
 */

// types of audio qualities we are providing...
export type AudioQualityType = 'extreme' | 'good' | 'poor' | 'auto'
/**
 * the options we can customize when asking for music URL...
 */
export interface MusicDataFetchOptions {
    approxDurationMs?: string
    audioBitrate?: number
    audioQuality?: AudioQualityType
    contentLength?: string
    hasAudio?: boolean
    hasVideo?: boolean
}

/**
 * data which will be provided when anywhere the fetching of music URL is requested
 */
export interface TrackURLDataModal {
    url: string
}

/**
 * the type of data that will be saved on the local storage in the device after searcing for it
 * and with a expiration timestamp so that the URL could not be used after that
 *
 * this expiration is because, from where we are geting this data has a expiration property on every URL
 * so we could use them till they expire (why not right!) so to do that the expiration field must be present
 *
 * and also with the music ID all this is related to
 */
export interface TrackURLLocalStorageData {
    musicId: string
    url: string
    expire: string // new Date().getTime()
}

/**
 * the full data returned when requesting for the music origin URL
 */
interface MusicFormats {
    formats: Array<{
        approxDurationMs: string
        audioBitrate: number
        audioChannels: number
        audioCodec: string
        audioQuality: string
        audioSampleRate: string
        averageBitrate: number
        bitrate: number
        codecs: string
        container: string
        contentLength: string
        hasAudio: boolean
        hasVideo: boolean
        indexRange: Array<Object>
        initRange: Array<Object>
        isDashMPD: boolean
        isHLS: boolean
        isLive: boolean
        itag: number
        lastModified: string
        loudnessDb: number
        mimeType: string
        projectionType: string
        quality: string
        qualityLabel: null | string
        s: string
        sp: string
        url: string
        videoCodec: null | string
    }>
    full: boolean
    html5player: string
    page: string
    player_response: {
        adPlacements: Array<Array<Object>>
        annotations: Array<Array<Object>>
        attestation: {playerAttestationRenderer: Array<Object>}
        captions: {
            playerCaptionsRenderer: Array<Object>
            playerCaptionsTracklistRenderer: Array<Object>
        }
        cards: {cardCollectionRenderer: Array<Object>}
        endscreen: {endscreenRenderer: Array<Object>}
        frameworkUpdates: {entityBatchUpdate: Array<Object>}
        microformat: {playerMicroformatRenderer: Array<Object>}
        playabilityStatus: {
            contextParams: string
            miniplayer: Array<Object>
            playableInEmbed: boolean
            status: 'OK' | ''
        }
        playbackTracking: {
            atrUrl: Array<Object>
            googleRemarketingUrl: Array<Object>
            ptrackingUrl: Array<Object>
            qoeUrl: Array<Object>
            videostatsDefaultFlushIntervalSeconds: number
            videostatsDelayplayUrl: Array<Object>
            videostatsPlaybackUrl: Array<Object>
            videostatsScheduledFlushWalltimeSeconds: []
            videostatsWatchtimeUrl: Array<Object>
            youtubeRemarketingUrl: Array<Object>
        }
        playerAds: Array<Array<Object>>
        playerConfig: {
            audioConfig: Array<Object>
            mediaCommonConfig: Array<Object>
            streamSelectionConfig: Array<Object>
            webPlayerConfig: Array<Object>
        }
        responseContext: {
            mainAppWebResponseContext: Array<Object>
            serviceTrackingParams: []
            webResponseContextExtensionData: Array<Object>
        }
        storyboards: {playerStoryboardSpecRenderer: Array<Object>}
        streamingData: {
            adaptiveFormats: []
            expiresInSeconds: string
            formats: []
        }
        trackingParams: string
        videoDetails: {
            allowRatings: boolean
            author: string
            averageRating: number
            channelId: string
            isCrawlable: boolean
            isLiveContent: boolean
            isOwnerViewing: boolean
            isPrivate: boolean
            isUnpluggedCorpus: boolean
            keywords: []
            lengthSeconds: string
            shortDescription: string
        }
    }
}

/**
 * explore screen data types and modals are described here
 * like what are the songs list and songs type and more....
 */

/**
 * this is the modal of the data which will be saved in the explore screen data reducer
 * in form of array of data
 */
export enum ExploreScreenDataCategory {
    romantic_songs = 'romantic_songs',
    bollywood_songs = 'bollywood_songs',

    todays_hits = 'todays_hits',
    new_release = 'new_release',
    romance_2010 = 'romance_2010',

    made_for_you = 'made_for_you',
    evergreen = 'evergreen',
    trending_songs = 'trending_songs',

    blockbuster_romance = 'blockbuster_romance',
    popular_tracks = 'popular_tracks',

    popular_artists = 'popular_artists',
    top_tracks = 'top_tracks',
    top_playlists = 'top_playlists',
    new_artists = 'new_artists',

    sad_tracks = 'sad_tracks',
    lofi_tracks = 'lofi_tracks',
}
export interface ExploreScreenDataModal {
    searchQuery: string
    dataCategory: keyof typeof ExploreScreenDataCategory
    results: Array<SongObject | PlaylistObject | ArtistObject>
}
