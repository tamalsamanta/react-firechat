import React from 'react'

const Button = ({ onclick = null, children = null }) => {
    return <button onClick={onclick}>{children}</button>
};

export default Button
