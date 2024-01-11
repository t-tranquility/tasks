// tasks
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import axios from 'axios';
import AppContext from './context';

// Memoizing the Card component to optimize rendering
const MemoizedCard = React.memo(Card);

function App() {
  // State for managing the cart visibility
  const [cartOpened, setCartOpened] = React.useState(false);
  // State for storing cart items
  const [cartItems, setCartItems] = React.useState([]);
  // State for storing all available items
  const [items, setItems] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetching items and cart items from the server on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items?search=${encodeURIComponent(searchQuery)}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchItems();
    fetchCartItems();
  }, [searchQuery]);

  // Function to add an item to the cart
  const onAddToCart = async (obj) => {
    // Sending a POST request to add the item to the cart on the server
    await axios.post('http://localhost:5000/cart', obj);
    // Updating the cart items locally
    setCartItems((prev) => [...prev, obj]);
  };

  // Function to remove an item from the cart
  const onRemoveItem = async (_id) => {
    console.log('_id for removal:', _id);
    // Sending a DELETE request to remove the item from the cart on the server
    await axios.delete(`http://localhost:5000/cart/${_id}`);
    // Updating the cart items locally
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

   // Function to increase the quantity of an item in the cart
   const onIncreaseItem = async (_id) => {
    // Sending a PUT request to increase the quantity on the server
    await axios.put(`http://localhost:5000/cart/increase/${_id}`);
    // Updating the cart items locally
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

   // Function to decrease the quantity of an item in the cart
   const onDecreaseItem = async (_id) => {
    // Sending a PUT request to decrease the quantity on the server
    await axios.put(`http://localhost:5000/cart/decrease/${_id}`);
    // Updating the cart items locally
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };



  return (
    // Providing the cartItems state to components using AppContext.Provider
    <AppContext.Provider value={{ cartItems, setCartItems }}>
      <div className="wrapper"> 
        {/* Rendering the Drawer component if cartOpened state is true */}
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          onIncrease={onIncreaseItem}
          onDecrease={onDecreaseItem}
        />
      ) : null}
        {/* Rendering the Header component with onClickCart handler */}
        <Header onClickCart={() => setCartOpened(true)} />

        <div className="content">
          <div className="content-header">
            <h1>Все кроссовки</h1>
            <div className="search-block">
              <img src="/img/search.svg" alt="search" />
              <input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="wrapper-card">
            {/* Mapping through items and rendering MemoizedCard component for each */}
            {items.map((item, index) => (
              <MemoizedCard
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={(obj) => onAddToCart(obj)}
                added={cartItems.some((cartItem) => cartItem._id === item._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
