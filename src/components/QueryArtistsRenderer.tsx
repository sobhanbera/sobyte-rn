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

export interface QueryArtistRendererProps {
    searchQueries: string[]
    onPressArtistCard(artistData: ArtistObject): void // when the artist card will be pressed
}
export function QueryArtistRenderer({
    searchQueries,
    onPressArtistCard,
}: QueryArtistRendererProps) {
    const {search} = useMusic()

    // since we are not rendering data to get continuous data, so only the searched content
    const [artists, setArtists] = useState<Array<ArtistObject>>([])

    /**
     * method loads up the artists data using search method of useMusic hook
     */
    const loadArtistsData = () => {
        if (searchQueries) {
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

                        // the data is already here in the array and the current one is a duplicate
                        return false
                    },
                )

                // finally updating the state with filtered results
                setArtists(finalFilteredArtistsData)
            })
        }
    }

    /**
     * loads up all the neccessary data required to render the artists list
     * the search query will be dynamic and will be modified
     */
    useEffect(() => {
        loadArtistsData()
    }, [])

    return (
        <ListCardRendererArtists
            artistList={artists}
            onPressArtistCard={onPressArtistCard}
        />
    )
}
