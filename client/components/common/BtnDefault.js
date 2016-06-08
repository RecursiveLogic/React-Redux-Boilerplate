import React from 'react'

const BtnDefault = (props) => {
    return (
        <button onClick={props.onClick}>
            { props.btnText }
        </button>
    )
}

export default BtnDefault
