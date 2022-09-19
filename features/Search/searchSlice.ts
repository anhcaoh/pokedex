import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from 'pokedex-promise-v2'

export interface SearchSliceState {
  queries: {
    names:string[],
    moves:string[]
  }
  results: Pokemon[]
}

const initialState: SearchSliceState = {
  queries: {
    names:[],
    moves:[]
  },
  results: []
}

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    succeed: (state, action: PayloadAction<[string, string, Pokemon[]]>) => {
      //INFO: not actually mutating state here. Immer is at work
      const existing = [...state.queries.names,...state.queries.moves]
      const newQuery = action.payload[0]
      const newQueryType = action.payload[1]
      const newQueryResults = action.payload[2]
      if( newQueryResults && existing?.indexOf(newQuery) === -1 ){
        if(newQueryType === 'name' ) state.queries.names.push(action.payload[0])
        if(newQueryType === 'move' ) state.queries.moves.push(action.payload[0])
        state.results = [...state.results, ...action.payload[2]]
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { succeed } = searchSlice.actions

export default searchSlice.reducer