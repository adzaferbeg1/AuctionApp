import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { RiArrowRightSLine } from "react-icons/ri";
import CategoryService from '../../services/CategoryService';
import ItemService from '../../services/ItemService';
import { landingPageButton, purpleColor } from '../../shared/styles/PageStyles';
import { GridView } from '../../shared/common';
import './LandingPage.scss';

const LandingPage = () => {

  const [clicked, setClicked] = useState(0);
  const [newLastItems, setNewLastItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [highlightItem, setHighlightItem] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchItems = async () => {

      try {

        const categories = await CategoryService.getAllCategories();
        setCategories(categories);
        const newArrival = await ItemService.getNewArrival();
        setHighlightItem(newArrival);
        const lastChance = await ItemService.getLastChance();
        setNewLastItems([newArrival, lastChance]);
      } catch (e) { }
    }

    fetchItems();
  }, [])

  return (
    <>
      <div className="row landing-page-xl">

        <div className="col category-menu">
          <ListGroup className="categories-list" id="my-categories">
            <ListGroup.Item className="category-item-title" key={'category'}>CATEGORIES</ListGroup.Item>
            {categories.map(category => (
              <div className="category-item list-group-item" onClick={
                () => history.push({
                  pathname: '/products',
                  state: { categoryId: category.id, fromLandingPage: true }
                })}
                key={category.title}>
                {category.title}
              </div>
            ))}
          </ListGroup>
        </div>
        <div className="col">
          {highlightItem.length !== 0 ?
            <div className="highlighted-item">
              <img className="highlighted-img" src='https://www.pngkey.com/png/full/631-6310803_clothes-dress-aesthetic-pink-tumblr-summer-png-pink.png' alt='sunglasses'></img>
              <div className="item-specs">
                <h1>{highlightItem[0].name}</h1>
                <h4 style={purpleColor}>Start from - ${highlightItem[0].currentPrice}</h4>
                <p>{highlightItem[0].description}</p>
                <button style={landingPageButton} onClick={
                  () => history.push({
                    pathname: '/shop',
                    state: { item: highlightItem[0] }
                  })}>BID NOW <RiArrowRightSLine /></button>
              </div>
            </div> : null

          }
        </div>
      </div>
      <div className="row card-container">
        <ul className="nav nav-tabs">
          <li className="nav-item" key={'unique-1'}>
            <button style={clicked === 0 ? { borderBottom: '3px solid #8367d8' } : null} className="nav-link" onClick={() => { setClicked(0); }} >New Arrivals</button>
          </li>
          <li className="nav-item" key={'unique-2'}>
            <button style={clicked === 1 ? { borderBottom: '3px solid #8367d8' } : null} className="nav-link" onClick={() => { setClicked(1); }}>Last Chance</button>
          </li>
        </ul>
      </div>
      <div className="row card-container">
        {newLastItems.length !== 0 ? newLastItems[clicked].map(item => (
          <GridView key={item.id} name={item.name} startPrice={item.currentPrice} onClick={
            () => history.push({
              pathname: '/shop',
              state: { item: item }
            })} />
        )) : null}
      </div>
    </>

  );
}

export default LandingPage;