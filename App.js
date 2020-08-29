import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home/Home'
import RequestList from './src/screens/RequestList/RequestList'
import * as Location from 'expo-location'
import { NavBar } from './src/NavBar'
import Ionicons from '@expo/vector-icons/Ionicons'


const WEATHER_API_KEY = '0fd263a90326ac9acef5624474313868';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const Tab = createBottomTabNavigator();

function MyTabs() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [cities, setCity] = useState([])
  const [unitsSystem, setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        setErrorMessage('Acces to location is needed to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords
      setLatitude(latitude)
      setLongitude(longitude)
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const addCity = async (title) => {

    const weatherUrl = `${BASE_WEATHER_URL}q=${title}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    const response = await fetch(weatherUrl)
    const result = await response.json()

    if (response.ok) {
      setCurrentWeather(result)
      setLatitude(result.coord.lat)
      setLongitude(result.coord.lon)
    } else {
      setErrorMessage(result.message)
    }

    var d = new Date();

    setCity (prev => [...prev, {
      id: Date.now().toString(),
      title,
      lon: result.coord.lon,
      lat: result.coord.lat,
      date: ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
    }])
  }

  const showPreviousCity = async(title) => {
    const weatherUrl = `${BASE_WEATHER_URL}q=${title}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
    const response = await fetch(weatherUrl)
    const result = await response.json()

    if (response.ok) {
      setCurrentWeather(result)
      setLatitude(result.coord.lat)
      setLongitude(result.coord.lon)
    } else {
      setErrorMessage(result.message)
    }
  }

  if (currentWeather) {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                return (
                  <Ionicons
                    name={
                      focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline'
                    }
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === 'RequestList') {
                return (
                  <Ionicons
                    name={focused ? 'ios-list-box' : 'ios-list'}
                    size={size}
                    color={color}
                  />
                );              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#3949ab',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home">
            {props => <Home {...props} onSubmit={addCity} currentWeather={currentWeather}/>}
          </Tab.Screen>
          <Tab.Screen name="RequestList" >
            {props => <RequestList {...props} cities={cities} showPreviousCity={showPreviousCity}/>}
          </Tab.Screen>
        </Tab.Navigator>      
    );
  } else {
    return (
      <View>
        <NavBar/>
        <Text style={{textAlign: 'center', fontSize: 20, color: '#3949ab'}}>Please wait...</Text>
      </View>
    )
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
