import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Row from '../components/Row';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Text>This is the Canvas</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {}
})
