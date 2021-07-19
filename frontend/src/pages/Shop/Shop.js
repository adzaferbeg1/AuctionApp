import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { RiArrowRightSLine } from "react-icons/ri";
import { LabelNavbar } from '../../shared/common';
import { purpleColor, landingPageButton } from '../../shared/styles/PageStyles';
import './Shop.scss'
function Shop(props) {

    const [selectedItem] = useState(props.location.state.item);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {

        var endDate = selectedItem.endDate;
        console.log(parseInt(endDate));
        var todaysDate = (new Date(Date.now())).toISOString();
        if (parseInt(endDate) >= parseInt(todaysDate)) {
            if (parseInt(endDate.substring(5, 7)) >= parseInt(todaysDate.substring(5, 7))) {
                if (parseInt(endDate.substring(8, 10)) >= parseInt(todaysDate.substring(8, 10)))
                    setTimeLeft(parseInt(endDate.substring(8, 10)) - parseInt(todaysDate.substring(8, 10)));
            }
        }

    }, [selectedItem.endDate])


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
                    <h6>Time left: {timeLeft} days</h6>
                    <h5 className='details-heading'>Details</h5>
                    <div className='thin-line'></div>
                    <p className='item-desc'>{selectedItem.description}</p>
                </div>
            </div>
            <div className='bidder-container'>
                <Table variant="gray-transparent" responsive>
                    <thead>
                        <tr className="product-table-header">
                            <th colSpan='2'>Bider</th>
                            <th>Date</th>
                            <th>Bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan='2'>Ajla</td>
                            <td>13-11-2020</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td colSpan='2'>Ajla</td>
                            <td>13-11-2020</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td colSpan='2'>Ajla</td>
                            <td>13-11-2020</td>
                            <td>$100</td>
                        </tr>
                    </tbody>

                </Table>

            </div>
        </>
    );
}

export default Shop;