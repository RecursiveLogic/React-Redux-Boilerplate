import React from 'react'

const Btn = (props) => {
    return (
        <button onClick={props.onClick}>
            { props.text }
        </button>
    )
}

export default Btn
