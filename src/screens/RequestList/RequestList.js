import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavBar } from '../../NavBar';
import { City } from './City';

export default function RequestList({cities, navigation, showPreviousCity}) {


  return (
    <View>
      <NavBar/>
      <View style={styles.content}>
        {cities.map(city => {
          return <City navigation={navigation} city={city} key={city.id} showPreviousCity={showPreviousCity}/>
        })}
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