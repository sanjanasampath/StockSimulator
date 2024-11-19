import React from 'react'

function DisplayText(props) {
    const ClassName = `text-${props.textColor}`
  return (
    <p className={ClassName}>DisplayText</p>
  )
}

export default DisplayText