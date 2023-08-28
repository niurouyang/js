import { Component } from "@angular/core";
import { CoursesService } from "./course/course.service";

@Component({
    selector: 'courses',
    template: `
    <h2>{{ getTitle() }}</h2>
    <ul>
        <li *ngFor="let course of courses">
        {{ course }}
        </li>
    </ul>
    `

})
export class CoursesComponent{
    title = "List of courses"

    getTitle(){
        return this.title;
    }

    courses;

    constructor(service: CoursesService){
            this.courses = service.getCourses();
    }
}