import React from 'react';
import {Link} from 'react-router-dom';
import './menu-list-item.scss';
import pizza from './img/pizza.png';
import meat from './img/meat.png';
import salads from './img/salads.png';

const MenuListItem = ({menuItem, onAddToCart}) => {

    const {title, price, url, category} = menuItem; 

    let icon = "";

    switch (category) {
        case "salads":
            icon = salads;
            break;
        case "pizza":
            icon = pizza;
            break;
        case "meat":
            icon = meat;
            break;
        default:
            break;
    }

    return (
        <li className="menu__item">
            <Link className="menu__link" to={`/${menuItem.id}`}>
                <img className="menu__icon" src={icon} alt={category}/>
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt={title}></img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}$</span></div>
            </Link>
            <button onClick={() => onAddToCart()} className="menu__btn">Add to cart</button>
        </li>
    )
}

export default MenuListItem;
