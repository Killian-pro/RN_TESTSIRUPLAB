import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getBook} from '../api/callApi';
import {CardBooks} from '../components/CardBook';
import {useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

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
        <View style={{flex: 1}}>
          <Image
            style={{width: 200, height: 200}}
            resizeMode="contain"
            source={{
              uri: 'https://img.over-blog-kiwi.com/0/68/70/92/20170111/ob_c4958c_images.png',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setFilterBySubject(!filterBySubject);
          }}>
          <Text style={styles.textColor}>
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
                  <TouchableOpacity
                    disabled={!subjectName}
                    onPress={() => {
                      navigation.navigate('BookByFilterScreen', {
                        filterName: subjectName,
                      });
                    }}>
                    <Text style={styles.textColor}>voir tous</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={{height: 120}}
                  horizontal={true}
                  data={books
                    .filter(book => book.subjects?.[0]?.name === subjectName)
                    .slice(0, 3)}
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
                  <TouchableOpacity
                    disabled={!levelName}
                    onPress={() => {
                      navigation.navigate('BookByFilterScreen', {
                        filterName: levelName,
                      });
                    }}>
                    <Text style={styles.textColor}>voir tous</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  style={{height: 120}}
                  horizontal={true}
                  data={books
                    .filter(book => book.levels?.[0]?.name === levelName)
                    .slice(0, 3)}
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
  hearder: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
