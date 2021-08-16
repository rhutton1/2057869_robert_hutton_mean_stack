import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  
  signUpFlag:boolean = false;
  contactFlag:boolean = false;
  loginFlag:boolean = true;
  showTableFlag:boolean = false;

  userFname:string = "";
  userLname:string = "";
  member_user:string = "";
  member_pass:string = "";
  er_msg:string = "";

  contactStorage:{name:string, phoneNum:number}[] = [];

  loginRef = new FormGroup({
    user:new FormControl("",[Validators.required]),
    pass:new FormControl("", [Validators.required])
  });

  signUpRef = new FormGroup({
    fname:new FormControl("",[Validators.required]),
    lname:new FormControl("",[Validators.required]),
    newUser:new FormControl("",[Validators.required]),
    newPass:new FormControl("",[Validators.required])
  })

  contactList = new FormGroup({
    contactName:new FormControl("",[Validators.required]),
    contactPhoneNumber:new FormControl("",[Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  checkUser(){
    let login = this.loginRef.value;
    if(login.user == this.member_user && login.pass == this.member_pass){
      this.contactFlag = true;
      this.loginFlag = false;
      this.er_msg = "";
    }else{
      this.er_msg = "Login Failed ... Please try again"
    }
    this.loginRef.reset()
  }

  switchToSignUp(){
    if(this.signUpFlag){
      this.signUpFlag = false;
      this.loginFlag = true;
    }else{
      this.signUpFlag = true;
      this.loginFlag = false;
    }
  }

  signUpNewUser(){
    let signUp = this.signUpRef.value;
    this.userFname = signUp.fname;
    this.userLname = signUp.lname;
    this.member_user = signUp.newUser;
    this.member_pass = signUp.newPass;
    this.er_msg = "";
  }

  saveContact(){
    let contact = this.contactList.value;
    this.contactStorage.push({ name:contact.contactName, phoneNum:contact.contactPhoneNumber });
    console.log(this.contactStorage);
  }

  showContactTable(){
    this.showTableFlag = true;
  }

} 
