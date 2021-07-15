import React from 'react';
import { useHistory } from 'react-router-dom';
import { ListGroup, Carousel } from 'react-bootstrap';
import CategoryService from '../../services/CategoryService';
import './LandingPage.scss';

function LandingPage() {

  const history = useHistory();

  const getCategories = async () => {

    CategoryService.getAllCategories().then(
      (response) => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {

          var listItem = document.createElement("div");
          listItem.setAttribute("class", "category-item list-group-item");
          listItem.textContent = response[i];
          listItem.onclick = () => history.push('/shop');
          document.getElementById("my-categories").appendChild(listItem);

        }
      },
      error => {

      }
    );
  }

  window.onload = function () {
    getCategories();
  };

  return (
    <>
      <div className="row landing-page-xl">

        <div className="col category-menu">
          <ListGroup className="categories-list" id="my-categories">
            <ListGroup.Item className="category-item-title">CATEGORIES</ListGroup.Item>
          </ListGroup>
        </div>
        <div className="col big-item">
          
        </div>
      </div>
    </>

  );
}

export default LandingPage;