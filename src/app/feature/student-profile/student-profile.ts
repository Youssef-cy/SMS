import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentS } from '../../core/service/student-s';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: StudentS
  ) {}

  data = signal<any>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getdata(id);
  }

  getdata(id: number) {
    this.service.getProfile(id).subscribe({
      next: (res) => {
        const result = Array.isArray(res) ? res[0] : res;
        this.data.set(result);
      },
    });
  }
}