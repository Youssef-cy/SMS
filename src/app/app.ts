import { Component } from '@angular/core';
import { Sidebar } from './layout/components/sidebar/sidebar';
import { Navbar } from './layout/components/navbar/navbar';
import { TopStudentsComponent } from './feature/top-students/top-students';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Navbar, TopStudentsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}