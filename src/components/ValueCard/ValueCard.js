import React, { useState } from "react";
import { Fragment } from "react";
import { BsFillPencilFill, BsXCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../../actions/cardActions";
import "./value-card.css";
const ValueCard = (props) => {
  const {
    cardId,
    item: { value, id },
  } = props;
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const onEdit = () => {
    setEditable(true);
  };

  const onEditItem = (e) => {
    if (e.key === "Enter") {
      const obj = {
        cardId,
        id,
        value: e.target.value,
      };
      dispatch(editItem(obj));
      setEditable(false);
    } else return;
  };
  const onDeleteItem = () => {
    const obj = {
      cardId,
      id,
    };
    dispatch(removeItem(obj));
  };

  return (
    <div className="value-card">
      {editable ? (
        <Fragment>
          <input
            className="text-input"
            type="text"
            name="item"
            data-testid="task-editable"
            defaultValue={value}
            placeholder="Enter task..."
            onKeyDown={onEditItem}
          />
        </Fragment>
      ) : (
        <Fragment>
          <span className="text-display">{value}</span>
          <span className="edit" onClick={onEdit} data-testid="edit-task">
            <BsFillPencilFill />
          </span>
          <span
            className="delete"
            onClick={onDeleteItem}
            data-testid="delete-item"
          >
            <BsXCircleFill />
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default ValueCard;
