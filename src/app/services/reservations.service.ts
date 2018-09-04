import { Injectable } from '@angular/core';
import { Lodging } from '../model/Lodging';
import { Category } from '../model/Category';
import { LodgingType } from '../model/LodgingType';
import { Period } from '../model/Period';
import { Reservation } from '../model/Reservation';

import { ImageUrl } from '../model/ImageUrl';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from'@angular/http';


@Injectable()
export class ReservationsService {

  readonly serverURL: string = 'http://127.0.0.1:9000';
 
  constructor(private http: HttpClient) { }

  
	public getReservations():Promise<Reservation[]> {
		let headers = {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')).value}
	  return this.http.get(this.serverURL+ '/secure/reservations',{headers:headers}).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
	
	public confirmReservation(id:string,lodgingId:string){
		console.log(id);
		return this.http.put(this.serverURL+ '/confirm/'+id+'_'+lodgingId).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
	}
  
   private extractData(res: Response) {
    

    return res;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
  
	
}
