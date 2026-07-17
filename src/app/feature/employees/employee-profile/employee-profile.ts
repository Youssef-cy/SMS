import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../../core/service/worker-service';

@Component({
  selector: 'app-employee-profile',
  imports: [CommonModule],
  templateUrl: './employee-profile.html',
  styleUrl: './employee-profile.css',
})
export class EmployeeProfile implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: WorkerService
  ) {}

  data = signal<any>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData(id);
  }

  getData(id: number) {
  this.service.getProfile(id).subscribe({
    next: (res) => {
      const result = Array.isArray(res) ? res[0] : res;
      this.data.set(result);
    },
    error: (err) => {
      // Handle error
    }
  });
}

  // بيرجع الـ user سواء كان جوا teacher.user أو مباشر
  getUser(profile: any) {
    return profile?.teacher?.user ?? profile;
  }

  // بيحدد هل الداتا دي "معلم/موظف" (فيها teacher) ولا "يوزر مباشر" زي الطالب
  isTeacherType(profile: any): boolean {
    return !!profile?.teacher;
  }

  getInitials(profile: any): string {
    const user = this.getUser(profile);
    const first = user?.firstName?.charAt(0) ?? '';
    const last = user?.lastName?.charAt(0) ?? '';
    return (first + last).toUpperCase();
  }
}