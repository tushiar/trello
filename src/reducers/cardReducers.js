import {
  ADD_CARD,
  ADD_ITEM,
  DROP_DRAG,
  EDIT_ITEM,
  EDIT_TITLE,
  REMOVE_CARD,
  REMOVE_ITEM,
} from "../constants";
const initialState = {
  cards: [
    {
      id: 1,
      title: "Edit heading",
      items: [{ id: 1, value: "This is a sample card" }],
    },
  ],
};
function idCreator() {
  return Math.floor(Math.random() * 1000000);
}

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.items
    }
  })
}
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARD: {
      payload["id"] = idCreator();
      payload["items"] = [];
      const updatedCards = [...state.cards];
      updatedCards.push(payload);
      return {...state, cards: updatedCards };
    }

    case REMOVE_CARD: {
      const cards = [...state.cards];
      const updatedCards = cards.filter((card) => card.id !== payload.id);
      return {...state, cards: updatedCards };
    }

    case ADD_ITEM: {
      payload.item["id"] = idCreator();
      const cards = [...state.cards];
      const currentCardIndex = cards.findIndex(
        (card) => card.id === payload.cardId
      );
      // console.log(payload, cards[currentCardIndex].items)
      // const updatedItems = [...cards[currentCardIndex].items]
      //  updatedItems.push(payload.item)
      cards[currentCardIndex].items.push(payload.item);
      // const updatedCards = updateObjectInArray(cards, {index:currentCardIndex, items: updatedItems})
      return { ...state, cards};
    }

    case EDIT_TITLE: {
      const cards = [...state.cards];
      const currentCardIndex = cards.findIndex(
        (card) => card.id === payload.id
      );
      cards[currentCardIndex].title = payload.title;
      return { cards };
    }
    case EDIT_ITEM: {
      const cards = [...state.cards];
      const currentCardIndex = cards.findIndex(
        (card) => card.id === payload.cardId
      );
      const itemIndex = cards[currentCardIndex].items.findIndex(
        (item) => item.id === payload.id
      );
      cards[currentCardIndex].items[itemIndex].value = payload.value;
      return { cards };
    }

    case REMOVE_ITEM: {
      const cards = [...state.cards];
      const currentCardIndex = cards.findIndex(
        (card) => card.id === payload.cardId
      );
      cards[currentCardIndex].items = cards[currentCardIndex].items.filter(
        (item) => item.id !== payload.id
      );
      return { cards };
    }
    case DROP_DRAG: {
      const cards = [...state.cards];
      const sourceCardIndex = cards.findIndex(
        (card) => card.id === payload.sourceCardId
      );
      const element = cards[sourceCardIndex].items.find(
        (item) => item.id === payload.itemId
      );
      cards[sourceCardIndex].items = cards[sourceCardIndex].items.filter(
        (item) => item.id !== payload.itemId
      );
      const destCardIndex = cards.findIndex(
        (card) => card.id === payload.destinationCardId
      );
      cards[destCardIndex].items.push(element);
      return { cards };
    }
    default:
      return state;
  }
};
