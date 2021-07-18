import React, { useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { LabelNavbar } from '../../shared/common';
import { purpleColor, landingPageButton } from '../../shared/styles/PageStyles';
import './Shop.scss'
function Shop(props) {

    const [selectedItem] = useState(props.location.state.item);


    return (
        <>
            <LabelNavbar label={"SINGLE PRODUCT"} />
            <div className='item-container'>
                <div>
                    <img src='/images/baby.jpg' alt='item-img'></img>
                </div>
                <div className='item-info'>
                    <h1>{selectedItem.name}</h1>
                    <h5 style={purpleColor}>Start from - ${selectedItem.startPrice}</h5>
                    <div className='bid-container'>
                        <input type='text'></input>
                        <button style={landingPageButton}>PLACE BID <RiArrowRightSLine /> </button>
                    </div>
                    <p>Enter ${selectedItem.currentPrice} or more</p>
                    <h6>Highest bid: ${selectedItem.currentPrice}</h6>
                    <h6>No bids:</h6>
                    <h6>Time left: {selectedItem.endDate} days</h6>
                    <h5>Details</h5>
                    <div className='thin-line'></div>
                </div>
            </div>
            <div className='bidder-container'>

            </div>
        </>
    );
}

export default Shop;