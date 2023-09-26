import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {getChapter} from '../api/callApi';
import {CardChapter} from '../components/CardChapter';
import {HeaderDefault} from '../components/HeaderDefault';

export interface chapterType {
  id: number;
  title: string;
  url?: string;
}
const ChapterScreen = (props: {route: {params: {bookId: number}}}) => {
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
      <HeaderDefault title={'Chapitre'} />
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
