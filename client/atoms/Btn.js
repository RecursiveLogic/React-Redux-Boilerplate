import React from 'react'
import PropTypes from 'prop-types'
import RCM from 'react-css-modules'

import Style from '../styles/atoms/Btn'

const Btn = (props) => {
  return (
    <button onClick={props.onClick} styleName='root'>
      { props.text }
    </button>
  )
}

Btn.propTypes = {
  text: PropTypes.string.isRequired
}

export default RCM(Btn, Style)
