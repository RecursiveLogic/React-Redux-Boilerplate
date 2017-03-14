import React, { Component } from 'react'
import { connect } from 'react-redux'

import { increment } from '../actions/counterActions'

import Btn from '../atoms/Btn'

class App extends Component {
  render() {
    const { count, increment } = this.props

    return (
      <div>
        { count }
        <Btn onClick={() => increment()} text='Click' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { count } = state.counter
  return { count }
}

export default connect(mapStateToProps, { increment })(App)
