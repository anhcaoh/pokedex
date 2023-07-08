import Input from "@/components/Input";
import { Pokemon } from "pokedex-promise-v2";
import {
  ChangeEvent,
  Dispatch,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
import SearchRecentContextWithProvider, {
  SearchRecentContext,
} from "./SearchRecentContext";
import SearchResults from "./SearchResults";
import useSearch from "./useSearch";
export interface IListItem {
  id?: string;
  name: string;
  value: string | number | null;
  onClick?: Function;
}
export type IListItemWithPokemon = IListItem & Pokemon;
export type SearchClassNames = {
  boundary?: string;
  searchInput?: string;
  listContainer?: string;
  listEmpty?: string;
  listItem?: (
    // eslint-disable-next-line no-unused-vars
    a: { value: string } | any,
    // eslint-disable-next-line no-unused-vars
    b: { value: string } | any
  ) => string | string;
  listItemContainer?: string;
  listItemContent?: string;
  listItemHeading?: string;
  listItemHeading2?: string;
  listItemName?: string;
  listItemId?: string;
  listItemShortcut?: string;
  error?: string;
};
export interface ISearch {
  innerRef?: Ref<HTMLInputElement>;
  id?: string;
  name?: string;
  error?: string;
  labelText?: string;
  onChange?: Function;
  value?: IListItem | null;
  defaultValue?: IListItem | null;
  autoFocus?: boolean;
  list?: IListItemWithPokemon[];
  renderListItem?: Function;
  className?: string;
  classNames?: SearchClassNames;
  onClick: Dispatch<any>;
}
const _Search = ({
  innerRef,
  id,
  name,
  value,
  defaultValue,
  autoFocus = false,
  onChange,
  list,
  classNames = {},
  error,
  onClick,
}: ISearch) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentValue, setCurrentValue] = useState(value || defaultValue);
  const [filteredList, setFilteredList] = useState(list);
  const [searchInputOnFocus, setSearchInputOnFocus] = useState(autoFocus);
  const boundaryRef = useRef(null);
  useOnClickOutside(boundaryRef, () => {
    setSearchInputOnFocus(false);
  });
  useEffect(() => {
    onChange && onChange(currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  const { refetch } = useSearch(searchValue);
  const { recentSearches } = useContext(SearchRecentContext);
  const handleOnSearchChangedList = useCallback(async () => {
    if (searchValue) {
      const { data: _list } = await refetch();
      setFilteredList(_list);
      return;
    } else {
      setFilteredList([]);
    }
  }, [searchValue, refetch]);

  useEffect(() => {
    setCurrentValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    handleOnSearchChangedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const { boundary, searchInput, error: errorClsx } = classNames;

  const handleOnClickListItem = useCallback(
    (item: IListItemWithPokemon) => {
      item.onClick && item.onClick(item); //from list item from either static vs remote list
      setCurrentValue(item);
      onClick && onClick(item); //callback from parent to set selected pokemon
      setSearchValue("");
      setSearchInputOnFocus(false);
      //clear search query and unset focus
    },
    [onClick]
  );

  return (
    <>
      <div className={boundary} ref={boundaryRef}>
        {/* Search input  */}
        <Input
          className={searchInput}
          id={id}
          name={name}
          onFocus={() => setSearchInputOnFocus(true)}
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search Pokemon"
        />
        {/* Search results */}
        {(searchInputOnFocus && (
          <>
            <SearchResults
              results={filteredList!}
              classNames={classNames}
              searchValue={searchValue}
              currentValue={currentValue}
              onClick={handleOnClickListItem}
            />
          </>
        )) ||
          null}
      </div>
      {/* display error if any */}
      {error && <label className={errorClsx}>{error}</label>}
    </>
  );
};

const Search = (props: ISearch) => (
  <SearchRecentContextWithProvider>
    <_Search {...props} />
  </SearchRecentContextWithProvider>
);
export default Search;
