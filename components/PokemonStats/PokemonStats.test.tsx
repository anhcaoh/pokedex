/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import { render, screen } from '@testing-library/react'
import Component from './index'

describe('PokemonStats', () => {
  test('should render without errors', async () => {
    const _stats = {
      species: { name: 'Pikachu' },
      moves: [{ move: { name: 'Pound' } }],
      abilities: [{ ability: { name: 'Fire' } }],
    }
    render(<Component stats={_stats} />)
    const element = await screen.findByText(_stats.species.name)
    expect(element).toBeTruthy()
  })
})
