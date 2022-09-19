/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/
import React from 'react'
import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import styles from './style.module.scss'

export interface IWithStylePokemonStatsProps {
  theme?: Theme
  style?: string
  className?: string
}
const cx = classNames.bind(styles)
function withStylePokemonStats(
  Component: React.FC<IWithStylePokemonStatsProps>
) {
  return ({
    style,
    className,
    ...rest
  }: IWithStylePokemonStatsProps) => {
    const WithStyle = styled(Component)`
      ${style}
    `
    return (
      <WithStyle {...rest} className={cx('PokemonStats')} />
    )
  }
}

export default withStylePokemonStats
export { withStylePokemonStats as withStyle }
