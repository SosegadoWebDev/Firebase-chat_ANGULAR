import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// Following the course, we has a problem when we recieve an error code

// SOLUTION 1
// import * as firebase from 'firebase/app';
// import 'firebase/auth';

// SOLUTION 2 - more similar to the course code
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { map } from 'rxjs/operators';

// Interface
import { Message } from './../interfaces/message.interfase';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private itemsCollection: AngularFirestoreCollection<Message>;
    public chats: Array<Message> = [];
    public userData: any = {};

    constructor(
        private afs: AngularFirestore,
        public fAuth: AngularFireAuth
    ) {
        this.fAuth.authState.subscribe(user => {
            console.log('user status: ', user);

            if (_.isNil(user)) {
                return false;
            }

            this.userData.name = user.displayName;
            this.userData.uid = user.uid;
        });
    }

    loadMessages() {
        this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));
        return this.itemsCollection.valueChanges()
            .pipe(
                map((messages: Array<Message>) => {
                    this.chats = [];
                    _.each(messages, message => {
                        this.chats.unshift(message);
                    });

                    return this.chats;
                })
            );
    }

    /**
     * @todo does not exist userId user until we have an authentication
     */
    addMessage(text: string): Promise<any> {
        const message: Message = {
            name: this.userData.name,
            message: text,
            date: new Date().getTime(),
            uid: this.userData.uid
        };

        return this.itemsCollection.add(message);
    }

    // CODE FOR SOLUTION 1

    // login() {
    //     firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // }
    // logout() {
    //     firebase.auth().signOut();
    // }

    // CODE FOR SOLUTION 2
    login(loginPlatform: string) {
        if (loginPlatform === 'google') {
            this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        } else if (loginPlatform === 'facebook') {
            this.fAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        }
    }

    logout() {
        this.userData = {};
        this.fAuth.auth.signOut();
    }
}
