import { NextApiRequest, NextApiResponse } from "next";
import Pokedex, { Pokemon } from "pokedex-promise-v2";

const options = {
  protocol: "https" as "https" | "http",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const P = new Pokedex(options);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon[]>
) {
  return (async () => {
    try {
      const { name, move: m } = req.query;
      let pokemon: Pokemon[] = [];
      if (name) {
        pokemon = await P.getPokemonByName(String(name).split(","));
      }
      return res.status(res.statusCode).json(pokemon ? pokemon : []);
    } catch (error: any) {
      return res.send(error.response.status === 404 ? [] : error);
    }
  })();
}
