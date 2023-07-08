import { SEARCH_NO_RESULTS, SEARCH_RESULTS } from "@/app/constants";
import Image from "next/image";
import { Fragment, useContext } from "react";
import { IListItem, IListItemWithPokemon } from "./Search";
import { SearchRecentContext } from "./SearchRecentContext";

export interface ISearchResults {
  results: IListItemWithPokemon[];
  classNames?: any;
  searchValue?: string;
  currentValue?: IListItem | null;
  onClick?: any;
}

export const SearchResultsItem = ({
  classNames,
  item,
  index,
  currentValue,
  onClick,
}: any) => {
  const {
    listItem,
    listItemHeading2,
    listItemContainer,
    listItemContent,
    listItemName,
  } = classNames;
  return (
    <Fragment key={item?.id}>
      {index === 0 && (
        <li>
          <h2 className={listItemHeading2}>{SEARCH_RESULTS}</h2>
        </li>
      )}
      <li
        role="option"
        className={`${listItem && listItem(item, currentValue)} ${
          !onClick && "cursor-auto"
        }`}
        key={item?.id}
        aria-selected={index === 0}
        tabIndex={0}
        onClick={() => {
          onClick && onClick(item);
        }}
      >
        <div className={listItemContainer}>
          <div className={listItemContent}>
            <div className={listItemName}>
              <Image
                src={item?.sprites.front_shiny!}
                width={50}
                height={50}
                className="inline"
                alt={item?.name}
              />
              <span className="text-xl font-bold">{item?.name}</span>

              {/* Types */}
              <ul className="ml-3 inline" title="Types">
                {item?.types?.map(({ type: { name } }: any) => (
                  <li
                    key={name}
                    className="inline mr-2 rounded-sm p-1 bg-slate-100"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              {/* Abilities */}
              <ul
                className="pb-2 abilities overflow-x-scroll"
                title="Abilities"
              >
                <li className="mx-4 inline">⚡️</li>
                {item?.abilities?.map(({ ability: { name } }: any) => {
                  return (
                    <li
                      key={name}
                      className="inline rounded-sm p-1 bg-slate-100 mr-2"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
              {/* Moves */}
              <ul className="pb-2 moves overflow-x-scroll" title="Moves">
                <li className="inline mx-4">✨</li>
                {item?.moves?.map(({ move: { name } }: any) => {
                  return (
                    <li
                      key={name}
                      className="inline rounded-sm p-1 bg-slate-100 mr-2"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};
const SearchResults = ({
  results,
  onClick,
  classNames,
  searchValue,
  currentValue,
  ...rest
}: ISearchResults) => {
  const { listContainer, listEmpty } = classNames;
  const { recentSearches } = useContext(SearchRecentContext);
  return (
    <>
      <ul {...rest} className={listContainer} role="listbox" tabIndex={-1}>
        {/* Search results */}
        {results?.map((item, index) => (
          <SearchResultsItem
            key={item?.id}
            item={item}
            index={index}
            classNames={classNames}
            currentValue={currentValue}
            onClick={onClick}
          />
        ))}
        {/* No search results */}
        {searchValue && !results?.length && (
          <li className={`${listEmpty}`}>
            {SEARCH_NO_RESULTS} &quot;{searchValue}&quot;
          </li>
        )}
        {/* Recent Searches */}
        {recentSearches?.map((item: any, index: number) => {
          return (
            <SearchResultsItem
              key={item?.id}
              item={item}
              index={index}
              classNames={classNames}
              currentValue={currentValue}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </>
  );
};
export default SearchResults;
