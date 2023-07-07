import Search from "../Search";

const Pokedex = () => {
  return (
    <div className="container m-auto">
      <h2 className="font-bold text-5xl">Pokedex</h2>
      <Search autoFocus onClick={(e) => console.log(e)} />
    </div>
  );
};
export default Pokedex;
