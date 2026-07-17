import { Component, computed, OnInit, signal } from '@angular/core';
import { MaterialS } from '../../core/service/material-s';
import { MaterialI } from '../../core/model/material-i';
import { TopBanner } from "./components/top-banner/top-banner";
import swal from 'sweetalert2';

@Component({
  selector: 'app-materials',
  imports: [TopBanner],
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

  updateMaterialContent(item: MaterialI) {
    swal.fire({
      title: 'Update Material',
      text: `Enter material link for ${item.courseName}`,
      input: 'text',
      inputPlaceholder: 'e.g. https://example.com/material.pdf',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'Please enter a valid material link or name!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.content.updateMaterial(item.courseId, result.value).subscribe({
          next: () => {
            swal.fire('Updated!', 'Material has been successfully updated.', 'success');
            this.getMaterials();
          },
          error: (err) => {
            console.error(err);
            swal.fire('Error!', 'Failed to update material.', 'error');
          }
        });
      }
    });
  }
}