import React from 'react'
import loading from '../loading.gif';
function Spinner() {
    return (
        <div className='text-center'>
            <img src={loading} alt="" />
        </div>
    )
}

export default Spinner
