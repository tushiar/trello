import React from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "./actions/cardActions";

const Home = () => {
  const cards = useSelector((state) => state.mainCards.cards);
  const dispatch = useDispatch();

  const onAddCardClick = () => {
    const obj = {
      title: "Edit heading",
    };
    dispatch(addCard(obj));
  };
  return (
    <div className="app">
      <Header />
      <div className="container">
        {cards.map((card, idx) => (
          <Card card={card} key={idx} />
        ))}

        <div className="plus-container" data-testid="add-btn" onClick={onAddCardClick}>
          <BsFillPlusCircleFill />
        </div>
      </div>
    </div>
  );
};

export default Home;
