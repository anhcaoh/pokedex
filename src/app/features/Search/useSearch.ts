import {
  SEARCH_POKEMON,
  SEARCH_POKEMON_ENDPOINT,
  SEARCH_RECENT_FROM_STORAGE,
} from "@/constants/index";
import axiosInstance from "@/utils/axios.instance";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SearchRecentContext } from "./SearchRecentContext";

const fetchSearchPokemon = async (query: string) => {
  const { data } = await axiosInstance.get(
    `${SEARCH_POKEMON_ENDPOINT}/?name=${query}`
  );
  return data;
};
const useSearch = (query: string): UseQueryResult<any, Error> => {
  const searchRecentContext = useContext(SearchRecentContext);
  const { recentSearches, setRecentSearches } = searchRecentContext!;
  return useQuery({
    queryKey: [SEARCH_POKEMON, query],
    queryFn: () => fetchSearchPokemon(query?.toLowerCase()),
    enabled: !!query,
    onSettled: (data) => {
      if (data?.length) {
        const _recentSearches = [...(recentSearches || []), ...data].reduce(
          (accum, item) => {
            const dup = accum.find(({ id }: any) => id === item.id);
            !dup && accum.push(item);
            return accum;
          },
          []
        );
        setRecentSearches(_recentSearches);
        localStorage.setItem(
          SEARCH_RECENT_FROM_STORAGE,
          JSON.stringify(_recentSearches)
        );
      }
    },
  });
};
export default useSearch;
