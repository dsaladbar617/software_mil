import { useEffect, useContext } from "react";
import axios from "axios";
import CardList from "../UI/CardList";
import { ShopContext } from "../../ShopContext";

const ShopPage = () => {
  const { values, setters } = useContext(ShopContext);

  // Get all of the shop data from the database to populate a list of shop cards.
  useEffect(() => {
    axios.get("/api").then((res) => {
      setters.setShops(res.data);
    });
  }, []);

  return <CardList cards={values.shops} />;
};

export default ShopPage;
