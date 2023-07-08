import clsx from "clsx";
import { forwardRef } from "react";
import Search, { ISearch, SearchClassNames } from "./Search";
const SearchStyled = forwardRef(function SearchStyled({
  innerRef,
  onClick,
  slot,
  className,
  ...rest
}: ISearch) {
  const classNames = {
    labelText: clsx("mb-1 block text-sm text-gray-500 dark:text-white"),
    boundary: clsx(
      "search z-30 mt-2 h-fit w-full rounded-md dark:bg-slate-800"
    ),
    searchInput: clsx("w-full"),
    listContainer: clsx(
      "relative mt-1 max-h-72 overflow-y-auto scroll-smooth snap-y rounded-md bg-white shadow-md dark:bg-slate-800"
    ),
    listEmpty: clsx(
      "relative w-full p-4 px-3 pr-4 text-left text-center text-sm text-muted dark:border-b dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400"
    ),
    listItem: () =>
      // (item: { value: string }, current: { value: string }) =>
      clsx(
        // { "bg-claret text-white": item.value === current?.value },
        "items-left relative w-full cursor-pointer p-2 !pt-0 hover:bg-[#f9f9f9] dark:border-slate-700 dark:bg-slate-800 dark:text-white hover:dark:bg-slate-700",
        `!${className ?? ""}` //TODO implement twMerge
      ),
    listItemContainer: clsx("w-inherit"),
    listItemContent: clsx("truncate"),
    listItemHeading: clsx(
      "mt-2 border-t border-gray-100 pt-2 dark:border-slate-700"
    ),
    listItemHeading2: clsx(
      "p-2 text-xs uppercase text-muted dark:border-slate-700"
    ),
    listItemName: clsx("font-semibold dark:text-gray-300"),
    listItemId: clsx("text-sm text-muted dark:text-muted"),
    listItemShortcut: clsx("font-normal text-gray-500"),
    error: clsx("text-error-500 mt-1 block text-sm"),
  } as SearchClassNames;
  return (
    <Search
      innerRef={innerRef}
      onClick={onClick}
      slot={slot}
      classNames={classNames}
      {...rest}
    />
  );
});
export default SearchStyled;
