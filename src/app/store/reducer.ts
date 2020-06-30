import { createReducer, on, Action } from '@ngrx/store';

import { IPostFilter } from '@albert/interfaces/IPostFilter';
import { setFilter, setFilterCategory, setFilterText } from '@albert/store/actions';

const initialState: IPostFilter = {
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

export function counterReducer(state: IPostFilter | undefined, action: Action) {
  return _counterReducer(state, action);
}
