import React, { Component } from 'react'
import { connect } from 'react-redux'

import { increment } from '../actions/counterActions'

import Btn from '../atoms/Btn'

class App extends Component {
  render() {
    const { count, dispatch } = this.props

    return (
      <div>
        { count }
        <Btn onClick={() => dispatch(increment())} text='Click' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { count } = state.counter
  return { count }
}

export default connect(mapStateToProps)(App)
