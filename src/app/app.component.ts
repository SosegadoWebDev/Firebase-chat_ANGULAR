import { Component } from '@angular/core';
// import { Observable } from 'rxjs';

import { ChatService } from 'src/app/services/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'angular-firechat';
    // public chats: Observable<any[]>;

    constructor(
        public chatService: ChatService,
        firestore: AngularFirestore) {
        // this.chats = firestore.collection('chats').valueChanges(); // Observable
    }
}
