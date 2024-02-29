import { Component, OnInit } from '@angular/core';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'af-notification';
  message: any = null;

  constructor() { }

  ngOnInit(): void {
    this.checkNotificationSupport();
  }

  checkNotificationSupport() {
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else {
      this.requestNotificationPermission();
    }
  }

  requestNotificationPermission() {
    if (Notification.permission === 'granted') {
      this.registerToken();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.registerToken();
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }

  registerToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (currentToken) => {
        if (currentToken) {
          console.log('Token registered:', currentToken);
          this.listenForMessages();
        } else {
          console.log('No registration token available.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
      this.showNotification(payload);
    });
  }

  showNotification(payload: any) {
    const { title, body } = payload.notification;

    const notification = new Notification(title, { body });
    this.message = payload;

    notification.onclick = () => {
      console.log('Notification clicked');
    };
  }
}
