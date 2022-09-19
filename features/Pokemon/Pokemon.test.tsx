/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import Component from './index'

describe('Pokemon', () => {
  test('should render without errors', async () => {
    const _mock = 'Pikachu'
    render(
      <Provider store={store}>
        <Component name={_mock} />
      </Provider>
    )
    const element = await screen.findByText(_mock)
    expect(element).toBeTruthy()
  })
})
