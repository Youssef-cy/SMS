import { Component, computed, OnInit, signal } from '@angular/core';
import { MaterialS } from '../../core/service/material-s';
import { MaterialI } from '../../core/model/material-i';

@Component({
  selector: 'app-materials',
  imports: [],
  templateUrl: './materials.html',
  styleUrl: './materials.css',
})
export class Materials implements OnInit {

  constructor(private content: MaterialS) {}

  data = signal<MaterialI[]>([]);
  searchText = signal('');

  filteredData = computed(() => {
    const search = this.searchText().trim().toLowerCase();

    if (!search) {
      return this.data();
    }

    return this.data().filter(item =>
      item.courseName.toLowerCase().includes(search)
    );
  });

  groupedMaterials = computed(() => {
    const groups: {
      [key: number]: {
        gradeId: number;
        gradeName: string;
        materials: MaterialI[];
      };
    } = {};

    for (const item of this.filteredData()) {
      if (!groups[item.gradeId]) {
        groups[item.gradeId] = {
          gradeId: item.gradeId,
          gradeName: item.gradeName,
          materials: []
        };
      }

      groups[item.gradeId].materials.push(item);
    }

    return Object.values(groups);
  });

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this.content.getMaterialsContent().subscribe({
      next: (data) => {
        this.data.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSearch(value: string) {
    this.searchText.set(value);
  }
}