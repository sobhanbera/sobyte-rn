/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TypescriptReact
 *
 * Purpose - custom header where a search input is available..
 */

import React, {useRef} from 'react'
import {TextInput, TextInputProps, View} from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import {useTheme} from '@/hooks'
import {CircularRegular, DEFAULT_HEADER_HEIGHT, TINY_ICON_SIZE} from '@/configs'
import {TouchableScalable} from './TouchableScalable'

export interface SearchInputHeaderProps {
    textInputProps?: TextInputProps
    onClearSearchInput?: () => void

    showBackButton?: boolean // this is to cancel all the search results
    onBackButtonPress?: () => void // method which will cancel the search results
}
export function SearchInputHeader({
    textInputProps,
    onClearSearchInput = () => {},

    showBackButton = false,
    onBackButtonPress = () => {},
}: SearchInputHeaderProps) {
    const {theme, gutters, fonts, layouts} = useTheme()
    const searchInputRef = useRef<TextInput>(null)

    return (
        <View
            style={[
                layouts.row,
                layouts.justifyContentAround,
                layouts.alignItemsCenter,
                gutters.statusBarHeightPaddingTop,
                {
                    minHeight: DEFAULT_HEADER_HEIGHT,
                    backgroundColor: theme.surface,
                },
            ]}>
            <View
                style={[
                    layouts.row,
                    layouts.alignItemsCenter,
                    layouts.hiddenOverflow,
                    gutters.smallMarginHorizontal,
                    gutters.smallMarginVertical,
                    gutters.extraTinyPadding,
                    {
                        backgroundColor: theme.surfacelight,
                        borderRadius: 2,
                    },
                ]}>
                <TouchableScalable
                    style={[gutters.smallPadding]}
                    onPress={() =>
                        showBackButton
                            ? onBackButtonPress()
                            : searchInputRef.current?.focus()
                    }>
                    <AntDesignIcon
                        name={showBackButton ? 'arrowleft' : 'search1'} // we are replacing the search icon with the back button
                        size={TINY_ICON_SIZE - 4}
                        color={theme.themecolorrevert}
                    />
                </TouchableScalable>

                <TextInput
                    ref={searchInputRef}
                    spellCheck={false}
                    multiline={false}
                    keyboardType={'default'}
                    returnKeyType={'search'}
                    placeholder={'Search'}
                    // placeholder="Search for tracks, artists, playlists, albums..."
                    {...textInputProps}
                    style={[
                        layouts.fill,
                        gutters.tinyPaddingVertical,
                        fonts.textRegular,
                        {
                            fontFamily: CircularRegular,
                            color: theme.themecolorrevert,
                        },
                        textInputProps?.style,
                    ]}
                />

                {textInputProps?.value ? (
                    <TouchableScalable
                        style={[gutters.smallPadding]}
                        onPress={onClearSearchInput}>
                        <EvilIcon
                            name={'close'}
                            size={TINY_ICON_SIZE}
                            color={theme.themecolorrevert}
                        />
                    </TouchableScalable>
                ) : null}
            </View>
        </View>
    )
}
