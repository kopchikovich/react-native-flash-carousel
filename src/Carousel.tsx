import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Dimensions } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import type { FlashListProps, ViewToken } from '@shopify/flash-list'
import { checkIfItemExists } from './utils'

const { width } = Dimensions.get('screen')
const AUTO_SCROLL_PAUSE = 5
const AUTO_SCROLL_INTERVAL = 5

interface Props extends FlashListProps<any> {
  autoScroll?: boolean
  autoScrollInterval?: number
  autoScrollPause?: number
}

export const Carousel = React.memo(
  ({
    data,
    autoScroll: autoScrollProp = false,
    autoScrollInterval = AUTO_SCROLL_INTERVAL,
    autoScrollPause = AUTO_SCROLL_PAUSE,
    ...flashListRestProps
  }: Props) => {
    const carouselRef = useRef<FlashList<any>>(null)
    const userTouchTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const autoScrollTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const [autoScroll, setAutoScroll] = useState(autoScrollProp)
    const [visibleItemIndex, setVisibleItemIndex] = useState(0)

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
    )
  }
)
