export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

// we dispatches actions to change the store, we don't do it directly
//reducer takes old state and return a new state
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        isLoading: true
      };
    case "STOP_LOADING":
      return {
        isLoading: false
      };
    default:
      return state;
  }
}
