import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartValue = {
    items: [],
    itemsNumber: 0,
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItemsNumber = state.itemsNumber + action.item.amount;
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            itemsNumber: updatedItemsNumber,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'REMOVE') {
        const updatedItemsNumber = state.itemsNumber - 1;

        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            itemsNumber: updatedItemsNumber,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'DELETE') {
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItemsNumber = state.itemsNumber - existingCartItem.amount;
        const updatedTotalAmount =
            state.totalAmount -
            existingCartItem.price * existingCartItem.amount;
        let updatedItems = state.items.filter(item => item.id !== action.id);

        return {
            items: updatedItems,
            itemsNumber: updatedItemsNumber,
            totalAmount: updatedTotalAmount,
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartValue;
    }
    return defaultCartValue;
};

const CartProvider = props => {
    const [cartState, setCartState] = useReducer(cartReducer, defaultCartValue);

    const addItemHandler = item => {
        setCartState({
            type: 'ADD',
            item,
        });
    };

    const removeItemHandler = id => {
        setCartState({ type: 'REMOVE', id });
    };

    const deleteItemHandler = id => {
        setCartState({ type: 'DELETE', id });
    };

    const clearCartHandler = () => {
        setCartState({ type: 'CLEAR' });
    };

    const cartCtx = {
        items: cartState.items,
        itemsNumber: cartState.itemsNumber,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        deleteItem: deleteItemHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartCtx}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
