import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Header({onSubmit}) {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    } else {
      Alert.alert('Enter the name of the city.')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput 
        style={styles.input}
        onChangeText={text => setValue(text)}
        value={value}
        placeholder="Enter the name of the city..."
        placeholderTextColor="#3949ab"/>
      <Button title="Search"
              onPress={pressHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25
  },
  input: {
    width: '70%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
    padding: 10,
    color: '#3949ab'
  }
})