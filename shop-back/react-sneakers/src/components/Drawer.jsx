import React, {useState } from 'react';
import AppContext from '../context';

/*
 * Drawer component displays the cart items in a sidebar.
 * @param {Function} onClose - Function to close the drawer.
 * @param {Function} onRemove - Function to remove an item from the drawer.
 * @param {Function} onIncrease - Function to increase the quantity of an item in the drawer.
 * @param {Function} onDecrease - Function to decrease the quantity of an item in the drawer.
 * @param {Array} items - Array of items in the drawer.
 */
function Drawer({  onClose, onRemove, onIncrease, onDecrease, onClearCart, items = []  }) {
  /*Accessing the cartItems from the global context using useContext.*/
  const { cartItems } = React.useContext(AppContext);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    deliveryAddress: '',
    contactPhone: '',
  });

  /* Calculating the total price of items in the cart using reduce.*/
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);


  const handleOrderSubmit = () => {
    const { name, cardNumber, deliveryAddress, contactPhone } = formData;
  
    // Handle order submission logic here
    console.log('Order submitted:', { name, cardNumber, deliveryAddress, contactPhone });
  
    // Clear the cart
    onClearCart();
  
    // Close the drawer and reset the form data
    onClose();
    setShowOrderForm(false);
    setFormData({
      name: '',
      cardNumber: '',
      deliveryAddress: '',
      contactPhone: '',
    });
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <div className="drawerMain">
          <h2>
            Корзина
            <img
              onClick={onClose}
              className="removeBtn"
              src="/img/btn-remove.svg"
              alt="remove"
            />
          </h2>

          {/* Conditional rendering based on whether items are in the cart */}
          {showOrderForm ? (
            <div className="orderForm">
              <div>
                <label htmlFor="name">Имя:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="cardNumber">Номер карточки:</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="deliveryAddress">Адрес доставки:</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="contactPhone">Контактный телефон:</label>
                <input
                  type="text"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                />
              </div>

              <button className="greenButton" onClick={handleOrderSubmit}>
                Подтвердить заказ
              </button>
            </div>
          ) : items.length > 0 ? (
            <div>
              <div className="items">

                {items.map((obj) => (
                  <div className="cartItem" key={obj._id}>
                    <div
                      style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="item-background"
                    ></div>
                    <div className="cart-info">
                      <p>{obj.title}</p>
                      <strong>{obj.price * obj.quantity} руб.</strong>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => onDecrease(obj._id)}>-</button>
                      <span>{obj.quantity}</span>
                      <button onClick={() => onIncrease(obj._id)}>+</button>
                    </div>
                    <img
                      onClick={() => onRemove(obj._id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                ))}
              </div>

              {/* Total price block */}
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <strong>{totalPrice} руб.</strong>
                  </li>
                </ul>
                <button className="greenButton" onClick={() => setShowOrderForm(true)}>
                  Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          ) : (
            /* Displayed when the cart is empty */
            <div className="emptyCart">
              <img width={120} height={120} src="/img/box.png" alt="" />
              <h2>Корзина пустая</h2>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
