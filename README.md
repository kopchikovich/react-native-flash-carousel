# react-native-flash-carousel

Carousel component for React Native powered by FlashList

## Installation

```sh
yarn add @shopify/flash-list
yarn add react-native-flash-carousel
```

## Usage

TODO

Only 2 props are required: data and renderItem

Please check [FlashList docs](https://shopify.github.io/flash-list/docs/usage)

```js
import { Carousel } from 'react-native-flash-carousel'

// ...

export const AwesomeApp = () => (
  <Carousel
    data={yourData}
    renderItem={({ item }) => <CardComponent item={item} />}
  />
)
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
