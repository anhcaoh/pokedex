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

export interface IWithStylePokemonContainerProps {
  theme?: Theme
  style?: string
  className?: string
}
const cx = classNames.bind(styles)
function withStylePokemonContainer(
  Component: React.FC<IWithStylePokemonContainerProps>
) {
  return ({
    style,
    className,
    ...rest
  }: IWithStylePokemonContainerProps) => {
    const WithStyle = styled(Component)`
      ${style}
    `
    return (
      <WithStyle {...rest} className={cx('PokemonContainer')} />
    )
  }
}

export default withStylePokemonContainer
export { withStylePokemonContainer as withStyle }
