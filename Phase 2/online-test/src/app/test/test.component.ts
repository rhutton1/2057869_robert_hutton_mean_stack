import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from '../test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  myQuestions:Array<Test> = [];
  correctCount:number = 0;
  msg:string = "";

  myTest:FormGroup;
  constructor(public testSer:TestService, public form:FormBuilder) {
    this.myTest = form.group({})
  }

  ngOnInit(): void {
    this.testSer.readQuestions().subscribe(result=> {
      for(let q of result){
        this.myTest.addControl(q.question, this.form.control("",[Validators.required]));
        this.myQuestions.push(q)
      }
    })
  }

  submit(){
    let ref:Array<string> = Object.values(this.myTest.value); 
    for(let i=0; i < this.myQuestions.length; i++) {
      console.log(this.myQuestions[i]);
      if(this.myQuestions[i].correctAns == ref[i]){
        document.getElementById(ref[i])!.setAttribute("style", "color: green;");
        this.correctCount++;
      }else{
        console.log(ref[i]);
        document.getElementById(ref[i])!.setAttribute("style", "color: red;");
        document.getElementById(this.myQuestions[i].correctAns)!.setAttribute("style", "color: green;");
      }
    }
    this.myTest.disable();
    if (this.correctCount > 6){
      this.msg = `You passed with a score of ${this.correctCount}/10. \n Refresh to try again`;
      alert(this.msg);
      }else{
      this.msg = `You failed with a score of ${this.correctCount}/10. \n Refresh to try again`;
      alert(this.msg)
    }
  }
}
