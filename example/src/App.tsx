import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Carousel } from 'react-native-flash-carousel'

const { width, height } = Dimensions.get('screen')
const cardHeight = 350

export default function App() {
  return (
    <View style={styles.container}>
      <Carousel
        data={Array(10).fill(0)}
        renderItem={({ index }) => <Card num={index + 1} />}
        autoScroll
      />
    </View>
  )
}

const Card = ({ num }: { num: number }) => (
  <View style={[styles.card, { backgroundColor: randomColor() }]}>
    <Text style={styles.cardText}>{num}</Text>
  </View>
)

const randomNumber = () => Math.floor(Math.random() * 255)
const randomColor = () =>
  `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (height - cardHeight) / 2,
  },
  card: {
    width: width - 10 * 2,
    height: cardHeight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  cardText: {
    fontSize: 100,
    color: 'white',
  },
})
