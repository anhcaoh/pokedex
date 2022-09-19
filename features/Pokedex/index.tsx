/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import React, { useCallback, useEffect, useState } from 'react'
import Search from '../Search'
import PokemonContainer from '@/components/PokemonContainer'
import Pokemon from '@/features/Pokemon'
import { Col, Row, Space, Typography } from 'antd'
import styles from '@/styles/Home.module.css'

export interface IPokedexProps {
  className?: string
  children?: JSX.Element | JSX.Element[]
}
const Pokedex: React.FC<IPokedexProps> = ({ children, ...rest }) => {
  const [query, setQuery] = useState('')
  useEffect(() => setQuery(query), [query])
  const handleOnSearch = useCallback(
    (payload: { query: React.SetStateAction<string> }) =>
      setQuery(payload.query),
    []
  )
  return (
    <div {...rest}>
      <PokemonContainer>
        <Space direction="vertical" align="center" size="large">
          <Typography.Title className={styles.title}>Pokédex</Typography.Title>
          <Search onSearch={handleOnSearch} />
          <Pokemon name={query} />
          <>{children}</>
        </Space>
      </PokemonContainer>
    </div>
  )
}
Pokedex.displayName = 'Pokedex'

export default Pokedex
