import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Recipe Book';

  ngOnInit(): void {
    this.initializeFirebase();
  }

  private initializeFirebase(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDqCOs8-sP-g_ANPQqjUF1_5PhTQt-jWOk',
      authDomain: 'https://recipe-book-6c065.firebaseio.com'
    })
  }
}
