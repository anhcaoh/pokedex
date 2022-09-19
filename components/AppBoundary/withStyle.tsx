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

export interface IWithStyleAppBoundaryProps {
  theme?: Theme
  style?: string
  className?: string
}
const cx = classNames.bind(styles)
function withStyleAppBoundary(
  Component: React.FC<IWithStyleAppBoundaryProps>
) {
  return ({
    style,
    className,
    ...rest
  }: IWithStyleAppBoundaryProps) => {
    const WithStyle = styled(Component)`
      ${style}
    `
    return (
      <WithStyle {...rest} className={cx('AppBoundary')} />
    )
  }
}

export default withStyleAppBoundary
export { withStyleAppBoundary as withStyle }
