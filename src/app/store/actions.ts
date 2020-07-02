import { createAction, props } from '@ngrx/store';

export const setFilter = createAction(
    '[Component] Set Filter',    
    props<{ categoryId: number; searchText: string }>());

export const setFilterCategory = createAction(
    '[Component] Set Filter Category',    
    props<{ categoryId: number }>());

export const setFilterText = createAction(
    '[Component] Set Filter Text',    
    props<{ searchText: string }>());
