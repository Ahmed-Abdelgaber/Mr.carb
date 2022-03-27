import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import headerImg from '../../Assests/Header-img.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    const showCart = () => {
        props.onCartClick('show');
    };

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Mr.carb</h1>
                <HeaderCartButton onClick={showCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={headerImg} alt="Header IMG" />
            </div>
        </Fragment>
    );
};

export default Header;
