import {createContext, Dispatch, SetStateAction, useContext} from 'react';

type LoaderContext = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  successLoading: (text: string) => Promise<void>;
};

export const loaderContext = createContext<LoaderContext>({} as LoaderContext);

export default function useLoader() {
  return useContext(loaderContext);
}
