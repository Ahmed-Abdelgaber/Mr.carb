import { Fragment, useState } from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './Store/CartProvider';

function App() {
    const [modalIsShown, setModalIsShown] = useState(false);

    const cartHandler = (state) => {
        if (state.toLowerCase().trim() === 'show') {
            setModalIsShown(true);
            return;
        }
        if (state.toLowerCase().trim() === 'hide') {
            setModalIsShown(false);
            return;
        }
    };

    return (
        <CartProvider>
            {modalIsShown && <Cart onCartClick={cartHandler} />}
            <Header onCartClick={cartHandler} />
            <Meals />
        </CartProvider>
    );
}

export default App;
