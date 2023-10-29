import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { FlashListProps } from '@shopify/flash-list'

const { width } = Dimensions.get('screen')

interface Props extends FlashListProps<any> {}

export const Carousel = ({ ...flashListProps }: Props) => {
  return (
    <FlashList
      showsHorizontalScrollIndicator={false}
      decelerationRate={'fast'}
      estimatedItemSize={width}
      {...flashListProps}
      style={[styles.carousel, flashListProps?.style]}
      pagingEnabled
      horizontal
    />
  )
}

const styles = StyleSheet.create({
  carousel: { width },
})
