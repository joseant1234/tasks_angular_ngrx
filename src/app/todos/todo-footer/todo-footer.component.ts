import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  currentFilter: actions.validFilters = 'all';
  filters: actions.validFilters[] = ['all', 'completed', 'pendings'];
  pendings = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filter').subscribe(filter => {
    //   this.currentFilter = filter;
    // });
    this.store.subscribe(state => {
      this.currentFilter = state.filter;
      this.pendings = state.todos.filter(todo => !todo.completed).length;
    });
  }

  selectFilter(filter: actions.validFilters): void {
    this.store.dispatch(actions.setFilter({ filter }));
  }

}
