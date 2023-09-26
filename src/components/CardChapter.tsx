import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {chapterType} from '../screens/ChapterScreen';

export const CardChapter = ({chapter}: {chapter: chapterType}) => {
  return (
    <View style={styles.body}>
      {!chapter?.url ? (
        <Image
          style={{width: 100, height: 100}}
          source={require('../assets/noImage.png')}
        />
      ) : (
        <Image source={{uri: chapter?.url}} width={100} height={100} />
      )}
      <Text style={styles.textColor}>Titre : {chapter.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'grey',
    padding: 15,
    margin: 5,
    flexDirection: 'row',
  },
  textColor: {
    color: 'white',
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});
