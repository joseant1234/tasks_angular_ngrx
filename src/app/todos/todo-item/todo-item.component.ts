import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  chkCompleted: FormControl;
  txtInput: FormControl;
  editing = false;

  @ViewChild('input') input: ElementRef;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);

    this.chkCompleted.valueChanges.subscribe(val => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    })
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      // this.input.nativeElement.focus();
      this.input.nativeElement.select();
    }, 1);
  }

  update() {
    this.editing = false;
    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.text) { return; }
    this.store.dispatch(
      actions.update({
        id: this.todo.id,
        text: this.txtInput.value,
      })
    )
  }

  remove() {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }

}
