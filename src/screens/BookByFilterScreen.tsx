import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {bookType} from './HomeScreen';
import {getBook} from '../api/callApi';
import {CardBooks} from '../components/CardBook';
import {HeaderDefault} from '../components/HeaderDefault';

const BookByFilterScreen = (props: {route: {params: {filterName: string}}}) => {
  const [books, setBooks] = useState<bookType[]>([]);
  const [examMode, setExamMode] = useState<boolean>(false);

  useEffect(() => {
    getBook().then(res => {
      setBooks(
        res.data.viewer.books.hits
          .filter((book: bookType) => {
            const {levels, subjects} = book;
            const filterName = props.route.params.filterName;
            return (
              (levels &&
                levels.some((level: any) => level.name === filterName)) ||
              (subjects && subjects.some((sub: any) => sub.name === filterName))
            );
          })
          .sort((a: bookType, b: bookType) => {
            const aLevelName = a.levels?.[0]?.name ?? '';
            const bLevelName = b.levels?.[0]?.name ?? '';
            return aLevelName.localeCompare(bLevelName);
          }),
      );
    });
  }, [props.route.params.filterName]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderDefault title={props.route.params.filterName} />
      <TouchableOpacity
        style={{alignSelf: 'center', margin: 15}}
        onPress={() => {
          setExamMode(prevExamMode => !prevExamMode);
        }}>
        <Text style={{color: examMode ? 'green' : 'red'}}>
          Mode examen {examMode ? 'On' : 'Off'}
        </Text>
      </TouchableOpacity>

      <FlatList
        style={styles.body}
        data={
          examMode
            ? books.filter(
                book =>
                  book?.levels?.[0].name.startsWith('Terminale') ||
                  book?.levels?.[0].name.startsWith('2nd') ||
                  book?.levels?.[0].name.startsWith('1re'),
              )
            : books
        }
        renderItem={({item}) =>
          item.displayTitle ? <CardBooks book={item} /> : null
        }
      />
    </SafeAreaView>
  );
};

export default BookByFilterScreen;

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
