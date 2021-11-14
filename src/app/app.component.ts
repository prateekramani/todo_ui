import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BackendApiService } from 'src/services/backend-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todo-frontend';
  todo = [""];
  done = [""];
  constructor(private backendservice : BackendApiService,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.backendservice.getList().subscribe((res: any)=>{
 
      this.todo = res[0].todo_list
      this.done = res[0].done_list 
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  save(){
    let body  = {todo_list : this.todo , done_list : this.done}
    this.backendservice.postList(body).subscribe((res : any)=>{
      this._snackBar.open(res.message , res.status);
      this
    })
    
  }

  reset(){
    this._snackBar.open("Data Reset Successful !!");
    this.ngOnInit()
  }

}
