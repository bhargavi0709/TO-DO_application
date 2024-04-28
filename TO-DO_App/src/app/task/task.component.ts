import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  editTaskValue!: string
  activeEditIndex: boolean[] = [false];
  arrdata: any = [];
  title = 'task';
  id: any;
  baseURL = 'http://localhost:3000/'
  taskForm!: FormGroup;
  isSubmitted = false;
  taskList!: any[];

  newtaskname: string = "";


  constructor(
    private httpclient: HttpClient
  ) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      'name': new FormControl(null),
      'is_active': new FormControl(1)
    });

    let email = localStorage.getItem("session_email")
    this.httpclient.post(this.baseURL, { email }).subscribe((resp: any) => {

      for (const item in resp) {

        this.arrdata.push(resp[item]);

      }

    });
  }

  /**
   *  handle the edit button
   */
  edit(id: number): void {

    this.activeEditIndex[id] = !this.activeEditIndex[id];
    this.editTaskValue = this.arrdata[id].taskname
    this.newtaskname = this.arrdata[id].taskname
    console.log("newData => ", this.newtaskname);

  }
  /**
 *  handle when delete button is clicked
 */
  delete(id: number) {

    let newid = this.arrdata[id].id;
    this.httpclient.post(this.baseURL + 'delete', { newid }).subscribe((res) => {
      console.log("del");
    })
    this.arrdata.splice(id, 1);

  }

  /**
   *  to save the new taskname
   */

  saveEditedPost(id: number) {
    // console.log("Data => ",this.newtaskname);
    const obj = {
      id: this.arrdata[id].id,
      editedtaskname: this.newtaskname
    }

    this.httpclient.post(this.baseURL + 'edit', obj).subscribe((res) => {

      console.log("new taskname sent to db");

    })
    this.activeEditIndex[id] = !this.activeEditIndex[id];
    this.arrdata[id].taskname = this.newtaskname;
    this.newtaskname = "";
  }
  /**
   *
   * function to set current status of task
   */
  success(id: number) {

    let completedTask = this.arrdata[id].id;
    this.httpclient.post(this.baseURL + 'success', { completedTask }).subscribe(() => {
      console.log('updated');
    })
    console.log("ID", this.arrdata[id])
    this.arrdata[id].is_active = "completed";
    console.log('done');
  }

  /**
   *  to handle submit button
   */
  onSubmit() {

    var currentdate = new Date();
    var datetime = currentdate.getDay() + "/" + currentdate.getMonth()
      + "/" + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log(typeof (datetime));

    let entry = this.taskForm.value.name;
    const data = {
      id: datetime,
      taskname: entry,
      email: localStorage.getItem("session_email"),
      is_active: "pending"
    }
    this.arrdata.push(data);
    //sending data to server
    this.httpclient.post(this.baseURL + 'task', data).subscribe((resp) => {

      console.log("data sent to backend!", resp);
    })
  }

}
