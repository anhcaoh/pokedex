import Input from "@/components/Input";
import {
  SEARCH_NO_RESULTS,
  SEARCH_RECENT,
  SEARCH_RESULTS,
} from "@/constants/labels";
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactNode,
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
import useSearch from "./useSearch";
export interface IListItem {
  id?: string;
  firstName?: string;
  lastName?: string;
  contactName?: string;
  name: string;
  value: string | number | null;
  phone?: string;
  email?: string;
  onClick?: Function;
  shortcut?: ReactNode;
}
export type SearchClassNames = {
  cta?: string;
  ctaArrowIcon?: string;
  boundary?: string;
  inputContainer?: string;
  inputSearchIcon?: string;
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
  list?: IListItem[];
  renderListItem?: Function;
  className?: string;
  classNames?: SearchClassNames;
  onClick: Dispatch<any>;
  slot?: ReactNode;
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
  renderListItem,
  onClick,
  slot,
  ...rest
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

  const {
    boundary,
    inputContainer,
    inputSearchIcon,
    listContainer,
    listEmpty,
    listItem,
    listItemContainer,
    listItemContent,
    listItemHeading,
    listItemHeading2,
    listItemName,
    listItemId,
    listItemShortcut,
    error: errorClsx,
  } = classNames;

  const handleOnClickListItem = useCallback(
    (item: IListItem) => {
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
        <div className={inputContainer}>
          <Input
            id={id}
            name={name}
            onFocus={() => setSearchInputOnFocus(true)}
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            placeholder="Search Pokemon"
          />
        </div>

        {/* Search results */}
        {(searchInputOnFocus && (
          <>
            <ul
              {...rest}
              className={listContainer}
              role="listbox"
              tabIndex={-1}
            >
              {/* Search results */}
              {filteredList?.map((item, index) => (
                <Fragment key={item?.id}>
                  {index === 0 && (
                    <li>
                      <h2 className={listItemHeading2}>{SEARCH_RESULTS}</h2>
                    </li>
                  )}
                  <li
                    role="option"
                    className={`${
                      listItem && listItem(item, id || currentValue)
                    }`}
                    key={item?.id}
                    aria-selected={index === 0}
                    tabIndex={0}
                    autoFocus={
                      (index === 0 && !currentValue) || currentValue === item
                    }
                    onClick={() => {
                      handleOnClickListItem(item);
                    }}
                  >
                    <div className={listItemContainer}>
                      <div className={listItemContent}>
                        <div className={listItemName}>{item?.name}</div>
                        <div className={listItemId}>{item?.id}</div>
                      </div>
                      {renderListItem && renderListItem(item)}
                    </div>
                    {(item?.shortcut && (
                      <span className={listItemShortcut}>{item?.shortcut}</span>
                    )) ||
                      null}
                  </li>
                </Fragment>
              ))}
              {/* No search results */}
              {searchValue && !filteredList?.length && (
                <li className={`${listEmpty}`}>
                  {SEARCH_NO_RESULTS} &quot;{searchValue}&quot;
                </li>
              )}
              {/* Recent Searches */}
              {recentSearches?.map((item: any, index: number) => {
                return (
                  <Fragment key={item?.id}>
                    {index === 0 && (
                      <li
                        className={
                          (filteredList?.length && listItemHeading) || ""
                        }
                      >
                        <h2 className={listItemHeading2}>{SEARCH_RECENT}</h2>
                      </li>
                    )}
                    <li
                      role="option"
                      aria-selected={false}
                      className={`${
                        listItem && listItem(item, id || currentValue)
                      }`}
                      key={item?.id}
                      onClick={() => {
                        handleOnClickListItem(item);
                      }}
                    >
                      <div className={listItemContainer}>
                        <div className={listItemContent}>
                          <div className={listItemName}>{item?.name}</div>
                          <div className={listItemId}>{item?.id}</div>
                        </div>
                        {renderListItem && renderListItem(item)}
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
            {(slot && slot) || null}
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
