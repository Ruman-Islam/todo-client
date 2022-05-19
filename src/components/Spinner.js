import React from 'react';

const Spinner = () => {
    return (
        <div className='pt-5'>
            <div className="spinner-border text-light d-flex justify-content-center mx-auto" role="status">
                <span className="visually-hidden text-center">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;