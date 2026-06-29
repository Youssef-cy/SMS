import { Component } from '@angular/core';
import { signal } from '@angular/core';


@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
selectedGrade = 'all';
selectedClass = '3-B';
onViewTypeChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedGrade = target.value;
}

onClassChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  this.selectedClass = target.value;
}
}
