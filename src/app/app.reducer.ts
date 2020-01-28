import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromUi from "./shared/ui.reducer";

export interface State {
  ui: fromUi.State;
}

// grouping all the reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};

// selectors are helper functions that helps us to pull information from our state.
export const getUiState = createFeatureSelector<fromUi.State>("ui");

export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
