import React from  'react'
import { Text, View, StyleSheet } from 'react-native';

export const City = ({ city, navigation, showPreviousCity }) => {

  const pressHandler = () => {
    showPreviousCity(city.title)
    navigation.navigate('Home')
  }

  return (
    <View style={styles.city}>
      <Text 
        style={styles.text} 
        key={city.id}
        onPress={() => pressHandler()}>
          {city.title} ({city.lon} {city.lat}) {city.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#c8c8c8',
    borderRadius: 5,
    marginBottom: 10,
  }, 
  text: {
    color: '#3949ab',
    fontSize: 18
  }
})