/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import { render, screen } from '@testing-library/react'
import Component from './index'

describe('__templateNameToPascalCase__', () => {
  test('should render without errors', async () => {
    render(<Component />)
    const element = await screen.findByText('test')
    expect(element).toBeTruthy()
  })
})
