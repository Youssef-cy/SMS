import { Component, computed, OnInit, signal } from '@angular/core';
import { AddBtn } from "../../shared/add-btn/add-btn";
import { Notification } from '../../core/service/notification';
import { NotificationI } from '../../core/model/notification-i';
import { MatDialog } from '@angular/material/dialog';
import { CreateNotificationsComponent } from '../add-notification/add-notification';

@Component({
  selector: 'app-notifications',
  imports: [AddBtn],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {

  constructor(private content: Notification,private dilog:MatDialog) {}

  data = signal<NotificationI[]>([]);
  search = signal('');

  filteredNotifications = computed(() => {

    const keyword = this.search().toLowerCase().trim();

    if (!keyword) return this.data();

    return this.data().filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.message.toLowerCase().includes(keyword) ||
      item.priority.toLowerCase().includes(keyword) ||
      item.type.toLowerCase().includes(keyword)
    );

  });

  ngOnInit(): void {
    this.getAllNotification();
  }

  getAllNotification() {
    this.content.getAllNotification().subscribe({
      next: (data) => this.data.set(data),
      error: (err) => console.log(err)
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
  }


  openDialog(){
        this.dilog.open(CreateNotificationsComponent,{
          width:'500px'
        })
      }


}