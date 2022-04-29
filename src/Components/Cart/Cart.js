import { useContext, useState } from 'react';
import { Fragment } from 'react';
import Checkout from './CheckOut';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../Store/cart-context';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const [showCheckOutFrom, setShowCheckOutFrom] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitHasError, setSubmitHasError] = useState(false);

    // const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const cartItemDeleteHandler = id => {
        cartCtx.deleteItem(id);
    };

    const closeCart = () => {
        props.onCartClick('hide');
    };

    const orderClickHandler = e => {
        setShowCheckOutFrom(true);
    };

    const sendOrder = async userData => {
        setIsSubmitting(true);

        const response = await fetch(
            'https://mrcarb-cedb4-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    items: cartCtx.items,
                }),
            }
        );

        if (!response.ok) {
            setSubmitHasError(true);
            return;
        }

        setIsSubmitting(false);
        setSubmitted(true);
        cartCtx.clearCart();
    };

    // console.log(cartCtx.items);
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onDelete={cartItemDeleteHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    const cartContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${cartCtx.totalAmount.toFixed(2)}</span>
            </div>
            {showCheckOutFrom && (
                <Checkout onConfirm={sendOrder} onCancel={closeCart} />
            )}
            {!showCheckOutFrom && (
                <div className={classes.actions}>
                    <button
                        className={classes['button--alt']}
                        onClick={closeCart}
                    >
                        Close
                    </button>
                    <button
                        className={classes.button}
                        onClick={orderClickHandler}
                    >
                        Order
                    </button>
                </div>
            )}
        </Fragment>
    );

    const isSubmittingContent = (
        <Fragment>
            <p>Sending Data....</p>
        </Fragment>
    );

    const submittedContent = (
        <Fragment>
            <p>Data Sent Successfully</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={closeCart}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );

    const submitHasErrorContent = (
        <Fragment>
            <p>Something Went Wrong</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={closeCart}>
                    Cancel
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onBlur={closeCart}>
            {!isSubmitting && !submitted && !submitHasError && cartContent}
            {isSubmitting &&
                !submitted &&
                !submitHasError &&
                isSubmittingContent}
            {submitted && !submitHasError && submittedContent}
            {submitHasError && submitHasErrorContent}
        </Modal>
    );
};

export default Cart;
