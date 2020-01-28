import { UIActions, START_LOADING, STOP_LOADING } from "./ui.actions";

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

// we dispatches actions to change the store, we don't do it directly
//reducer takes old state and return a new state
export function uiReducer(state = initialState, action: UIActions) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => {
  return state.isLoading;
};
