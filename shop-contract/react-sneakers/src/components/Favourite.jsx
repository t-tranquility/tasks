import Card from "./Card";
import { Link } from "react-router-dom";
function Favourite() {
  return (
    <>
      <div className="contentFavourite">
        <div className="contentHeader">
          <Link to="/">
            <img src="/img/backBtn.svg" alt="back" />
          </Link>
          <h1>Избранное</h1>
        </div>
        <Card />
      </div>
    </>
  );
}

export default Favourite;
