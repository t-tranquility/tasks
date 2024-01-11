import Card from "./Card";
import { Link } from "react-router-dom";
function Favourite() {
  const items = [
    { title: 'Банан "Смайл-фэйс" ОчЕнЬ уЛыБчИвЫй', price: 12, imageUrl: '/img/bananas/1.jpg' },
    { title: 'Банан "Чики ёу" ОчЕнЬ кЛаСсНыЕ', price: 11, imageUrl: '/img/bananas/2.jpg' },
    { title: 'Банан "Кавай" ОчЕнЬ мИлЫй', price: 12, imageUrl: '/img/bananas/3.jpg' },
    { title: 'Банан "Весильчак" ОчЕнЬ вЕсЕлЫй', price: 11, imageUrl: '/img/bananas/4.jpg' },
  ];
  return (
    <>
      <div className="contentFavourite">
        <div className="contentHeader">
          <Link to="/">
            <img src="/img/backBtn.svg" alt="back" />
          </Link>
          <h1>Бананы</h1>
        </div>
        <div className="wrapper-card">
        {items.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Favourite;
