/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import { render, screen } from '@testing-library/react'
import Component from './index'

describe('AppBoundary', () => {
  test('should render without errors', async () => {
    const _mock = 'Oops! Something went wrong. Please try again'
    render(
      <Component>
        <span>{_mock}</span>
      </Component>
    )
    const element = await screen.findByText(_mock)
    expect(element).toBeTruthy()
  })
})
