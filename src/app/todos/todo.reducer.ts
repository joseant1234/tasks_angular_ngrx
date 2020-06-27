import { createReducer, on } from '@ngrx/store';
import { create, toggle, update } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('new task'),
  new Todo('review'),
  new Todo('deploy'),
];

const _todoReducer = createReducer(initialState,
  on(create, (state, { text }) => [...state, new Todo(text)]),
  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      } else {
        return todo;
      }
    });
  }),
  on(update, (state, { id, text }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        }
      } else {
        return todo;
      }
    });
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
