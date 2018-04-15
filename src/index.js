import './style.css'

import React from 'react'
import ReactDOM from 'react-dom'

// React.createElement
function CreateElementEx() {
  return React.createElement(
    'div',
    { className: 'component' },
    'Hello from ',
    React.createElement('strong', {}, 'React.createElement')
  )
}

// React.Component
class ComponentEx extends React.Component {
  render() {
    return (
      <div className="component">
        Hello from <strong>React.Component</strong>
      </div>
    )
  }
}

// React.PureComponent
class PureComponentEx extends React.PureComponent {
  render() {
    return (
      <div className="component">
        Hello from <strong>React.PureComponent</strong>
      </div>
    )
  }
}

// functional component
function FunctionalComponentEx() {
  return (
    <div className="component">
      Hello from <strong>functional component</strong>
    </div>
  )
}

function App() {
  return (
    <React.Fragment>
      <CreateElementEx />
      <ComponentEx />
      <PureComponentEx />
      <FunctionalComponentEx />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
