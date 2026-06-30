import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar';
import { StudentsComponent } from './feature/students/students';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent, 
    StudentsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'ntg-school';
}