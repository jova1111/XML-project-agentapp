import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Message } from '../../model/Message';

import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUrl } from '../../model/ImageUrl';
import { Period } from '../../model/Period';
import { InboxService } from '../../services/inbox.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  providers: [ InboxService ]
})
export class InboxComponent implements OnInit {
  activatedRoute: ActivatedRoute;  
  private messages : Message[] = [];
  private id: string;
 

  constructor(private inboxService: InboxService,activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
	this.inboxService = inboxService;
  }

  async ngOnInit() {
		
		this.messages = await this.inboxService.getMessages();
  }
  
	
}


