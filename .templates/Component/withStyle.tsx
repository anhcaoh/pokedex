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

export interface IWithStyle__templateNameToPascalCase__Props {
  theme?: Theme
  style?: string
  className?: string
}
const cx = classNames.bind(styles)
function withStyle__templateNameToPascalCase__(
  Component: React.FC<IWithStyle__templateNameToPascalCase__Props>
) {
  return ({
    style,
    className,
    ...rest
  }: IWithStyle__templateNameToPascalCase__Props) => {
    const WithStyle = styled(Component)`
      ${style}
    `
    return (
      <WithStyle {...rest} className={cx('__templateNameToPascalCase__')} />
    )
  }
}

export default withStyle__templateNameToPascalCase__
export { withStyle__templateNameToPascalCase__ as withStyle }
