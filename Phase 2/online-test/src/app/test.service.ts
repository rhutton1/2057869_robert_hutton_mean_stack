import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Test } from './test.model'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public http:HttpClient) { }

  readQuestions():Observable<Test[]>{
    return this.http.get<Test[]>("/assets/questions.json")
  }
}
