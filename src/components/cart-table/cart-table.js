import React from 'react';
import {deleteFromCart} from '../../actions';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';
import './cart-table.scss';

const CartTable = ({RestoService, items, deleteFromCart, counters}) => {

    const keys = Object.keys(counters);
    const postData = items.map(item => {
        const elem = keys.find(el => el === item.id.toString());
        return {
            id: item.id,
            amount: counters[elem]
        }
    });

    const postDataJson = JSON.stringify(postData);

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
                <div>
                    <button onClick={() => RestoService.postCart(postDataJson).then(data => console.log(data))} className="cart__button">Send an order</button>
                </div>    
            </div>
        </>
    );
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