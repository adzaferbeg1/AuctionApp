import React from 'react';

const GridView = ({ id, name, startPrice, onClick }) => {

    return (
        <>
            <div className="single-card card" key={id} onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Start From ${startPrice}</p>
                </div>
            </div>
        </>
    );

}

export default GridView;