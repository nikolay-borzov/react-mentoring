import promiseFinally from 'promise.prototype.finally'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Bring '.finally' to Promise (only for Noe 8). Will be available in Node 10
promiseFinally.shim()

Enzyme.configure({ adapter: new Adapter() })
