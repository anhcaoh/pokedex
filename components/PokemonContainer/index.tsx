/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import React from 'react'
import styles from './style.module.scss'

export interface IPokemonContainerProps {
  className?: string
  children?: JSX.Element | JSX.Element[]
}
const PokemonContainer: React.FC<IPokemonContainerProps> = ({
  children,
  ...rest
}) => {
  return (
    <div {...rest} className={styles.main}>
      {children}
    </div>
  )
}
PokemonContainer.displayName = 'PokemonContainer'
export default PokemonContainer
