import React from 'react';
import AppContext from '../context';

/*
 * Drawer component displays the cart items in a sidebar.
 * @param {Function} onClose - Function to close the drawer.
 * @param {Function} onRemove - Function to remove an item from the drawer.
 * @param {Function} onIncrease - Function to increase the quantity of an item in the drawer.
 * @param {Function} onDecrease - Function to decrease the quantity of an item in the drawer.
 * @param {Array} items - Array of items in the drawer.
 */
function Drawer({ onClose, onRemove, items = [], contractData, mask, contract }) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const handleRemove = async (itemId) => {
    try {
      // Call the onRemove function passed as a prop
      onRemove(itemId);
  
      // You may want to get the removed item details from the items array
      const removedItem = items.find((item) => item.id === itemId);
  
      // Call the smart contract method to remove the item
      const signer = await mask();
      const contractWithSigner = contract.connect(signer);
      await contractWithSigner.removeItem(itemId);
  
      console.log('Item removed from the blockchain:', removedItem);
    } catch (error) {
      console.error('Error removing item from the blockchain:', error);
    }
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

          {items.length > 0 ? (
            <div>
              <div className="items">
                {items.map((obj) => (
                  <div className="cartItem" key={obj.id}>
                    {/* Используйте contractData для получения данных из блокчейна */}
                    <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="item-background"></div>
                    <div className="cart-info">
                      <p>{obj.title}</p>
                      <strong>{obj.price * obj.quantity} руб.</strong>
                    </div>
                    <img
                      onClick={() => handleRemove(obj)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                ))}
              </div>

              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <strong>{totalPrice} руб.</strong>
                  </li>
                </ul>
                <button className="greenButton">
                  Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          )  : (
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
