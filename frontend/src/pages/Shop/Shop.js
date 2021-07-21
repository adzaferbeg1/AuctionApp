/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { RiArrowRightSLine } from "react-icons/ri";
import AuthenticationService from '../../services/AuthenticationService';
import BidService from '../../services/BidService';
import ItemService from '../../services/ItemService';
import { LabelNavbar } from '../../shared/common';
import { purpleColor, landingPageButton } from '../../shared/styles/PageStyles';
import './Shop.scss'


function Shop(props) {

    const [itemId] = useState(props.location.state.item.id);
    const [selectedItem, setSelectedItem] = useState([]);
    const [currentPrice, setCurrentPrice] = useState();
    const [timeLeft, setTimeLeft] = useState(0);
    const [userLoggedIn, setUserLoggedIn] = useState();
    const [bid, setBid] = useState('');
    const [bidders, setBidders] = useState([]);
    const [bidderNames, setBidderNames] = useState([]);

    useEffect(() => {

        setSelectedItem(props.location.state.item);
        setCurrentPrice(props.location.state.item.currentPrice);

        const fetchItems = async () => {
            var itemBidders = await BidService.getAllBidders(itemId);
            var names = [];
            itemBidders.forEach(async bidder => {


                var singleBidder = await AuthenticationService.getUserById(bidder.bidderId);
                names.push(singleBidder.name + ' ' + singleBidder.surname);

            });
            setBidders(itemBidders);
            setBidderNames(names);
        }


        fetchItems();

        var loggedIn = AuthenticationService.validateToken();
        setUserLoggedIn(loggedIn);
        var endDate = selectedItem.endDate;
        var todaysDate = (new Date(Date.now())).toISOString();
        if (parseInt(endDate) >= parseInt(todaysDate)) {
            if (parseInt(endDate.substring(5, 7)) >= parseInt(todaysDate.substring(5, 7))) {
                if (parseInt(endDate.substring(8, 10)) >= parseInt(todaysDate.substring(8, 10)))
                    setTimeLeft(parseInt(endDate.substring(8, 10)) - parseInt(todaysDate.substring(8, 10)));
            }
        }

    }, [selectedItem.endDate, props.location.state.item, itemId])

    const placeItemBid = async (e) => {
        if (selectedItem.currentPrice < bid) {
            document.getElementById("highest-bid").style.display = 'flex';
            document.getElementById("low-bid").style.display = 'none';
            setCurrentPrice(bid);
            await BidService.placeBid(selectedItem.id, AuthenticationService.getCurrentUser().personId, bid);
            await ItemService.placeBid(bid, selectedItem.id);
            const updatedItem = await ItemService.getItemById(selectedItem.id);
            setSelectedItem(updatedItem);
            setCurrentPrice(updatedItem.currentPrice);

        } else if (selectedItem.currentPrice >= bid) {

            document.getElementById("highest-bid").style.display = 'none';
            document.getElementById("low-bid").style.display = 'flex';
        }

    }

    window.onload = async () => {
        const updatedItem = await ItemService.getItemById(selectedItem.id);
        setSelectedItem(updatedItem);
        setCurrentPrice(updatedItem.currentPrice);
    }


    return (
        <>
            <LabelNavbar label={"SINGLE PRODUCT"} />
            <nav className="navbar" id="low-bid">
                <span className="navbar-brand mb-0 h1">There are higher bids than yours! Give it another try!
                </span>

            </nav>
            <nav className="navbar" id="highest-bid">
                <span className="navbar-brand mb-0 h1" >Congrats! You are the highest bidder!
                </span>

            </nav>
            <div className='item-container'>
                <div>
                    <img src='/images/baby.jpg' alt='item-img'></img>
                </div>
                <div className='item-info'>
                    <h1>{selectedItem.name}</h1>
                    <h5 style={purpleColor}>Start from - ${currentPrice}</h5>
                    <div className='bid-container'>
                        <input type='text' disabled={!userLoggedIn} value={bid} onChange={e => setBid(e.target.value)} name='bid'></input>
                        <button style={landingPageButton} disabled={!userLoggedIn} onClick={placeItemBid}>PLACE BID <RiArrowRightSLine /> </button>
                    </div>
                    <p>Enter ${currentPrice} or more</p>
                    <h6>Highest bid: ${currentPrice}</h6>
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
                        {bidders.length !== 0 && bidderNames.length !== 0 ? bidders.map((bidder, index) => (
                            <tr key={bidder.bid}>
                                <td colSpan='2'>{bidderNames[index]}</td>
                                <td>{(bidder.date).substring(0, 10)}</td>
                                <td>${bidder.bid}</td>
                            </tr>

                        )) : null}
                    </tbody>

                </Table>

            </div>
        </>
    );
}

export default Shop;