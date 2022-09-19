/*
  Created on 9/17/2022
  by Anh Cao
  
  This hook is bootstrapped from .templates/hook
*/

import { RootState } from 'app/store'
import axios from 'axios'
import { Pokemon } from 'pokedex-promise-v2'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export interface IFetchPokemonParams {
  name?: string
  move?: string
}
export const fetchPokemon = (params?: IFetchPokemonParams | any): any => {
  return (async () => {
    if (params.hasOwnProperty('name') || params.hasOwnProperty('move')) {
      let queryString: string = `?${new URLSearchParams(params).toString()}`
      const response = await axios(`/api/pokemon${queryString}`)
      if (response?.status === 200) {
        return response.data
      }
      return response
    } else {
      return null
    }
  })()
}
const usePokemon = (value: string): Pokemon | null => {
  const searchedResults = useSelector(
    (state: RootState) => state.search.results
  )
  const pokemon = useMemo(() => {
    const pokemon = searchedResults
      .map((result) => {
        if (result.name === value) return result
        return null
      })
      .filter((item) => item)[0]
    return pokemon
  }, [searchedResults, value])
  return pokemon
}
export default usePokemon
