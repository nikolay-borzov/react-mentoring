import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import { runSaga as runSagaOriginal } from 'redux-saga'
import configureMockStore from 'redux-mock-store'
import { AnyAction } from 'redux';

/**
 * Creates test closure for snapshot testing
 * @deprecated Use itRendersCorrectlyShallow
 */
export const itRendersCorrectly = (
  getComponent: Function,
  testName: string = 'renders correctly'
) => {
  it(testName, () => {
    const tree = renderer.create(getComponent()).toJSON()

    expect(tree).toMatchSnapshot()
  })
}

/**
 * Creates test closure for snapshot testing (using Enzyme shallow)
 * @param getComponent Function returning component to test snapshot
 */
export const itRendersCorrectlyShallow = (
  getComponent: () => React.ReactElement,
  testName: string = 'renders correctly'
) => {
  it(testName, () => {
    const wrapper = shallow(getComponent())

    expect(wrapper).toMatchSnapshot()
  })
}

interface ItContainsComponentParams {
  testName?: string
  expectedCount?: number
  expectedProps?: {}
}

/**
 * Creates test closure to check whether component contains another component
 * @param getComponent Function returning parent component
 * @param componentDisplayName Child component display name
 * @param params Optional params
 * @param [params.testName=`contains ${componentDisplayName} component`]
 * @param [params.expectedCount=1] Expected number of children components
 * @param params.expectedProps First child component properties map
 */
export const itContainsComponent = (
  getComponent: () => React.ReactElement,
  componentDisplayName: string,
  { testName = `contains ${componentDisplayName} component`, expectedCount = 1, expectedProps }: ItContainsComponentParams = {}
) => {
  it(testName, () => {
    const wrapper = shallow(getComponent())
    const children = wrapper.find(componentDisplayName)

    expect(children.length).toBe(expectedCount)
    if (expectedProps) {
      expect(children.first().props()).toEqual(expectedProps)
    }
  })
}

/**
 * Creates mocked store
 */
export const getMockStore = () => configureMockStore([])

/**
 * Sets relative URL
 * @param {string} url
 */
export const setUrl = (url: string) => {
  window.history.pushState({}, '', url)
}

/**
 * Runs saga and collects dispatched actions
 */
export const runSaga = (saga: any, state = {}, arg1: any = undefined) => {
  const dispatched: AnyAction[] = []
  return runSagaOriginal(
    {
      dispatch: (action: AnyAction) => dispatched.push(action),
      getState: () => state
    },
    saga,
    arg1
  )
    .toPromise()
    .then(() => dispatched)
}
