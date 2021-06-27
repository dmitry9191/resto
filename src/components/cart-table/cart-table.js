import React from 'react';
import {deleteFromCart} from '../../actions';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import './cart-table.scss';

const CartTable = ({RestoService, items, deleteFromCart, counters}) => {

    const btn = (items.length > 0) ? <button 
                                        className="cart__button" 
                                        onClick={() => RestoService.postCart(postDataJson(counters, items))
                                            .then(data => console.log(data))}>Send an order</button> : null;

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.map(item => {
                        const {title, url, price, id} = item;
                        return (
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                                <div className="cart__counter">Amount: {counters[id]}</div>
                            </div>
                        )   
                    })
                }
            {btn}
            </div>
        </>
    );
};

const postDataJson = (countArr, itemArr) => {
    const keys = Object.keys(countArr);
    const postData = itemArr.map(item => {
        const elem = keys.find(el => el === item.id.toString());
        
        return {
            id: item.id,
            amount: countArr[elem]
        };
    });

    return JSON.stringify(postData);
};


const mapStateToProps = (state) => {
    return {
        items: state.items,
        counters: state.counters
    }
};

const mapDispatchToProps = {
    deleteFromCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
