import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-students',
  templateUrl: './top-students.html',
  styleUrls: ['./top-students.css']
})
export class TopStudentsComponent implements OnInit {
    topThree = [
    { rank: '2nd', name: 'Raghad Mostafa', grade: 'Grade 12', score: 95, colorClass: 'silver-card' },
    { rank: '1st', name: 'Salma Tamer', grade: 'Grade 12', score: 98, colorClass: 'gold-card' },
    { rank: '3rd', name: 'Farah Hussein', grade: 'Grade 12', score: 92, colorClass: 'bronze-card' }
  ];
  studentsList = [
    { rank: 1, initials: 'ST', name: 'Salma Tamer', grade: 'Grade 12', score: 98, status: 'Excellent', statusClass: 'status-excellent' },
    { rank: 2, initials: 'RM', name: 'Raghad Mostafa', grade: 'Grade 11', score: 92, status: 'Excellent', statusClass: 'status-excellent' },
    { rank: 3, initials: 'FH', name: 'Farah Hussein', grade: 'Grade 10', score: 90, status: 'Excellent', statusClass: 'status-excellent' },
    { rank: 4, initials: 'JM', name: 'Jana Mohammed', grade: 'Grade 12', score: 88, status: 'High pass', statusClass: 'status-highpass' },
    { rank: 5, initials: 'FM', name: 'Fatma El-zahraa Mohamed', grade: 'Grade 12', score: 85, status: 'High Pass', statusClass: 'status-highpass' },
    { rank: 6, initials: 'BA', name: 'Basmala Ashraf', grade: 'Grade 11', score: 82, status: 'High pass', statusClass: 'status-highpass' }
  ];

  constructor() { }

  ngOnInit(): void { }
}