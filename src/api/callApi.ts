import axios from 'axios';

export const getBook = async () => {
  let response = await axios.post(`https://api-dev.lelivrescolaire.fr/graph`, {
    query:
      'query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}',
  });
  return response.data;
};

export const getChapter = async (bookId: number) => {
  let response = await axios.post(`https://api-dev.lelivrescolaire.fr/graph`, {
    query:
      'query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}',
    variables: {
      bookId: bookId,
    },
  });
  return response.data;
};
