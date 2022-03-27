import { useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../Store/cart-context';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    // const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const closeCatr = () => {
        props.onCartClick('hide');
    };

    // console.log(cartCtx.items);
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onBlur={closeCatr}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={closeCatr}>
                    Close
                </button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;
