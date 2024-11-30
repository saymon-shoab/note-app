
import React from 'react'



const ActionBar = ({title, children}) => {
  return (
    <div>
        <h1 style={{marginBottom:"3px"}}>{title}</h1>
        <div style={{display: 'flex', justifyContent:"space-between", alignItems:"center", margin:"10px 0px"}}>
            {children}
        </div>
    </div>
  )
}

export default ActionBar
