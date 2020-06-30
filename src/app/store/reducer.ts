import { createReducer, on, Action } from '@ngrx/store';
import { setFilter, setFilterCategory, setFilterText } from './actions';
import { IFilter } from '@interfaces/IFilter';

const initialState: IFilter = {
  categoryId: 0,
  searchText: ''
};

const _counterReducer = createReducer(initialState,
  on(setFilter, (state, props) => {
    return state;
  }),
  on(setFilterCategory, (state, props) => {
    return {categoryId : props.categoryId, searchText: state.searchText };
  }),
  on(setFilterText, (state, props) => {
    return {categoryId : state.categoryId, searchText: props.searchText };
  })  
);

export function counterReducer(state: IFilter | undefined, action: Action) {
  return _counterReducer(state, action);
}
