import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  displayedColumns:string[] = ['id', 'name', 'task', 'deadline'];
  flag:boolean = false;

  taskStorage:{
    tsk_id:number,
    tsk_name:string,
    tsk_task:string,
    tsk_deadline:string}[] = [];

  todoRef = new FormGroup({
    id:new FormControl(),
    name:new FormControl(),
    task:new FormControl(),
    deadline:new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatTable) table?: MatTable<any>;
  addTask(){
    let new_todo = this.todoRef.value;
    this.taskStorage.push({tsk_id:new_todo.id, tsk_name:new_todo.name, tsk_task:new_todo.task, tsk_deadline:new_todo.deadline});
    this.flag = true;
    this.table?.renderRows();
  }



}
