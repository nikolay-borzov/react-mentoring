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
 * @param {number} [expectedCount=1] Expected number of children components
 * @param {Object} withProps First child component properties map
 */
export const itContainsComponent = (
  getComponent,
  componentDisplayName,
  expectedCount = 1,
  withProps
) => {
  it(`contains ${componentDisplayName} component`, () => {
    const wrapper = shallow(getComponent())

    const children = wrapper.find(componentDisplayName)

    expect(children.length).toBe(expectedCount)

    if (withProps) {
      expect(children.first().props()).toEqual(withProps)
    }
  })
}
