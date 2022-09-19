import { renderHook } from '@testing-library/react-hooks'
import usePokemon from './index'

describe('usePokemon', () => {
  const mockStore = {
    search: {
      results: [{ name: 'Pikachu ' }],
    },
  }
  const mockUseSelector = jest.fn()
  const mockUseDispatch = jest.fn()
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    mockUseSelector,
    mockUseDispatch,
  }))
  beforeEach(() => {
    mockUseSelector.mockImplementation((callback) => {
      return callback(mockStore)
    })
  })
  afterEach(() => {
    mockUseDispatch.mockClear()
  })
  test('should return pokemon with given query name', () => {
    const _mock = 'Pikachu'
    const { result } = renderHook(() => usePokemon(_mock))
    expect(result.current?.name).toBeTruthy()
  })
})
