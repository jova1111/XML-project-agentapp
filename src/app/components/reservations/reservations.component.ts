import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Lodging } from '../../model/Lodging';
import { Reservation } from '../../model/Reservation';
import { Service } from '../../model/Service';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUrl } from '../../model/ImageUrl';
import { Period } from '../../model/Period';
import { ReservationsService } from '../../services/reservations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ ReservationsService ]
})
export class ReservationsComponent implements OnInit {
  activatedRoute: ActivatedRoute;  
  private reservations : Reservation[] = [];
  private id: string;

  constructor(private reservationsService: ReservationsService,activatedRoute: ActivatedRoute) {
    this.activatedRoute = activatedRoute;
	this.reservationsService = reservationsService;
  }

  async ngOnInit() {
		
	this.reservations = await this.reservationsService.getReservations();
	console.log(this.reservations);
	
  }
  
	public async confirm(id:string,lodgingId:string){
		console.log(id);
	await this.reservationsService.confirmReservation(id,lodgingId);
}
}

