import Input from "@/app/componens/Input";

const Pokedex = () => {
  return (
    <div className="container m-auto w-1/2">
      <h2 className="text-3xl">Pokedex</h2>
      <Input autoFocus placeholder="Search Pokemon" />
    </div>
  );
};
export default Pokedex;
