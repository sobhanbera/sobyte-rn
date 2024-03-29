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
import Lodash from 'lodash' // util methods
import NetInfo from '@react-native-community/netinfo'

import {
    API_CONFIG_DATA_STORAGE_KEY,
    PRIMARY_MUSIC_API,
    PRIMARY_MUSIC_API_ENDPOINTS,
    MUSIC_API_USER_AGENT,
    MUSIC_API_ACCEPTED_LANGUAGE,
    MUSIC_API_KEY,
    MUSIC_API_NEXT,
    MUSIC_API_ALT,
} from '@/configs'
import {
    ArtistDetailsObject,
    ContinuationObject,
    ContinuationObjectKeys,
    PrimaryMusicApiEndpointsOptions,
    SearchOptions,
} from '@/schemas'

import MusicUtils from '@/utils/music'
import MusicParser from '@/utils/musicparser'
import {useDispatch, useSelector} from 'react-redux'
import {
    SobyteState,
    updateMusicConfigState,
    updateMusicConfigStatus,
} from '@/state'
import {
    getDataFromLocalStorage,
    getLocationKeyForSavingSearchData,
    setDataToLocalStorage,
} from '@/utils'

export function useMusic() {
    // state for the music config and more...
    const {musicConfigData} = useSelector(
        (state: SobyteState) => state.musicconfig,
    )
    const dispatch = useDispatch()

    /**
     * main and core required variable to make requests to the backend
     */
    let musicDataApiRequestor = axios.create({
        baseURL: PRIMARY_MUSIC_API,
        headers: {
            'User-Agent': MUSIC_API_USER_AGENT,
            'Accept-Language': MUSIC_API_ACCEPTED_LANGUAGE,
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
                     * @SOBYTE_MUSIC_CONFIG_LAST_UPDATED - this is the timestamp when the last api was last updated which is done every day once automatically...
                     */
                    const LAST_DATE = new Date(
                        Number(apiConfigs.SOBYTE_MUSIC_CONFIG_LAST_UPDATED),
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
                                    let fetchConfig: {[key: string]: string} =
                                        {}

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

                                    /**
                                     * this is the timestamp when the last api was last updated which is done every day once automatically...
                                     */
                                    const SOBYTE_MUSIC_CONFIG_LAST_UPDATED =
                                        new Date().getTime().toString()
                                    await AsyncStorage.setItem(
                                        API_CONFIG_DATA_STORAGE_KEY,
                                        JSON.stringify({
                                            ...fetchConfig,
                                            SOBYTE_MUSIC_CONFIG_LAST_UPDATED:
                                                SOBYTE_MUSIC_CONFIG_LAST_UPDATED,
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
                                let fetchConfig: {[key: string]: string} = {}

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

                                /**
                                 * this is the timestamp when the last api was last updated which is done every day once automatically...
                                 */
                                const SOBYTE_MUSIC_CONFIG_LAST_UPDATED =
                                    new Date().getTime().toString()
                                await AsyncStorage.setItem(
                                    API_CONFIG_DATA_STORAGE_KEY,
                                    JSON.stringify({
                                        ...fetchConfig,
                                        SOBYTE_MUSIC_CONFIG_LAST_UPDATED:
                                            SOBYTE_MUSIC_CONFIG_LAST_UPDATED,
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
                        // console.log('Successfully Manual Initialization') // JUST_FOR_DEV

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
                    .catch((__musicConfigErrorAfterManualInit__: any) => {
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
            } else {
                // the music config data is updated and usable
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
                            MusicUtils.createApiContext(musicConfigData),
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
                        if (res.data?.hasOwnProperty('responseContext')) {
                            apiRequsetResolver(res.data)
                        }
                    })
                    .catch(err => {
                        apiRequsetReject(err)
                    })
            }
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
                PRIMARY_MUSIC_API_ENDPOINTS.get_search_suggestions,
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
     * @param provideASubarray if any part of the app wants a subarray from the fetched content about 0 to 5 then use [0, 5]... etc.
     * @param saveToCustomLocation this is a string if any part of app needs only one type of data everytime then provide a custom location reference we will save the data instead of `${localStorageLocationKey}${query}${categoryName}` location this could be used in music player main UI component since there many different types of random queries are done and we have to load it in offline purpose so no need to save everytype query of data only one is sufficient
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
        provideASubarray: number[] = [0, 100], // default list count would be less than 30 so for safe case we are using 100 items
        saveToCustomLocation: string = '',
    ): Promise<any> => {
        var isOffline = false
        return new Promise(async (resolve, reject) => {
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
            const localStorageLocationKey =
                getLocationKeyForSavingSearchData(categoryName)
            if (saveToLocalStorage && localStorageLocationKey) {
                // since sometimes the categoryName could be empty and in that case the local we get is also empty
                await NetInfo.fetch()
                    .then(state => {
                        // console.log(
                        //     'CONNECTION STATUS:',
                        //     state.isConnected,
                        //     query,
                        //     categoryName,
                        // )

                        if (!state.isConnected) {
                            isOffline = true
                            AsyncStorage.getItem(
                                saveToCustomLocation ||
                                    `${localStorageLocationKey}-${categoryName}-${query}`,
                            )
                                .then((res: any) => {
                                    // checking if the data exists in local storage or not...
                                    if (res !== null) {
                                        // load data and provide it for rendering purpose...
                                        return resolve(JSON.parse(res))
                                    }
                                })
                                .catch(_err => {})
                        } else {
                            // connected, do nothing and continue
                        }
                    })
                    .catch(_ERR => {
                        console.log('NETWORK', _ERR)
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
            _createApiRequest(PRIMARY_MUSIC_API_ENDPOINTS.search, {
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
                            // case 'VIDEO':
                            //     result =
                            //         MusicParser.parseVideoSearchResult(context)
                            //     break
                            // case 'ALBUM':
                            //     result =
                            //         MusicParser.parseAlbumSearchResult(context)
                            //     break
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
                        if (
                            provideASubarray.length >= 2 && // both the upper and the lower range are given
                            provideASubarray[0] >= 0 && // lower range is a valid array index
                            provideASubarray[1] >= 0 && // upper range is a valid array index
                            provideASubarray[0] <= provideASubarray[1] // lower ranger is less than or equal to upper range
                        ) {
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
                         * `${localStorageLocationKey}${query}${categoryName}`
                         */
                        if (saveToLocalStorage) {
                            // if the internet is available then only save the data
                            if (!isOffline) {
                                AsyncStorage.setItem(
                                    saveToCustomLocation ||
                                        `${localStorageLocationKey}-${categoryName}-${query}`,
                                    JSON.stringify(result),
                                )
                                    .then(() => {})
                                    .catch(() => {})
                            }
                        }
                    } catch (error) {
                        return reject(error)
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
        endpointName: PrimaryMusicApiEndpointsOptions = 'search',
        continuation: ContinuationObjectKeys,
        dataType: SearchOptions,
    ): Promise<any> => {
        return new Promise((resolve, _reject) => {
            _createApiRequest(
                endpointName,
                {},
                {
                    ctoken: continuation.continuation,
                    continuation: continuation.continuation,
                    itct: continuation.clickTrackingParams,
                    type: MUSIC_API_NEXT,
                    key: MUSIC_API_KEY,
                    alt: MUSIC_API_ALT,
                },
            )
                .then(context => {
                    // let parse:Date = new Date()
                    let parsedData: any = {}
                    try {
                        switch (Lodash.upperCase(dataType)) {
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
                .catch(_ERR => {
                    console.log('Cannot provide getContinuation()', _ERR)
                })
        })
    }

    /**
     * @deprecated feature not provided for now
     *
     * @param browseId id of the album
     * @returns the object with album data
     */
    const getAlbum = (browseId: string) => {
        if (Lodash.startsWith(browseId, 'MPREb')) {
            // return new Promise((resolve, reject) => {
            //     _createApiRequest(
            //         PRIMARY_MUSIC_API_ENDPOINTS.browse,
            //         MusicUtils.buildEndpointContext('ALBUM', browseId),
            //     )
            //         .then(context => {
            //             try {
            //                 const result = MusicParser.parseAlbumPage(context)
            //                 resolve(result)
            //             } catch (error) {
            //                 return resolve({
            //                     error: error.message,
            //                 })
            //             }
            //         })
            //         .catch(error => reject(error))
            // })
        } else {
            // throw new Error('invalid album browse id.')
        }
    }

    /**
     * @param browseId id of the playlist
     * @param contentLimit limiting the data
     * @returns the object with playlist data
     */
    const getPlaylist = (
        browseId: string,
        contentLimit = 200,
    ): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (
                Lodash.startsWith(browseId, 'VL') ||
                Lodash.startsWith(browseId, 'PL')
            ) {
                Lodash.startsWith(browseId, 'PL') &&
                    (browseId = 'VL' + browseId)

                _createApiRequest(
                    PRIMARY_MUSIC_API_ENDPOINTS.browse,
                    MusicUtils.buildEndpointContext('PLAYLIST', browseId),
                )
                    .then(context => {
                        try {
                            var result = MusicParser.parsePlaylistPage(
                                context,
                                browseId,
                            )
                            const getContinuations = (
                                params: ContinuationObject,
                            ) => {
                                _createApiRequest(
                                    PRIMARY_MUSIC_API_ENDPOINTS.browse,
                                    {},
                                    {
                                        ctoken: params.continuation,
                                        continuation: params.continuation,
                                        itct: params.continuation
                                            .clickTrackingParams,
                                    },
                                )
                                    .then(context => {
                                        const continuationResult =
                                            MusicParser.parsePlaylistPage(
                                                context,
                                                browseId,
                                            )
                                        if (
                                            Array.isArray(
                                                continuationResult.content,
                                            )
                                        ) {
                                            result.content = Lodash.concat(
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
                                            result.continuation instanceof
                                                Object
                                        ) {
                                            if (
                                                contentLimit >
                                                result.content.length
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
                                    .catch(_ERR => {
                                        console.log('CANOT PLAYLIST')
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
            } else {
                reject('invalid playlist id.')
            }
        })
    }

    /**
     * @param browseId id of the artist
     * @param saveToLocalStorage if the artist's data should be saved to the local storage or not
     * @returns the object with artist data
     */
    const getArtist = (
        browseId: string,
        saveToLocalStorage?: boolean,
    ): Promise<ArtistDetailsObject> => {
        if (Lodash.startsWith(browseId, 'UC')) {
            return new Promise(async (resolve, reject) => {
                /**
                 * since we are first checking if the data is in local storage so this var is needed
                 * if the data is returned from the local storage then this variable will be true and we
                 * will not fetch the remote data again after that
                 */
                let resolvedData = false // default value false

                /**
                 * getting the data from the local storage
                 * and after getting the data we will check if the needed data is available, like the name, thumbnail
                 * if it is available then set @resolvedData to true and resolve the data
                 */
                const localArtistSavingLocationKey =
                    getLocationKeyForSavingSearchData('ARTIST')
                await getDataFromLocalStorage(
                    localArtistSavingLocationKey,
                    'ARTIST',
                    browseId,
                ).then((res: ArtistDetailsObject | any) => {
                    if (res !== null)
                        if (
                            res?.name.length > 0 &&
                            res?.thumbnails?.length >= 1
                        ) {
                            resolvedData = true
                            resolve(res)
                        }
                })

                if (resolvedData) return

                _createApiRequest(
                    PRIMARY_MUSIC_API_ENDPOINTS.browse,
                    MusicUtils.buildEndpointContext('ARTIST', browseId),
                )
                    .then(context => {
                        try {
                            const result = MusicParser.parseArtistPage(context)

                            if (saveToLocalStorage) {
                                setDataToLocalStorage(
                                    localArtistSavingLocationKey,
                                    'ARTIST',
                                    browseId,
                                    JSON.stringify(result),
                                )
                            }

                            resolve(result)
                        } catch (error) {
                            reject({
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
            _createApiRequest(PRIMARY_MUSIC_API_ENDPOINTS.player, {
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
     * @param {string} param id of the param string if any
     * @param {string} playerParams id of the param string if any
     * @param {boolean} provideFullData if true than will provide a SongObject type object else will provide only music Id and playlist Id object array
     * @param {number} numberOfSongs the number of songs data to return from this function
     * @returns the next songs list may be bare or with full data of each song
     *
     * current the use of @param provideFullData and @param numberOfSongs is deprecated
     */
    const getNext = (
        musicId: string,
        playlistId: string,
        param: string = '',
        playerParams: string = '',
        _provideFullData: boolean = false,
        _numberOfSongs: number = 10,
    ) => {
        return new Promise((resolve, reject) => {
            _createApiRequest(PRIMARY_MUSIC_API_ENDPOINTS.next, {
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

        /**
         * @deprecated
         */
        getAlbum: getAlbum,
        getPlaylist: getPlaylist,
        getArtist: getArtist,
        getPlayer: getPlayer,
        getNext: getNext,
    }

    return useMusicData
}
