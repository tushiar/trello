import React, { useCallback, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  dragNDrop,
  editTitle,
  removeCard,
} from "../../actions/cardActions";
import ValueCard from "../ValueCard/ValueCard";
import "./card.css";
const Card = (props) => {
  const { title = "", items = [], id } = props.card;
  console.log(props);
  const cards = useSelector((state) => state.mainCards.cards);
  const [editable, setEditable] = useState(false);

  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(removeCard({ id }));
  };

  const onAddItem = useCallback(() => {
    if (!inputRef.current.value) return;
    const obj = {
      cardId: id,
      item: { value: inputRef.current.value },
    };
    dispatch(addItem(obj));
    inputRef.current.value = "";
  },[]);

  const onEditTitle = (e) => {
    if (e.key === "Enter") {
      const obj = {
        id,
        title: e.target.value,
      };
      dispatch(editTitle(obj));
      setEditable(false);
    } else return;
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    const transferredItem = JSON.parse(e.dataTransfer.getData("items"));
    const obj = {
      sourceCardId: transferredItem.cardID,
      destinationCardId: id,
      itemId: transferredItem.itemID,
    };
    dispatch(dragNDrop(obj));
  };
  const onDragStart = (ev, items) => {
    ev.dataTransfer.setData("items", JSON.stringify(items));
  };
  return (
    <div className="card-container">
      {editable ? (
        <input
          className="text-input"
          type="text"
          name="title"
          id="title"
          ref={titleRef}
          placeholder="Enter title..."
          defaultValue={title}
          onKeyDown={onEditTitle}
        />
      ) : (
        <div className="card-title" onClick={() => setEditable(true)}>
          {title}
        </div>
      )}

      <hr />
      <div className="card-body" onDragOver={onDragOver} onDrop={onDrop}>
        {items.map((item) => (
          <div
            draggable
            onDragStart={(e) => onDragStart(e, { itemID: item.id, cardID: id })}
            key={item.id}
          >
            <ValueCard item={item} cardId={id} />
          </div>
        ))}
        <div className="input-container">
          <input
            className="text-input"
            type="text"
            name="task"
            id="task"
            placeholder="Enter task..."
            ref={inputRef}
            onKeyDown={(e) => (e.key === "Enter" ? onAddItem() : null)}
          />
          <span className="btn-add-item" onClick={onAddItem}>
            <BsPlusLg />
          </span>
        </div>
        <hr />
      </div>
      <div className="btn-container">
        <button
          className="btn-delete"
          data-test-id={"btn-delete-" + id}
          onClick={onDelete}
          disabled={cards.length === 1}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default React.memo(Card);
