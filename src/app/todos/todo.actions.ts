import { createAction, props } from '@ngrx/store';

export const create = createAction(
  '[TODO] Create Todo',
  props<{ text: string }>()
);

export const toggle = createAction(
  '[TODO] Toggle Todo',
  props<{ id: number }>()
);

export const update = createAction(
  '[TODO] Update Todo',
  props<{ id: number, text: string }>()
);

export const remove = createAction(
  '[TODO] Remove Todo',
  props<{ id: number }>()
);

export const toggleAll = createAction(
  '[TODO] ToggleAll Todo',
  props<{ completed: boolean }>()
);

export const clear = createAction(
  '[TODO] Clear Todo',
)
