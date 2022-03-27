import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../Store/cart-context';

const HeaderCartButton = (props) => {
    const [bump, setBump] = useState(false);
    const cartCtx = useContext(CartContext);
    useEffect(() => {
        if (cartCtx.items.length < 0) {
            return;
        }

        setBump(true);

        const timer = setTimeout(() => {
            setBump(false);
        }, 50);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    const btnClasses = `${classes.button} ${bump && classes.bump}`;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartCtx.itemsNumber}</span>
        </button>
    );
};

export default HeaderCartButton;
