import React, { useContext, useEffect } from 'react';
import styles from './Card.module.scss';
import AppContext from '../../context';

/**
 * Card functional component declaration.
 * @param {Object} props - Props passed to the Card component.
 * @param {string} imageUrl - URL of the image for the card.
 * @param {string} title - Title of the product.
 * @param {number} price - Price of the product.
 * @param {Function} onPlus - Callback function for the add-to-cart action.
 * @param {boolean} added - Flag indicating whether the product is already in the cart.
 */
function Card({ title, price, imageUrl, onPlus, added, mask, contract  }) {
  const { setCartItems } = useContext(AppContext);
  /* State to manage the 'isAdded' flag, indicating whether the product is added to the cart. */
  const [isAdded, setIsAdded] = React.useState(added);
  useEffect(() => {
    setIsAdded(added);
  }, [added]);


  const handleAddToCart = async () => {
    try {
      const signer = await mask();
      const contractWithSigner = contract.connect(signer);
      await contractWithSigner.addItem(title, price, imageUrl);
      setCartItems((prevCartItems) => [...prevCartItems, { title, price, imageUrl }]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

    /* Click event handler for the 'Add to Cart' button.*/
    const onClickPlus = () => {
      onPlus({ title, price, imageUrl });
      setIsAdded(true);
      handleAddToCart(); // Вызываем функцию добавления в корзину при нажатии кнопки
    };


  return (
    <div className={styles.card}>
      <img className={styles.favourite} src="/img/btn-unliked.svg" alt="unliked" />
      <img width={133} height={112} src={imageUrl} alt="" />
      <h5>{title}</h5>
      <div className={styles.cardBottom}>
        <div className={styles.cardPrice}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <button className={styles.buttonPlus} onClick={onClickPlus}>
        <img
            onClick={handleAddToCart}
            src={isAdded ? "/img/btn-plused.svg" : "/img/btn-unplused.svg"}
            alt="plus"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
