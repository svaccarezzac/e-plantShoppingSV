import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { removeItem, updateQuantity } from './redux/cartSlice'; // ✅ updated import


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
        const cost = parseFloat(item.cost.replace('$', ''));
        totalAmount += cost * item.quantity;
    });
    return totalAmount.toFixed(2); // Return total amount with 2 decimal places
  };

  const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(); // Call the function passed as prop to go back to shopping
  };



  const handleIncrement = (item) => {
    if (item.quantity < 99) { // Optional: limit max quantity to 99
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) { // Ensure quantity is at least 1
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        dispatch(removeItem({ name: item.name })); // Remove item if quantity is 1
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')); // Remove "$" from cost and convert to number
    return (cost * item.quantity).toFixed(2); // Return total cost as a string with 2 decimal points
  };

  //const handleCheckoutShopping = (e) => {
    //alert('Functionality to be added for future reference');
  //};

  const calculateTotalItems = () => {
    let totalItems = 0;
    cart.forEach(item => {
      totalItems += item.quantity; // Add up the quantity of each item
    });
    return totalItems;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Items in Cart: {calculateTotalItems()}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" 
                onClick={() => handleRemove(item)}>Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


