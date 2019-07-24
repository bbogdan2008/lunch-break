const initialState = {};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SOMETHING_NEW": { //TODO add first action
      return state; 
    }
    default:
      return state;
  }
}
