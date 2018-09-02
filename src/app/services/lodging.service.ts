import { Injectable } from '@angular/core';
import { Lodging } from '../model/Lodging';
import { Service } from '../model/Service';
import { Category } from '../model/Category';
import { LodgingType } from '../model/LodgingType';
import { Period } from '../model/Period';

import { ImageUri } from '../model/ImageUri';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from'@angular/http';


@Injectable()
export class LodgingService {

  readonly serverURL: string = 'http://127.0.0.1:9000';
 
  constructor(private http: HttpClient) { }

  
	public getLodgings():Promise<Lodging[]> {
	  return this.http.get(this.serverURL+ '/lodgings').toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }
	public getById(id:string):Promise<Lodging>{
		return this.http.get(this.serverURL+ '/lodging/'+id).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
	}
	public reservePeriod(id:string,lodgingId:string){
		console.log(id);		
		return this.http.put(this.serverURL+ '/reserve/'+id+'_'+lodgingId).toPromise()
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
