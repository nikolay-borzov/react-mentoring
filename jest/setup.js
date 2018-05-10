import promiseFinally from 'promise.prototype.finally'

import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Bring '.finally' to Promise (only for Node 8). Will be available in Node 10
promiseFinally.shim()

Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount
