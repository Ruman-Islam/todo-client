import React from 'react';

const Spinner = () => {
    return (
        <div className="spinner-border text-light d-flex justify-content-center mx-auto mt-5" role="status">
            <span className="visually-hidden text-center">Loading...</span>
        </div>
    );
};

export default Spinner;