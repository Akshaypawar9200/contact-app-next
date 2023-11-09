import React from 'react'
import './Spinner.css'
const Spinner = ({ loader }) => {
    // console.log(loader)
    return (
        <>

            <div className="loader" style={{ display: loader ? "block" : "none" }}>
                <div className="dot-spinner">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                </div>
            </div>
        </>
    )
}

export default Spinner