# react-native-flash-carousel

Carousel component for React Native powered by [FlashList](https://shopify.github.io/flash-list/docs/)

![Animation](assets/carousel.gif)

## Installation

```sh
yarn add @shopify/flash-list
yarn add react-native-flash-carousel
```

## Usage

Only 2 props are required: data and renderItem


```js
import { Carousel } from 'react-native-flash-carousel'

// ...

export const AwesomeApp = () => (
  <Carousel
    data={yourData}
    renderItem={({ item }) => <Card item={item} />}
  />
)
```

## Props


| Prop               | Description                                                                                                                                             | Type                                                                        | Default                      |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|------------------------------|
| data               | **Required**                                                                                                                                            | [FlashList doc](https://shopify.github.io/flash-list/docs/usage#data)       |                              |
| renderItem         | **Required**                                                                                                                                            | [FlashList doc](https://shopify.github.io/flash-list/docs/usage#renderitem) |                              |
| autoScroll         | Enables auto scrolling of the carousel                                                                                                                  | boolean                                                                     | false                        |
| autoScrollInterval | Only works when auto scroll is enabled. <br/> Scroll interval in seconds.                                                                               | number                                                                      | 5                            |
| autoScrollPause    | Only works when auto scroll is enabled. <br/> The interval after which auto scroll starts working again after the user has interacted with the carousel | number                                                                      | 5                            |
| pagination         | Displays the pagination component below the carousel                                                                                                    | boolean                                                                     | false                        |
| paginationDotStyle | Styles for dots in the pagination component                                                                                                             | [PaginationDotStyle](#types)                                                | [PaginationDotStyle](#types) |

Supports FlashList's props for horizontal list [FlashList docs](https://shopify.github.io/flash-list/docs/usage)

### Types
```ts
interface PaginationDotStyle {
  dotColor?: string        // default 'lightgray'
  activeDotColor?: string  // default 'darkgray'
  dotSize?: number         // default 8
  activeDotSize?: number   // default 9
}
```

## Roadmap

Will be dynamically updated

- [x] `v0.2` Carousel component
- [x] `v0.3` Auto scroll feature
- [x] `v0.4` Pagination component
- [ ] Looping feature
- [ ] Analytics feature
- [ ] Different types of swiping feature
- [ ] ...

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
