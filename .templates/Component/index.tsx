/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import React from 'react'

export interface I__templateNameToPascalCase__Props {
  className?: string
  children?: JSX.Element | JSX.Element[]
}
const __templateNameToPascalCase__: React.FC<
  I__templateNameToPascalCase__Props
> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>
}
__templateNameToPascalCase__.displayName = '__templateNameToPascalCase__'

export default __templateNameToPascalCase__
