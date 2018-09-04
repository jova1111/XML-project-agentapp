import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Message } from '../../model/Message';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUrl } from '../../model/ImageUrl';
import { Period } from '../../model/Period';
import { InboxService } from '../../services/inbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [ InboxService ]
})
export class MessageComponent implements OnInit {
  activatedRoute: ActivatedRoute;  
  private message : Message = new Message();
  private id: string;
 

  constructor(private inboxService: InboxService,activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
	this.inboxService = inboxService;
  }

   ngOnInit() {
		
		this.activatedRoute.paramMap.subscribe(params => {
		this.id = params.get('id');
		});
  }
  async sendMessage(){
	  await this.inboxService.sendMessage(this.message,this.id);
  }
	
}


