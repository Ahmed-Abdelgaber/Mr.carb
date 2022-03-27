import React from 'react';

let CartContext = React.createContext({
    items: [],
    itemsNumber: 0,
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

export default CartContext;
