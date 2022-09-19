/* Created on 9/17/2022
  by Anh Cao

  This API as the backend-for-the-frontend (BFF) layer 
  to communicate with microservices
 */
 

import { NextApiRequest, NextApiResponse } from 'next'
import Pokedex, { Pokemon } from 'pokedex-promise-v2'
import pokemonMoveHandler from './move'

const options = {
  protocol: 'https' as "https" | "http",
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

export default function handler(req:NextApiRequest, res:NextApiResponse<Pokemon | Pokemon[]>) {
  (async () => {
    try {
      const { name: n, move:m  } = req.query
      if(m) {
        const move = await pokemonMoveHandler(req)
        const learned_by_pokemon = move?.map(m => m.learned_by_pokemon)
        res.status(res.statusCode).json(learned_by_pokemon)
      }
      let pokemon: Pokemon | Pokemon[] = []
      if (n) { 
        pokemon = await P.getPokemonByName(String(n).split(','));
      }
      // else if (!n && !m) res.json({queries: {name: '?name=value', move:'?move=value'}})
      res.status(res.statusCode).json(pokemon)
  } catch (error: any) {
    res.status(error.response?.status).send(error.response?.statusText)
    // INFO: should log error remotely for debugging e.g. Cloudwatch or New Relic or Splunk
    throw error
    }
  })();
}
