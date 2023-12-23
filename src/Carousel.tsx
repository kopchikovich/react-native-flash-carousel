import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import { checkIfItemExists } from './utils'
import { Pagination } from './Pagination'
import type { PaginationDotStyle } from './types'

const { width } = Dimensions.get('screen')
const AUTO_SCROLL_PAUSE = 5
const AUTO_SCROLL_INTERVAL = 5

interface Props<T> extends FlashListProps<T> {
  autoScroll?: boolean
  autoScrollInterval?: number
  autoScrollPause?: number
  pagination?: boolean
  paginationDotStyle?: PaginationDotStyle
  contentHeight?: number
}

export const Carousel = React.memo<Props<any>>(
  ({
    data,
    autoScroll: autoScrollProp = false,
    autoScrollInterval = AUTO_SCROLL_INTERVAL,
    autoScrollPause = AUTO_SCROLL_PAUSE,
    pagination = false,
    paginationDotStyle,
    contentHeight,
    ...flashListRestProps
  }) => {
    const carouselRef = useRef<FlashList<any>>(null)
    const userTouchTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const [autoScroll, setAutoScroll] = useState(autoScrollProp)
    const [visibleItemIndex, setVisibleItemIndex] = useState(0)

    const containerStyle = useMemo(
      () => [styles.container, { height: contentHeight }],
      [contentHeight]
    )

    const handleUserAnyTouch = useCallback(() => {
      if (autoScrollProp) {
        clearTimeout(autoScrollTimerRef.current)
        clearTimeout(userTouchTimerRef.current)
        setAutoScroll(false)

        userTouchTimerRef.current = setTimeout(() => {
          setAutoScroll(true)
        }, autoScrollPause * 1000)
      }
    }, [autoScrollPause, autoScrollProp])

    const handleViewableItemsChanged = useCallback(
      ({
        viewableItems,
      }: {
        viewableItems: ViewToken[]
        changed: ViewToken[]
      }) => {
        const firstVisibleItemIndex = viewableItems?.[0]?.index
        const lastDataIndex = (data?.length ?? 0) - 1

        if (firstVisibleItemIndex === lastDataIndex) {
          setAutoScroll(false)
        }

        if (typeof firstVisibleItemIndex === 'number') {
          setVisibleItemIndex(firstVisibleItemIndex)
        }
      },
      [data?.length]
    )

    useEffect(() => {
      if (autoScrollProp && autoScroll) {
        const nextItemIndex = visibleItemIndex + 1
        const hasNextItem = checkIfItemExists(data?.[nextItemIndex])

        if (hasNextItem) {
          autoScrollTimerRef.current = setTimeout(() => {
            carouselRef.current?.scrollToIndex({
              index: nextItemIndex,
              animated: true,
            })
          }, autoScrollInterval * 1000)
        }
      }
    }, [autoScroll, autoScrollInterval, autoScrollProp, data, visibleItemIndex])

    useEffect(
      () => () => {
        clearTimeout(userTouchTimerRef.current)
        clearTimeout(autoScrollTimerRef.current)
      },
      []
    )

    return (
      <View style={containerStyle}>
        <FlashList
          decelerationRate={'fast'}
          estimatedItemSize={width}
          showsHorizontalScrollIndicator={false}
          {...flashListRestProps}
          onViewableItemsChanged={handleViewableItemsChanged}
          onTouchStart={handleUserAnyTouch}
          ref={carouselRef}
          pagingEnabled
          data={data}
          horizontal
        />
        {pagination ? (
          <Pagination
            numPages={data?.length ?? 0}
            currentIndex={visibleItemIndex}
            dotStyle={paginationDotStyle}
          />
        ) : null}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    width,
  },
})
