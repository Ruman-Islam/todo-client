import React from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

const Pagination = ({ isLoading, pageNumber, setPageNumber, count }) => {

    const prevPage = () => {
        if (pageNumber > 0) {
            const pageNo = pageNumber - 1;
            setPageNumber(pageNo);
        }
    }
    const nextPage = () => {
        if (count > pageNumber + 1) {
            const pageNo = pageNumber + 1;
            setPageNumber(pageNo);
        }
    }

    return (
        <>
            {isLoading ||
                <div className='mx-auto d-flex justify-content-center'>
                    <>
                        <button
                            className='btn'
                            onClick={prevPage}>
                            <AiOutlineDoubleLeft />
                        </button>
                        { // here making an array for picking sequel of 1, 2, 3
                            // for maintaining page number dynamically
                            [...Array(count).keys()]
                                .map(pgNumber =>
                                    <button key={pgNumber}
                                        className={`btn mx-1
                                 ${pageNumber === pgNumber ? 'btn btn-info' : ''}`}
                                        onClick={() => setPageNumber(pgNumber)}>
                                        {pgNumber + 1}
                                    </button>
                                )
                        }
                        <button
                            className='btn'
                            onClick={nextPage}>
                            <AiOutlineDoubleRight />
                        </button>
                    </>
                </div>
            }
        </>
    );
};

export default Pagination;