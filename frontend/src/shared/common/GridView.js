import React from 'react';

const GridView = ({ name, startPrice, onClick }) => {

    return (
        <>
            <div className="single-card card" onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Start From ${startPrice}</p>
                </div>
            </div>
        </>
    );

}

export default GridView;