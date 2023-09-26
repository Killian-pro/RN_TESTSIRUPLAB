import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getChapter} from '../api/callApi';
import {CardChapter} from '../components/CardChapter';
import {useNavigation} from '@react-navigation/native';

export interface chapterType {
  id?: number;
  title: string;
  url?: string;
}
const ChapterScreen = (props: {route: {params: {bookId: number}}}) => {
  const navigation = useNavigation();
  const [chapters, setChapters] = useState<chapterType[]>([]);

  useEffect(() => {
    getChapter(props.route.params.bookId).then(res =>
      setChapters(
        res?.data?.viewer?.chapters?.hits.sort(
          (a: {id: number}, b: {id: number}) => a.id - b.id,
        ),
      ),
    );
  }, [props.route.params.bookId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        style={styles.hearder}
        onPress={() => navigation.goBack()}>
        {/* A FAIRE : mettre un icon */}
        <Text style={styles.textColor}> ← </Text>
        <Text style={[styles.textColor, {flex: 1, textAlign: 'center'}]}>
          CHAPITRE
        </Text>
      </TouchableOpacity>
      <FlatList
        style={styles.body}
        data={chapters}
        renderItem={({item}) =>
          item.title ? <CardChapter chapter={item} /> : null
        }
      />
    </SafeAreaView>
  );
};

export default ChapterScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    margin: 15,
    flex: 1,
  },
  textColor: {
    color: 'white',
  },
  hearder: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    height: 50,
    alignItems: 'center',
  },
});
