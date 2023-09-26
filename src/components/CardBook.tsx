import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {bookType} from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';

export const CardBooks = ({book}: {book: bookType}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={!book.valid}
      onPress={() => navigation.navigate('ChapterScreen', {bookId: book.id})}
      style={[styles.body, {backgroundColor: book.valid ? 'white' : 'grey'}]}>
      {!book?.url ? (
        <Image
          style={{width: 100, height: 'auto'}}
          source={require('../assets/noImage.png')}
        />
      ) : (
        <Image source={{uri: book?.url}} width={100} />
      )}
      <View style={{margin: 15, flex: 1}}>
        <Text style={styles.textColor}>Titre : {book.displayTitle}</Text>
        {/* A FAIRE : parcourir tous les levels */}
        <Text style={styles.textColor}>Niveau : {book.levels?.[0]?.name}</Text>
        {/* A FAIRE : faire un sujet .map */}
        <Text style={styles.textColor}>Sujet : {book.subjects?.[0]?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    borderColor: 'blue',
    borderWidth: 1,
    margin: 5,
    flexDirection: 'row',
  },
  textColor: {
    color: 'black',
  },
});
