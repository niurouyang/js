import { Component } from '@angular/core';
import { AuthorsSevice } from './author.service';

@Component({
  selector: 'app-author',
  template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
        <li *ngFor = "let author of authors">
        {{ author }}
        </li>
    </ul>
`
})

export class AuthorComponent {
  title;

  getTitle(){
    return this.title;
  }

  authors;

  constructor(service: AuthorsSevice){
    this.authors = service.getAuthor();
    this.title = service.getAuthorNo()+" Authors";
  }
}
