import React from 'react'
import { Dimensions } from 'react-native'
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
      pagingEnabled
      horizontal
    />
  )
}
