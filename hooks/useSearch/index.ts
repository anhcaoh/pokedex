/*
  Created on 9/17/2022
  by Anh Cao
  
  This hook is bootstrapped from .templates/hook
*/

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { succeed } from '@/features/Search/searchSlice'
import { fetchPokemon } from '../usePokemon'
import { Pokemon } from 'pokedex-promise-v2'
import { SearchQueryTypes } from '@/features/Search'

const useSearch = <T, ReturnType>(initial: string = '', type: string = 'name', onSearch: any): [string, (SearchQueryTypes|string), React.Dispatch<React.SetStateAction<string>>, React.Dispatch<React.SetStateAction<string>>] =>  {
  const dispatch = useDispatch()
  // `setQuery` is expose to client to (re)set `query`
  // so no need to `setQuery` internally here
  const [query, setQuery] = useState(initial)
  const [queryType, setQueryType] = useState(type)
  const persistQueryResults = useCallback((results: Pokemon[]) => {
    dispatch(succeed([query, queryType, results]))
    onSearch && onSearch({query, queryType, results})
  },[dispatch, onSearch, query, queryType])
  const performSearch = useCallback(async(query: string) => {
      try {
        const results = await fetchPokemon(queryType === 'move' ? {move:query} : {name:query})
        // persit `query` and `results` when valid search with data return
        // and has not already searched previously
        results && persistQueryResults(results)
      } catch(error) {
        throw error
      }
  },[persistQueryResults, queryType])
  useEffect(() => {
    query && performSearch(query)
  }, [performSearch, query])
  return [query, queryType, setQuery, setQueryType] // client to `setQuery` externally
}

export default useSearch
