/* Created on 9/17/2022
  by Anh Cao

  This API as the backend-for-the-frontend (BFF) layer 
  to communicate with microservices
 */
 

import { NextApiRequest, NextApiResponse } from 'next'
import Pokedex, { Move, Pokemon } from 'pokedex-promise-v2'

const options = {
  protocol: 'https' as "https" | "http",
  hostName: 'pokeapi.co',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

export default function handler(req:NextApiRequest) {
  return (async () => {
    try {
      const { move: m } = req.query
      let move: Move | Move[] = []
      if (m) { 
        move = await P.getMoveByName(String(m).split(','));
      }
      // else if (!n && !m) res.json({queries: {name: '?name=value', move:'?move=value'}})
      return move
  } catch (error: any) {
    // INFO: should log error remotely for debugging e.g. Cloudwatch or New Relic or Splunk
    throw error
    }
  })();
}
