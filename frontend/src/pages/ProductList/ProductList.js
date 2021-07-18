import React, { useState, useEffect } from 'react';
import CategoryService from '../../services/CategoryService';
import ItemService from '../../services/ItemService';
import { LabelNavbar } from '../../shared/common';
import { GridView } from '../../shared/common';
import { purpleColor } from '../../shared/styles/PageStyles';
import './ProductList.scss';

const ProductList = (props) => {

    const [categoryId, setCategoryId] = useState(props.location.state.categoryId);
    const [fromLandingPage, setFromLandingPage] = useState(props.location.state.fromLandingPage);
    const [itemsFromLanding, setItemsFromLanding] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allFilteredItems, setAllFilteredItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {

            try {
                const allCat = await CategoryService.getAllCategories();
                setAllCategories(allCat);
                const itemsChosenFromLanding = await ItemService.getFilteredByCategory(categoryId);
                setItemsFromLanding(itemsChosenFromLanding);
                const filteredItems = [];
                allCat.map(async (category) => {
                    const filtered = await ItemService.getFilteredByCategory(category.id);
                    filteredItems[category.id - 1] = filtered;
                });
                setAllFilteredItems(filteredItems);
                console.log(filteredItems);

            } catch (e) {
                console.log("Could not identify category id");
            }
        }

        fetchItems();
    }, [])

    return (
        <>
            <LabelNavbar label={'ITEMS'} />
            <div className="product-container">
                <div className='col-sm-4'>
                    <h6 style={purpleColor}>PRODUCT CATEGORIES</h6>
                    {allCategories.length !== 0 ? allCategories.map(category => (
                        <p onClick={() => { setCategoryId(category.id); setFromLandingPage(false) }}>{category.title}</p>
                    )) : null}
                </div>

                <div className='col-md-8'>
                    {allFilteredItems.length !== 0 && !fromLandingPage ? allFilteredItems[categoryId - 1].map(item => (
                        <GridView id={item.id} name={item.name} startPrice={item.startPrice} />
                    )) : itemsFromLanding.map(item => (
                        <GridView id={item.id} name={item.name} startPrice={item.startPrice} />
                    ))}
                </div>


            </div>
        </>


    );

}

export default ProductList;
