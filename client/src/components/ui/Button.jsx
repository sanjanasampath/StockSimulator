import React from 'react'

function Button({ children, styles = "bg-primary ", ...rest }) {
  return (
    <button  {...rest} className={'text-lg font-normal py-1 shadow text-white ' + styles }>{children}</button>

  )
}

export default Button