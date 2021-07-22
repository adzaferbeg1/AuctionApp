import React from 'react';

const GridView = ({ name, startPrice, onClick, imgUrl }) => {

    return (
        <>
            <div className="single-card card" onClick={onClick}>
                <div className="card-body">
                    <img className="grid-item-img" src={imgUrl} alt={name}></img>
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Start From ${startPrice}</p>
                </div>
            </div>
        </>
    );

}

export default GridView;