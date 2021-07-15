import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import CategoryService from '../../services/CategoryService';
import ItemService from '../../services/ItemService';
import './LandingPage.scss';

const LandingPage = () => {

  const [clicked, setClicked] = useState(0);
  const [newLastItems, setNewLastItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchItems = async () => {

      try {

        const categories = await CategoryService.getAllCategories();
        setCategories(categories);
        const newArrival = await ItemService.getNewArrival();
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
            <ListGroup.Item className="category-item-title">CATEGORIES</ListGroup.Item>
            {categories.map(category => (
              <div className="category-item list-group-item" onClick={() => history.push('/shop')}>
                {category}
              </div>
            ))}
          </ListGroup>
        </div>
        <div className="col big-item">

        </div>
      </div>
      <div className="row card-container">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button style={clicked === 0 ? { borderBottom: '3px solid #8367d8' } : null} className="nav-link" onClick={() => { setClicked(0); }} >New Arrivals</button>
          </li>
          <li className="nav-item">
            <button style={clicked === 1 ? { borderBottom: '3px solid #8367d8' } : null} className="nav-link" onClick={() => { setClicked(1); }}>Last Chance</button>
          </li>
        </ul>
      </div>
      <div className="row card-container" id="parent-container">
        {newLastItems.length !== 0 ? newLastItems[clicked].map(item => (
          <div className="single-card card">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Start from ${item.startPrice}</p>
            </div>
          </div>
        )) : null}
      </div>
    </>

  );
}

export default LandingPage;