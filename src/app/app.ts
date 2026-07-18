import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideNav } from "./layout/side-nav/side-nav";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNav],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('SMS');
  private router = inject(Router);

  showSideNav() {
    return this.router.url !== '/login';
  }
}