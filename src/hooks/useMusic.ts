/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - useMusic hook to provide data related to music using API request...
 */

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNLocalize from 'react-native-localize' // to pass the location of user in the api call
import querystring from 'querystring' // string methods
import _ from 'lodash' // util methods
import NetInfo from '@react-native-community/netinfo'

import {
    API_CONFIG_DATA_STORAGE_KEY,
    SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY,
} from '@/configs/storage'
import {
    ContinuationObject,
    ContinuationObjectKeys,
    SearchOptions,
} from '@/schemas'

import MusicUtils from '@/utils/music'
import MusicParser from '@/utils/musicparser'
import {useDispatch, useSelector} from 'react-redux'
import {
    BareMusicConfig,
    MusicConfig,
    SobyteState,
    updateMusicConfigState,
    updateMusicConfigStatus,
} from '@/state'

export function useMusic() {
    // state for the music config and more...
    // const [musicConfig, setMusicConfig] = useState<{[key: string]: any}>({})
    // const [error, setError] = useState<boolean>(true)
    // const [loaded, setLoaded] = useState<boolean>(false)
    const {musicConfigData} = useSelector(
        (state: SobyteState) => state.musicconfig,
    )
    const dispatch = useDispatch()

    /**
     * main and core required variable to make requests to the backend
     */
    let musicDataApiRequestor = axios.create({
        baseURL: 'https://music.youtube.com/',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.5',
        },
        withCredentials: true,
    })

    /**
     * @returns a promise after initializing the music api fetcher this
     * function should be called in the root element of the app where the
     * main app starts after using this function context provider
     */
    const initialize = async () => {
        return new Promise(async (resolve, reject) => {
            // await AsyncStorage.setItem(API_CONFIG_DATA_STORAGE_KEY, '')
            await AsyncStorage.getItem(API_CONFIG_DATA_STORAGE_KEY)
                .then((res: any) => {
                    /** this is the locally saved api fetching and helping
                     *  data which would help a faster loader when the app
                     *  is launched */
                    const apiConfigs = JSON.parse(res)
                    /**
                     * @LAST_UPDATED_DATE - this is the timestamp when the last api was last updated which is done every day once automatically...
                     */
                    const LAST_DATE = new Date(
                        Number(apiConfigs.LAST_UPDATED_DATE),
                    ).getDate()
                    // current date to compare the above date with...
                    const CURR_DATE = new Date().getDate()
                    /**
                     * here we are checking that the current date and the last update
                     * date difference is <= 1 only then we can continue to provide the
                     * saved data else provide the updated data as fetch config
                     * means if the user was only yesterday, today or tommowrow
                     * than we will provide the saved data else the updated one
                     * the check is : `Math.abs(CURR_DATE-LAST_DATE) <= 1`
                     * check outputs :
                     * Yesterday = 1
                     * Today = 0
                     * Tommorow = 1
                     * now it will update daily (updated) */
                    if (
                        Math.abs(CURR_DATE - LAST_DATE) === 0 &&
                        apiConfigs.LAST_UPDATED_DATE &&
                        apiConfigs.VISITOR_DATA &&
                        apiConfigs.INNERTUBE_CONTEXT_CLIENT_NAME &&
                        apiConfigs.INNERTUBE_CLIENT_VERSION &&
                        apiConfigs.DEVICE &&
                        apiConfigs.PAGE_CL &&
                        apiConfigs.PAGE_BUILD_LABEL &&
                        apiConfigs.INNERTUBE_API_VERSION &&
                        apiConfigs.INNERTUBE_API_KEY
                    ) {
                        dispatch(
                            updateMusicConfigState({
                                musicConfigData: apiConfigs,
                                error: false,
                                ready: true,
                            }),
                        )
                        // not working with normal react state
                        // setMusicConfig(apiConfigs)
                        // setError(false)
                        // setLoaded(true)

                        /**
                         * lets provide the full apiConfig data which could be used by _createApiRequest method below
                         * this would be needed if the musicConfigData is not updated yet
                         * then _createApiRequest method will call this init function and get the apiConfig in return
                         */
                        resolve({
                            ...apiConfigs,
                        })
                    } else {
                        /**
                         *
                         * @returns this context return the same which was the initialize function was doing instead first a check
                         * will be done that the api data is available if not then this function will be called and this would be more faster and
                         * efficient than the usual code...
                         */

                        musicDataApiRequestor
                            .get('/')
                            .then(async res => {
                                try {
                                    let fetchConfig: MusicConfig =
                                        BareMusicConfig // saving data

                                    res.data
                                        .split('ytcfg.set(')
                                        .map((v: string) => {
                                            try {
                                                return JSON.parse(
                                                    v.split(');')[0],
                                                )
                                            } catch (_) {}
                                        })
                                        .filter(Boolean)
                                        .forEach(
                                            (cfg: any) =>
                                                (fetchConfig = Object.assign(
                                                    cfg,
                                                    fetchConfig,
                                                )),
                                        )

                                    // not working with normal react state
                                    dispatch(
                                        updateMusicConfigState({
                                            musicConfigData: fetchConfig,
                                            error: false,
                                            ready: true,
                                        }),
                                    )
                                    // setMusicConfig(fetchConfig)
                                    // setError(false)
                                    // setLoaded(true)
                                    /**
                                     * this is the timestamp when the last api was last updated which is done every day once automatically...
                                     */
                                    const LAST_UPDATED_DATE = new Date()
                                        .getTime()
                                        .toString()
                                    await AsyncStorage.setItem(
                                        API_CONFIG_DATA_STORAGE_KEY,
                                        JSON.stringify({
                                            ...fetchConfig,
                                            LAST_UPDATED_DATE:
                                                LAST_UPDATED_DATE,
                                        }),
                                    )

                                    /**
                                     * lets provide the full apiConfig data which could be used by _createApiRequest method below
                                     * this would be needed if the musicConfigData is not updated yet
                                     * then _createApiRequest method will call this init function and get the apiConfig in return
                                     */
                                    resolve({
                                        ...fetchConfig,
                                    })
                                } catch (err) {
                                    // not working with normal react state
                                    dispatch(
                                        updateMusicConfigStatus({
                                            error: true,
                                            ready: false,
                                        }),
                                    )
                                    // setError(true)
                                    // setLoaded(false)
                                    reject(err)
                                }
                            })
                            .catch(err => {
                                // not working with normal react state
                                dispatch(
                                    updateMusicConfigStatus({
                                        error: true,
                                        ready: false,
                                    }),
                                )
                                // setError(true)
                                // setLoaded(false)
                                reject(err)
                            })
                    }
                })
                .catch(_err => {
                    /**
                     *
                     * @returns this context return the same which was the initialize function was doing instead first a check
                     * will be done that the api data is available if not then this function will be called and this would be more faster and
                     * efficient than the usual code...
                     */
                    musicDataApiRequestor
                        .get('/')
                        .then(async res => {
                            try {
                                let fetchConfig: MusicConfig = BareMusicConfig // saving data

                                res.data
                                    .split('ytcfg.set(')
                                    .map((v: string) => {
                                        try {
                                            return JSON.parse(v.split(');')[0])
                                        } catch (_) {}
                                    })
                                    .filter(Boolean)
                                    .forEach(
                                        (cfg: any) =>
                                            (fetchConfig = Object.assign(
                                                cfg,
                                                fetchConfig,
                                            )),
                                    )

                                // not working with normal react state
                                dispatch(
                                    updateMusicConfigState({
                                        musicConfigData: fetchConfig,
                                        error: false,
                                        ready: true,
                                    }),
                                )
                                // setMusicConfig(fetchConfig)
                                // setError(false)
                                // setLoaded(true)
                                /**
                                 * this is the timestamp when the last api was last updated which is done every day once automatically...
                                 */
                                const LAST_UPDATED_DATE = new Date()
                                    .getTime()
                                    .toString()
                                await AsyncStorage.setItem(
                                    API_CONFIG_DATA_STORAGE_KEY,
                                    JSON.stringify({
                                        ...fetchConfig,
                                        LAST_UPDATED_DATE: LAST_UPDATED_DATE,
                                    }),
                                )

                                /**
                                 * lets provide the full apiConfig data which could be used by _createApiRequest method below
                                 * this would be needed if the musicConfigData is not updated yet
                                 * then _createApiRequest method will call this init function and get the apiConfig in return
                                 */
                                resolve({
                                    ...fetchConfig,
                                })
                            } catch (err) {
                                // not working with normal react state
                                dispatch(
                                    updateMusicConfigStatus({
                                        error: true,
                                        ready: false,
                                    }),
                                )
                                // setError(true)
                                // setLoaded(false)

                                reject(err)
                            }
                        })
                        .catch(err => {
                            // not working with normal react state
                            dispatch(
                                updateMusicConfigStatus({
                                    error: true,
                                    ready: false,
                                }),
                            )
                            // setError(true)
                            // setLoaded(false)

                            reject(err)
                        })
                })
        })
    }

    /**
     * @param endpointName the name of api endpoint where the call is to be made
     * @param inputVariables all data which should be POST to the endpoint
     * @param inputQuery extra data to provide while calling api endpoint
     * @returns everyfunction that exists in this component and makes api
     * call to the backend it will require to call this function as this would
     * be the wrapper function of all of them...
     */
    const _createApiRequest = async (
        endpointName: string,
        inputVariables: Object,
        inputQuery = {},
        // cancelToken?: CancelTokenSource,
        cancelToken: any = '',
    ) => {
        const headers: any = Object.assign(
            {
                'x-origin': musicDataApiRequestor.defaults.baseURL,
                'X-Goog-Visitor-Id': musicConfigData.VISITOR_DATA,
                'X-YouTube-Client-Name':
                    musicConfigData.INNERTUBE_CONTEXT_CLIENT_NAME,
                'X-YouTube-Client-Version':
                    musicConfigData.INNERTUBE_CLIENT_VERSION,
                'X-YouTube-Device': musicConfigData.DEVICE,
                'X-YouTube-Page-CL': musicConfigData.PAGE_CL,
                'X-YouTube-Page-Label': musicConfigData.PAGE_BUILD_LABEL,
                'X-YouTube-Utc-Offset': String(-new Date().getTimezoneOffset()),
                'X-YouTube-Time-Zone': RNLocalize.getTimeZone(),
            },
            musicDataApiRequestor.defaults.headers,
        )

        /**
         * if the musicConfigData does not exists or it is undefined
         * then call initialize() method here and then continue doing the actual task of this function...
         */
        return new Promise((apiRequsetResolver, apiRequsetReject) => {
            if (musicConfigData.DEVICE === undefined) {
                initialize()
                    .then((musicConfigDataAfterManualInit: any) => {
                        console.log('Successfully Manual Initialization')

                        musicDataApiRequestor
                            .post(
                                `youtubei/${
                                    musicConfigDataAfterManualInit.INNERTUBE_API_VERSION
                                }/${endpointName}?${querystring.stringify(
                                    Object.assign(
                                        {
                                            alt: 'json',
                                            key: musicConfigDataAfterManualInit.INNERTUBE_API_KEY,
                                        },
                                        inputQuery,
                                    ),
                                )}`,
                                Object.assign(
                                    inputVariables,
                                    MusicUtils.createApiContext(
                                        musicConfigDataAfterManualInit,
                                    ),
                                ),
                                {
                                    responseType: 'json',
                                    headers: {
                                        ...headers,
                                        cancelToken: cancelToken.token,
                                    },
                                },
                            )
                            .then(res => {
                                if (
                                    res.data?.hasOwnProperty('responseContext')
                                ) {
                                    apiRequsetResolver(res.data)
                                }
                            })
                            .catch(err => {
                                apiRequsetReject(err)
                            })
                    })
                    .catch((musicConfigErrorAfterManualInit: any) => {
                        console.log('Manual Init Failed')

                        /**
                         * the manual initialization is failed due to some reason, maybe internet, crashes, etc.
                         *
                         * but if eventually the musicConfigData is available by any chance (if the redux state is updated now)
                         * then why not use if instead.
                         */
                        musicDataApiRequestor
                            .post(
                                `youtubei/${
                                    musicConfigData.INNERTUBE_API_VERSION
                                }/${endpointName}?${querystring.stringify(
                                    Object.assign(
                                        {
                                            alt: 'json',
                                            key: musicConfigData.INNERTUBE_API_KEY,
                                        },
                                        inputQuery,
                                    ),
                                )}`,
                                Object.assign(
                                    inputVariables,
                                    MusicUtils.createApiContext(
                                        musicConfigData,
                                    ),
                                ),
                                {
                                    responseType: 'json',
                                    headers: {
                                        ...headers,
                                        cancelToken: cancelToken.token,
                                    },
                                },
                            )
                            .then(res => {
                                if (
                                    res.data?.hasOwnProperty('responseContext')
                                ) {
                                    apiRequsetResolver(res.data)
                                }
                            })
                            .catch(err => {
                                apiRequsetReject(err)
                            })
                    })
            }

            /**
             * previously used music data api requestor...
             */
            //             musicDataApiRequestor
            //                 .post(
            //                     `youtubei/${
            //                         musicConfigData.INNERTUBE_API_VERSION
            //                     }/${endpointName}?${querystring.stringify(
            //                         Object.assign(
            //                             {
            //                                 alt: 'json',
            //                                 key: musicConfigData.INNERTUBE_API_KEY,
            //                             },
            //                             inputQuery,
            //                         ),
            //                     )}`,
            //                     Object.assign(
            //                         inputVariables,
            //                         MusicUtils.createApiContext(musicConfigData),
            //                     ),
            //                     {
            //                         responseType: 'json',
            //                         headers: {...headers, cancelToken: cancelToken.token},
            //                     },
            //                 )
            //                 .then(res => {
            //                     if (res.data?.hasOwnProperty('responseContext')) {
            //                         apiRequsetResolver(res.data)
            //                     }
            //                 })
            //                 .catch(err => {
            //                     apiRequsetReject(err)
            //                 })
        })
    }

    /**
     * @param query the query string for getting suggestions
     * @returns object with array of strings containing the search suggestion...
     */
    let getSearchSuggestionsCancelToken: any
    const getSearchSuggestions = (query: string) => {
        if (typeof getSearchSuggestionsCancelToken != typeof undefined)
            getSearchSuggestionsCancelToken.cancel(
                'Cancelling the previous token for new request.',
            )

        getSearchSuggestionsCancelToken = axios.CancelToken.source()

        return new Promise<string[]>((resolve, reject) => {
            _createApiRequest(
                'music/get_search_suggestions',
                {
                    input: query,
                },
                {},
                getSearchSuggestionsCancelToken,
            )
                .then(content => {
                    try {
                        resolve(
                            MusicUtils.fv(
                                content,
                                'searchSuggestionRenderer:navigationEndpoint:query',
                            ),
                        )
                    } catch (error) {
                        reject(error)
                    }
                })
                .catch(error => reject(error))
        })
    }

    /**
     * @param query the query string
     * @param categoryName what type of data is needed like "song" | "album" | "playlist"
     * @param saveToLocalStorage boolean if true then after searching and providing the results this function will also save the data in local storage for offline use cases.
     * @param saveToCustomLocation this is a string if any part of app needs only one type of data everytime then provide a custom location reference we will save the data instead of `${SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY}${query}${categoryName}` location this could be used in music player main UI component since there many different types of random queries are done and we have to load it in offline purpose so no need to save everytype query of data only one is sufficient
     * @param provideASubarray if any part of the app wants a subarray from the fetched content about 0 to 5 then use [0, 5]... etc.
     * @param _pageLimit number of data page wise (this argument is not in use currently).... and not prefered to use in future too...
     * @returns the search result after making api request
     *
     * the local storage will store the data in form of key value pair like {"search_query": JSON.stringify("search_result_json_value")}
     * when any error occured or seems to have no internet connection then if the particular search result is saved in local storage this function will return it in place of returning the new updated data
     * since there should be some 2nd plan for every work...
     */
    const search = (
        query: string,
        categoryName: SearchOptions = 'SONG',
        saveToLocalStorage: boolean = false,
        saveToCustomLocation: string = '',
        provideASubarray: number[] = [0, 100], // default list count would be less than 30 so for safe case we are using 100 items
        _pageLimit: number = 1,
    ) => {
        var isOffline = false
        return new Promise((resolve, reject) => {
            /**
             * if there is not internet connection we will check if the searched results are
             * saved in the local storage properly if it is stored then we could resolve with that data only
             * instead of searching again
             * NOTE: this will be only performed for offline purpose not for online use case...
             */
            // AND - AND
            /**
             * may be the user is offline
             * but that does not means that every searched query's results are saved locally
             * so we need to check if it exists or not
             * so if the saveToLocalStorage is true than we are confirm that this data is also saved locally previously
             * then only we will procced to resolve with this data
             */
            if (saveToLocalStorage) {
                NetInfo.fetch().then(state => {
                    if (!state.isConnected) {
                        isOffline = true
                        AsyncStorage.getItem(
                            saveToCustomLocation ||
                                `${SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY}-${categoryName}-${query}`,
                        )
                            .then((res: any) => {
                                // checking if the data exists in local storage or not...
                                if (res !== null) {
                                    // load data and provide it for rendering purpose...
                                    return resolve(JSON.parse(res))
                                }
                            })
                            .catch(_err => {
                                // console.log('ERROR LOCALLY LOAD', err)
                            })
                    } else {
                        // connected, do nothing and continue
                    }
                })
            }

            /**
             * TODO: if the user is offline, queue the api request and make it
             * when the user in back online again...
             */
            if (isOffline) return

            /**
             * if the user is connected to internet
             * not need to get the locally saved data instead
             * we could search again and give the latest and updated data to the user...z
             */
            var result: any = {}
            _createApiRequest('search', {
                query: query,
                params: MusicUtils.getCategoryURI(categoryName),
            })
                .then(context => {
                    try {
                        switch (categoryName) {
                            case 'SONG':
                                result =
                                    MusicParser.parseSongSearchResult(context)
                                break
                            case 'VIDEO':
                                result =
                                    MusicParser.parseVideoSearchResult(context)
                                break
                            case 'ALBUM':
                                result =
                                    MusicParser.parseAlbumSearchResult(context)
                                break
                            case 'ARTIST':
                                result =
                                    MusicParser.parseArtistSearchResult(context)
                                break
                            case 'PLAYLIST':
                                result =
                                    MusicParser.parsePlaylistSearchResult(
                                        context,
                                    )
                                break
                            default:
                                result = MusicParser.parseSearchResult(context)
                                break
                        }

                        /** sometime the above same check may pass false since the network check may take time
                         * so here we are making sure if any local data is present and user is offline then
                         * no need to provide the latest data
                         */
                        if (isOffline) return

                        /**
                         * if the provided subarray is correct then we will provide the data in that range
                         */
                        if (provideASubarray[0] <= provideASubarray[1]) {
                            /**
                             * checking that sufficient data is available or not and then providing the data
                             *
                             * if any range could be provided even if the provideASubarray[1] is more than the length of songs list
                             */
                            if (result.content.length > provideASubarray[0]) {
                                resolve({
                                    ...result,
                                    content: result.content.slice(
                                        provideASubarray[0],
                                        provideASubarray[1],
                                    ),
                                })
                            } else {
                                resolve(result)
                            }
                        } else {
                            resolve(result)
                        }

                        /**
                         * saving the data if it is required to save and also if the internet connection is
                         * avaialable or if we save while offline unstable data may get saved
                         *
                         * this data will be available when user is offline or any such case of error
                         * or anything else in world happens...
                         * we can get this same saved searched results from the refrence below
                         *
                         * "@APP:SEARCHED_SONG_OFFLINE_DATA:searched_query:searched_category"
                         *
                         * for simply using the below line of code to get the item from local storage
                         *
                         * `${SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY}${query}${categoryName}`
                         */
                        if (saveToLocalStorage) {
                            // if the internet is available then only save the data
                            if (!isOffline) {
                                AsyncStorage.setItem(
                                    saveToCustomLocation ||
                                        `${SEARCHED_SONG_OFFLINE_DATA_STORAGE_KEY}-${categoryName}-${query}`,
                                    JSON.stringify(result),
                                )
                                    .then(() => {})
                                    .catch(() => {})
                            }
                        }
                    } catch (error) {
                        return resolve({
                            error: error,
                        })
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
     * @param endpointName this is the endpoint name like "search" or anything else
     * @param continuation this is the continuation object which is provided in the fetched data after making any request to get more data of the same type...
     * @returns return the same type of object for which the continuation is provided
     */
    const getContinuation = (
        endpointName: string = 'search',
        continuation: ContinuationObjectKeys,
        dataType: SearchOptions,
    ) => {
        if (
            // continuation != [] &&
            continuation instanceof Object &&
            continuation.continuation &&
            continuation.clickTrackingParams
        ) {
            return new Promise(resolve => {
                _createApiRequest(
                    endpointName,
                    {},
                    {
                        ctoken: continuation.continuation,
                        continuation: continuation.continuation,
                        itct: continuation.clickTrackingParams,
                        type: 'next',
                        key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
                        alt: 'json',
                    },
                ).then(context => {
                    // let parse:Date = new Date()
                    let parsedData: any = {}
                    try {
                        switch (_.upperCase(dataType)) {
                            case 'SONG':
                                parsedData =
                                    MusicParser.parseSongSearchResult(context)
                                break
                            case 'VIDEO':
                                parsedData =
                                    MusicParser.parseVideoSearchResult(context)
                                break
                            case 'ALBUM':
                                parsedData =
                                    MusicParser.parseAlbumSearchResult(context)
                                break
                            case 'ARTIST':
                                parsedData =
                                    MusicParser.parseArtistSearchResult(context)
                                break
                            case 'PLAYLIST':
                                parsedData =
                                    MusicParser.parsePlaylistSearchResult(
                                        context,
                                    )
                                break
                            default:
                                parsedData =
                                    MusicParser.parseSearchResult(context)
                                break
                        }
                        resolve(parsedData)
                    } catch (error) {
                        return resolve({
                            error: error.message,
                        })
                    }
                    // let o:number = new Date() - parse
                })
            })
        } else {
            return new Promise(() => {})
        }
    }

    /**
     * @param browseId id of the album
     * @returns the object with album data
     */
    const getAlbum = (browseId: string) => {
        if (_.startsWith(browseId, 'MPREb')) {
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    MusicUtils.buildEndpointContext('ALBUM', browseId),
                )
                    .then(context => {
                        try {
                            const result = MusicParser.parseAlbumPage(context)
                            resolve(result)
                        } catch (error) {
                            return resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid album browse id.')
        }
    }

    /**
     * @param browseId id of the playlist
     * @param contentLimit limiting the data
     * @returns the object with playlist data
     */
    const getPlaylist = (browseId: string, contentLimit = 100) => {
        if (_.startsWith(browseId, 'VL') || _.startsWith(browseId, 'PL')) {
            _.startsWith(browseId, 'PL') && (browseId = 'VL' + browseId)
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    MusicUtils.buildEndpointContext('PLAYLIST', browseId),
                )
                    .then(context => {
                        try {
                            var result = MusicParser.parsePlaylistPage(context)
                            const getContinuations = (
                                params: ContinuationObject,
                            ) => {
                                _createApiRequest(
                                    'browse',
                                    {},
                                    {
                                        ctoken: params.continuation,
                                        continuation: params.continuation,
                                        itct: params.continuation
                                            .clickTrackingParams,
                                    },
                                ).then(context => {
                                    const continuationResult =
                                        MusicParser.parsePlaylistPage(context)
                                    if (
                                        Array.isArray(
                                            continuationResult.content,
                                        )
                                    ) {
                                        result.content = _.concat(
                                            result.content,
                                            continuationResult.content,
                                        )
                                        result.continuation =
                                            continuationResult.continuation
                                    }
                                    if (
                                        !Array.isArray(
                                            continuationResult.continuation,
                                        ) &&
                                        result.continuation instanceof Object
                                    ) {
                                        if (
                                            contentLimit > result.content.length
                                        ) {
                                            getContinuations(
                                                continuationResult.continuation,
                                            )
                                        } else {
                                            return resolve(result)
                                        }
                                    } else {
                                        return resolve(result)
                                    }
                                })
                            }

                            if (
                                contentLimit > result.content.length &&
                                !Array.isArray(result.continuation) &&
                                result.continuation instanceof Object
                            ) {
                                getContinuations(result.continuation)
                            } else {
                                return resolve(result)
                            }
                        } catch (error) {
                            return resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid playlist id.')
        }
    }

    /**
     * @param browseId id of the artist
     * @returns the object with artist data
     */
    const getArtist = (browseId: string) => {
        if (_.startsWith(browseId, 'UC')) {
            return new Promise((resolve, reject) => {
                _createApiRequest(
                    'browse',
                    MusicUtils.buildEndpointContext('ARTIST', browseId),
                )
                    .then(context => {
                        try {
                            const result = MusicParser.parseArtistPage(context)
                            resolve(result)
                        } catch (error) {
                            resolve({
                                error: error.message,
                            })
                        }
                    })
                    .catch(error => reject(error))
            })
        } else {
            throw new Error('invalid artist browse id.')
        }
    }

    /**
     * @param musicId id of the music
     * @param playlistId id of the playlist
     * @param paramString id of the param string if any
     * @returns the object with songs data
     */
    const getPlayer = (
        musicId: string,
        playlistId: string,
        paramString: string = '',
    ) => {
        return new Promise((resolve, reject) => {
            _createApiRequest('player', {
                captionParams: {},
                // cpn: '8aVi-t8xotY1HKuU',
                playlistId: playlistId,
                videoId: musicId,
                param: paramString,
            })
                .then((context: any) => {
                    try {
                        const result = MusicParser.parseSongDetailsPlayer(
                            context,
                            musicId,
                            playlistId,
                        )
                        resolve(result)
                    } catch (error) {
                        resolve({
                            error: error.message,
                        })
                    }
                })
                .catch(error => reject(error))
        })
    }

    /**
     * @param {string} musicId id of the music
     * @param {string} playlistId id of the playlist
     * @param {boolean} provideFullData if true than will provide a SongObject type object else will provide only music Id and playlist Id object array
     * @param {number} numberOfSongs the number of songs data to return from this function
     * @param {string} param id of the param string if any
     * @param {string} playerParams id of the param string if any
     * @returns the next songs list may be bare or with full data of each song
     *
     * current the use of @param provideFullData and @param numberOfSongs is deprecated
     */
    const getNext = (
        musicId: string,
        playlistId: string,
        _provideFullData: boolean = false,
        _numberOfSongs: number = 10,
        param: string = '',
        playerParams: string = '',
    ) => {
        return new Promise((resolve, reject) => {
            _createApiRequest('next', {
                enablePersistentPlaylistPanel: true,
                isAudioOnly: true,
                params: param,
                playerParams: playerParams,
                playlistId: playlistId,
                tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
                videoId: musicId,
            })
                .then(context => {
                    try {
                        let results = MusicParser.parseNextPanel(context)
                        resolve(results)
                    } catch (error) {
                        resolve({
                            error: error.message,
                        })
                    }
                })
                .catch(error => reject(error))
        })
    }

    const useMusicData = {
        initialize: initialize,
        initMusicApi: initialize,

        getContinuation: getContinuation,
        getSearchSuggestions: getSearchSuggestions,

        search: search,

        getAlbum: getAlbum,
        getPlaylist: getPlaylist,
        getArtist: getArtist,
        getPlayer: getPlayer,
        getNext: getNext,
    }

    return useMusicData
}
