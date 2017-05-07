import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { increment } from '../actions/counterActions'

import Btn from '../atoms/Btn'

import Style from '../styles/containers/Root'

class Root extends Component {
  render() {
    const { count, increment } = this.props

    return (
      <div styleName='root'>
        <p>{ count }</p>
        <Btn onClick={() => increment()} text='Click' />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { count } = state.counter
  return { count }
}

export default connect(mapStateToProps, { increment })(CSSModules(Root, Style))
