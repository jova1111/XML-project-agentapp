import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Lodging } from '../../model/Lodging';
import { Service } from '../../model/Service';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUrl } from '../../model/ImageUrl';
import { Period } from '../../model/Period';
import { LodgingService } from '../../services/lodging.service';

@Component({
  selector: 'app-lodgings',
  templateUrl: './lodgings.component.html',
  styleUrls: ['./lodgings.component.css'],
  providers: [ LodgingService ]
})
export class LodgingsComponent implements OnInit {

  private lodgings : Lodging[] = [];
 
  
  constructor(private lodgingService: LodgingService) { 
  }

  async ngOnInit() {
	    console.log("OPA");
	  await this.lodgingService.getLodgings().then(res => this.lodgings = res);
	  console.log("EVE GA");
		console.log(this.lodgings);
	}
}

