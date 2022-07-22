import React from 'react'

const Error = () => {
    const divi = () => {
        const error = new Error("nan awa");

        error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
        return error;
    }
    return (
        <div>
            <button onClick={divi}>Click</button>
        </div>
    )
}

export default Error