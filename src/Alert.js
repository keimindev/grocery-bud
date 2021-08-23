import React, { useEffect } from 'react'

function Alert({type, msg, removeAlert, list}) {
    useEffect( () =>{
        const timeout = setTimeout( () => {
            removeAlert()
        }, 2000)
        return () => clearTimeout(timeout)
    }, [list])
    return (
        <div>
            <p className={`alert alert-${type}`}>{msg}</p>
        </div>
    )
}



export default Alert