import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'zustand/vanilla';
import {createJSONStorage, persist} from 'zustand/middleware';

interface AppState {
  chapterShow: number[];
  setChapterShow: (chapterShow: number[]) => void;
  toggleChapterStatus: (chapterId: number) => void;
}

export const useAppStore = createStore<AppState>()(
  persist(
    set => ({
      chapterShow: [],
      setChapterShow: chap => set({chapterShow: chap}),
      toggleChapterStatus: (chapterId: number) =>
        set(state => {
          if (!state.chapterShow.includes(chapterId)) {
            return {chapterShow: [...state.chapterShow, chapterId]};
          }
          return state;
        }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
