import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

/**
 * Creates test case for snapshot testing
 * @param {Function} getComponent Function returning component to test snapshot
 * @param {string} [testName='renders correctly']
 */
export const itRendersCorrectly = (
  getComponent,
  testName = 'renders correctly'
) => {
  it(testName, () => {
    const tree = renderer.create(getComponent())

    expect(tree).toMatchSnapshot()
  })
}

/**
 * Creates test case to check whether component contains another component
 * @param {Function} getComponent Function returning parent component
 * @param {string} componentDisplayName Child component display name
 * @param {Object} params Optional params
 * @param {number} [params.testName=`contains ${componentDisplayName} component`]
 * @param {number} [params.expectedCount=1] Expected number of children components
 * @param {Object} params.expectedProps First child component properties map
 */
export const itContainsComponent = (
  getComponent,
  componentDisplayName,
  { testName, expectedCount = 1, expectedProps } = {}
) => {
  it(testName || `contains ${componentDisplayName} component`, () => {
    const wrapper = shallow(getComponent())
    const children = wrapper.find(componentDisplayName)

    expect(children.length).toBe(expectedCount)
    if (expectedProps) {
      expect(children.first().props()).toEqual(expectedProps)
    }
  })
}

/**
 * Sets relative URL
 * @param {string} url
 */
export const setUrl = url => {
  window.history.pushState({}, '', url)
}
