import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Header from './Header'
import { NavBar } from '../../NavBar'
import WeatherInfo from './WeatherInfo';

export default function Home({currentWeather, onSubmit}) {

  return (
    <View style={{backgroundColor: '#90cdf4', height: '100%'}}>
      <NavBar/>
      <View style={styles.content}>
        <Header onSubmit={onSubmit}/>
        <WeatherInfo currentWeather={currentWeather}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
})