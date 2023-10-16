import axios from 'axios';
import {bookType} from '../screens/HomeScreen';
import {chapterType} from '../screens/ChapterScreen';

interface ApiResponse<T> {
  data: {
    viewer: {
      [key in 'books' | 'chapters']: {
        hits: T[];
      };
    };
  };
}

type BookApiResponse = ApiResponse<bookType>;
type ChaptersApiResponse = ApiResponse<chapterType>;

export const getBook = async (): Promise<BookApiResponse> => {
  const response = await axios.post(
    `https://api-dev.lelivrescolaire.fr/graph`,
    {
      query:
        'query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}',
    },
  );
  return response.data;
};

export const getChapter = async (
  bookId: number,
): Promise<ChaptersApiResponse> => {
  const response = await axios.post(
    `https://api-dev.lelivrescolaire.fr/graph`,
    {
      query:
        'query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}',
      variables: {
        bookId,
      },
    },
  );
  return response.data;
};
