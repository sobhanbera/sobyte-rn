/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - component to render artist in the explore screen mostly
 */

import React, {useEffect, useState} from 'react'

import {useMusic} from '@/hooks'
import {ArtistObject, FetchedData} from '@/schemas'
import {ListCardRendererArtists} from './ListCardRendererArtists'

interface QueryArtistRendererProps {
    searchQueries: string[]
}
export function QueryArtistRenderer({searchQueries}: QueryArtistRendererProps) {
    const {search} = useMusic()

    // since we are not rendering data to get continuous data, so only the searched content
    const [artists, setArtists] = useState<Array<ArtistObject>>([])

    /**
     * loads up all the neccessary data required to render the artists list
     * the search query will be dynamic and will be modified
     */
    useEffect(() => {
        if (searchQueries) {
            // search(searchQuery, 'ARTIST')
            //     .then((res: FetchedData<ArtistObject>) => {
            //         setArtists(res.content)
            //     })
            //     .catch(_ERR => {})
            Promise.all(
                searchQueries.map(searchQuery =>
                    search(searchQuery, 'ARTIST', true),
                ), // we can get results for all the search queries
            ).then((manyArtistResult: Array<FetchedData<ArtistObject>>) => {
                // after getting the array of all the above query searching
                // we will combine them and reduce the duplicate ones,
                // and finally update the state
                const combinedArtistData: Array<ArtistObject> = []
                manyArtistResult.forEach((fetchedArtistData, _index) => {
                    combinedArtistData.push(...fetchedArtistData.content)
                })

                // now filtering out the duplicated
                const uniqueBrowseIds: string[] = []
                const finalFilteredArtistsData = combinedArtistData.filter(
                    (artistData: ArtistObject) => {
                        const isADuplicateArtistData = uniqueBrowseIds.includes(
                            artistData.browseId,
                        )

                        // if the data is not found existing already
                        if (!isADuplicateArtistData) {
                            uniqueBrowseIds.push(artistData.browseId)

                            return true
                        }

                        console.log(artistData.title)

                        // the data is already here in the array and the current one is a duplicate
                        return false
                    },
                )

                // finally updating the state with filtered results
                setArtists(finalFilteredArtistsData)
            })
        }
    }, [])

    return (
        <ListCardRendererArtists
            artistList={artists}
            onPressArtistCard={() => {}}
        />
    )
}
