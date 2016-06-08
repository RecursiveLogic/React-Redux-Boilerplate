import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { increment } from '../actions/counterActions'

import BtnDefault from '../components/common/BtnDefault'

class Home extends Component {
    render() {
        const { count, plusOne } = this.props
        return (
            <div>
                { count }
                <BtnDefault onClick={plusOne} btnText='Click' />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { count } = state.counter
    return {
        count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        plusOne: bindActionCreators(increment, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
