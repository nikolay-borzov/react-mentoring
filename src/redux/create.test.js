import configureStore from './create'

describe('store', () => {
  it('creates store with initial state', () => {
    const { store } = configureStore()

    expect(store.getState()).toMatchSnapshot()
  })
})
