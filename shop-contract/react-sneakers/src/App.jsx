import React, { useEffect, useState, useContext } from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import AppContext from './context';

import { ethers } from 'ethers';

function App() {
  const [contract, setContract] = useState(null);
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const items = [
      { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12990, imageUrl: '/img/sneakers/1.jpg' },
      { title: 'Мужские Кроссовки Nike Air Max 270', price: 15960, imageUrl: '/img/sneakers/4.jpg' },
      { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, imageUrl: '/img/sneakers/3.jpg' },
      { title: 'Мужские Кроссовки Nike Terminator Low', price: 11200, imageUrl: '/img/sneakers/5.png' },
    ];
  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org');
    const address = '0xf8774227a23971e58b40206353d950FbBf469eC2';
    const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"string","name":"imageUrl","type":"string"}],"name":"ItemAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"string","name":"title","type":"string"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"string","name":"imageUrl","type":"string"}],"name":"ItemRemoved","type":"event"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"},{"internalType":"string","name":"_imageUrl","type":"string"}],"name":"addItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCartItemCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"removeItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userCart","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"string","name":"imageUrl","type":"string"}],"stateMutability":"view","type":"function"}]
    const contract = new ethers.Contract(address, abi, provider);
    setContract(contract);

    const mask = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      return signer;
    };

    mask();

  }, [setContract]);


  const mask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider.getSigner();
    return signer;
  };

  

  const callRemoveItemMethod = async (item) => {
    try {
      // Ensure the item is not null or undefined
      if (!item) {
        console.error('Invalid item for removing.');
        return;
      }
  
      // Get the item index
      const index = cartItems.findIndex((cartItem) => cartItem === item);
  
      // Remove the item from the local state
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);
  
      // Call the smart contract method to remove the item
      const signer = await mask();
      const contractWithSigner = contract.connect(signer);
      await contractWithSigner.removeItem(index);
  
      console.log('Item removed successfully:', item);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };
  
  
  const callAddItemMethod = async (title, price, imageUrl) => {
    try {
      // Call the smart contract method to add the item
      const signer = await mask();
      const contractWithSigner = contract.connect(signer);
      await contractWithSigner.addItem(title, price, imageUrl);
  
      // Update the local state with the added item
      setCartItems((prevCartItems) => [...prevCartItems, { title, price, imageUrl }]);
  
      console.log('Item added successfully:', { title, price, imageUrl });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };




  return (
    <AppContext.Provider value={{ cartItems, setCartItems }}>
    <div className="wrapper">
      {cartOpened ? (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={callRemoveItemMethod}
        />
      ) : null}
      <Header onClickCart={() => setCartOpened(true)} />
        <div className="content">
          <div className="content-header">
            <h1>Все кроссовки</h1>
            <div className="search-block">
              <img src="/img/search.svg" alt="search" />
              <input placeholder="Поиск..." />
            </div>
          </div>
          <div className="wrapper-card">
            {items.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onPlus={() => callAddItemMethod(item.title, item.price, item.imageUrl)}
                added={cartItems.some((cartItem) => cartItem.title === item.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;