import {combineReducers, ActionReducer} from '@ngrx/store';
import {compose} from '@ngrx/core';
import {localStorageSync} from 'ngrx-store-localstorage';
import {TreeReducer, TreeState} from './tree.reducer';

// Main app state
export interface AppState {
  tree: TreeState;
}

// Reducers for app state
const reducers = {
  tree: TreeReducer,
};
const reducerKeysToSave = Object.keys(reducers);

const productionReducer: ActionReducer<AppState> = compose(
  localStorageSync(reducerKeysToSave, true),
  combineReducers
)(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}