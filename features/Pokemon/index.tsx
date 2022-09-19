/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import React from 'react'
import usePokemon from '@/hooks/usePokemon'
import PokemonStats from '@/components/PokemonStats'

export interface IPokemonProps {
  className?: string
  name: string
  children?: JSX.Element | JSX.Element[]
}
const Pokemon: React.FC<IPokemonProps> = ({ name, children, ...rest }) => {
  const pokemon = usePokemon(name)
  return (
    <div {...rest}>
      <PokemonStats stats={pokemon} />
    </div>
  )
}
Pokemon.displayName = 'Pokemon'

export default Pokemon
