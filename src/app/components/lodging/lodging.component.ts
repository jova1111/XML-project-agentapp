import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Lodging } from '../../model/Lodging';
import { Service } from '../../model/Service';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUri } from '../../model/ImageUri';
import { Period } from '../../model/Period';
import { LodgingService } from '../../services/lodging.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lodging',
  templateUrl: './lodging.component.html',
  styleUrls: ['./lodging.component.css'],
  providers: [ LodgingService ]
})
export class LodgingComponent implements OnInit {
  activatedRoute: ActivatedRoute;  
  private lodging : Lodging = new Lodging;
  private id: string;
 

  constructor(private lodgingService: LodgingService,activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
	this.lodgingService = lodgingService;
  }

  async ngOnInit() {
		this.activatedRoute.paramMap.subscribe(params => {
		this.id = params.get('id');
		});
		
	console.log(this.id);
	this.lodging = await this.lodgingService.getById(this.id);
	console.log(this.lodging.periods);
	console.log("OPA")
  }
  
	public async reserve(id:string){
		console.log(id);
	await this.lodgingService.reservePeriod(id);
}
}

