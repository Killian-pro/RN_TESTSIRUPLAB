import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface HeaderProps {
  title: string;
}

export function HeaderDefault(title: HeaderProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.hearder}
      onPress={() => navigation.goBack()}>
      {/* A FAIRE : mettre un icon */}
      <Text style={[styles.textColor]}> ← </Text>
      <Text
        style={[
          styles.textColor,
          {flex: 1, textAlign: 'center', fontWeight: 'bold'},
        ]}>
        {title.title ? title.title : 'Inconnu'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textColor: {
    color: 'black',
  },
  hearder: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
    backgroundColor: 'white',
  },
});
