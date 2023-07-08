import { Pokemon } from "pokedex-promise-v2";
import { Fragment, useState } from "react";
import Search from "../Search";
import { SearchResultsItem } from "../Search/SearchResults";
import { searchClassNames } from "../Search/styled";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  return (
    <div className="container m-auto z-30 !w-[500px]">
      <h2 className="font-bold text-5xl">Pokedex</h2>
      <Search
        autoFocus
        onClick={(pokemon) => {
          setPokemons([...pokemons, pokemon]);
        }}
      />
      <ul className="bg-white rounded my-3">
        {pokemons?.map((pokemon) => {
          return (
            <Fragment key={pokemon.id}>
              <SearchResultsItem item={pokemon} classNames={searchClassNames} />
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
export default Pokedex;
