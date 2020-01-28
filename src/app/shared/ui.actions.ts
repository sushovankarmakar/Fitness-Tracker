import { Action } from "@ngrx/store";

export const START_LOADING = "[UI] Start Loading"; // [reducer name]
export const STOP_LOADING = "[UI] Stop Loading";

// exporting the action creators as classes
export class StartLoading implements Action {
  readonly type = START_LOADING;
}
export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

// exporting a custom type
export type UIActions = StartLoading | StopLoading;
