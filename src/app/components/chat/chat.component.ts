import { Message } from './../../interfaces/message.interfase';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styles: []
})
export class ChatComponent implements OnInit {

    message = '';
    element: HTMLElement;

    // ViewChild example, this isnt used in the application
    @ViewChild('messageInputRef', { static: true }) inputElement: ElementRef;

    constructor(
        public chatService: ChatService
    ) {
        this.chatService.loadMessages().subscribe((chats: Array<Message>) => {
            console.log(chats);
            setTimeout(() => {
                this.element.scrollTop = this.element.scrollHeight;
            }, 100);
        });
    }

    ngOnInit(): void {
        this.element = document.getElementById('app-message');
    }

    onSendMessage() {
        if (this.message.length === 0) {
            return;
        }

        this.chatService.addMessage(this.message)
            .then()
            .catch(err => console.log('Error al enviar', err));

        this.message = '';
    }
}
