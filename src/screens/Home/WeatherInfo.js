import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function WeatherInfo({currentWeather}) {
  const {
    coord: {lat, lon}, 
    main: {temp},
    weather: [details],
    name,
  } = currentWeather

  const {icon, main, description} = details
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.textPrimary}>{name}</Text>
      <Image style={styles.weatherIcon} source={{uri: iconUrl}}/>
      <Text style={styles.textPrimary}>{temp.toFixed()}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
      <Text style={styles.textSecondary}>Longitude: {lon.toFixed(2)}</Text>
      <Text style={styles.textSecondary}>Latitude: {lat.toFixed(2)}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  weatherIcon: {
    width: 100,
    height: 100
  },
  weatherDescription: {
    textTransform: 'capitalize',
    fontSize: 20,
    color: '#3949ab',
    fontWeight: '500',
    marginTop: 10
  },
  textPrimary: {
    fontSize: 40,
    color: '#3949ab'
  },
  textSecondary: {
    fontSize: 20,
    color: '#3949ab',
    fontWeight: '500',
    marginTop: 10
  }
})