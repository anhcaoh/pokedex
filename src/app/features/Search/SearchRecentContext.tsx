import { SEARCH_RECENT_FROM_STORAGE } from "@/constants/index";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
export type SearchRecentContextType = {
  recentSearches: string[] | null;
  setRecentSearches: Dispatch<SetStateAction<string[] | null>>;
};
export const SearchRecentContext = createContext<SearchRecentContextType>({
  recentSearches: [],
  setRecentSearches: () => {},
});
const SearchRecentContextWithProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recentSearches, setRecentSearches] = useState<string[] | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window?.localStorage) {
      const recentSearchesFromStorage = JSON.parse(
        window?.localStorage?.getItem(SEARCH_RECENT_FROM_STORAGE) || "[]"
      );
      setRecentSearches(recentSearchesFromStorage);
    }
  }, []);
  return (
    <SearchRecentContext.Provider value={{ recentSearches, setRecentSearches }}>
      {children}
    </SearchRecentContext.Provider>
  );
};
export default SearchRecentContextWithProvider;
export const useRecentSearches = () =>
  useContext(SearchRecentContext)?.recentSearches;
export const useSetRecentSearches = () =>
  useContext(SearchRecentContext)?.setRecentSearches;
