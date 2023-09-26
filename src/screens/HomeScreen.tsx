import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getBook} from '../api/callApi';
import {CardBooks} from '../components/CardBook';

type subjects = {
  name: string;
};

type levels = {
  name: string;
};

export interface bookType {
  displayTitle: string;
  id: number;
  levels?: levels[];
  subjects?: subjects[];
  url?: string;
  valid: boolean;
}
const HomeScreen = () => {
  const [books, setBooks] = useState<bookType[]>([]);
  const [filterBySubject, setFilterBySubject] = useState(false);

  useEffect(() => {
    getBook().then(res => setBooks(res.data.viewer.books.hits));
  }, []);

  const uniqueLevels = [
    ...new Set(books.map(book => book.levels?.[0]?.name)),
  ].sort();
  const uniqueSubjects = [
    ...new Set(books.map(book => book.subjects?.[0]?.name)),
  ].sort();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.hearder}>
        {/* A FAIRE : mettre un icon person pour accéder au chapitre lu */}
        <Text style={styles.textColorWhite}> ☺ </Text>
        <Text style={[styles.textColorWhite, {flex: 1, textAlign: 'center'}]}>
          Livres
        </Text>
        <TouchableOpacity
          onPress={() => {
            setFilterBySubject(!filterBySubject);
          }}>
          <Text style={styles.textColorWhite}>
            {!filterBySubject ? 'filtrer par matière' : 'filtrer par niveau'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {filterBySubject
          ? uniqueSubjects.map((subjectName, index) => (
              <View key={index}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Text style={[styles.textColor, {flex: 1, fontSize: 20}]}>
                    {subjectName ? subjectName : 'Inconnu'}
                  </Text>
                  {/* A FAIRE : mettre que trois livre et aller vers un new SCREEN */}
                  <Text style={styles.textColor}>voir tous</Text>
                </View>
                <FlatList
                  style={{height: 120}}
                  horizontal={true}
                  data={books.filter(
                    book => book.subjects?.[0]?.name === subjectName,
                  )}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <CardBooks book={item} />}
                />
              </View>
            ))
          : uniqueLevels.map((levelName, index) => (
              <View key={index}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Text style={[styles.textColor, {flex: 1, fontSize: 20}]}>
                    {levelName ? levelName : 'Inconnu'}
                  </Text>
                  {/* A FAIRE : mettre que trois livre et aller vers un new SCREEN */}
                  <Text style={styles.textColor}>voir tous</Text>
                </View>
                <FlatList
                  style={{height: 120}}
                  horizontal={true}
                  data={books.filter(
                    book => book.levels?.[0]?.name === levelName,
                  )}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <CardBooks book={item} />}
                />
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  textColor: {
    color: 'black',
  },
  textColorWhite: {
    color: 'white',
  },
  hearder: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
