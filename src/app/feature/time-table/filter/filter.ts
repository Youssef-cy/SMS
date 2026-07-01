import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'],
})
export class Filter {
  selectedGrade = 'all';
  selectedClass = '3-B';

  onViewTypeChange(event: Event): void {
    this.selectedGrade = (event.target as HTMLSelectElement).value;
  }

  onClassChange(event: Event): void {
    this.selectedClass = (event.target as HTMLSelectElement).value;
  }
}