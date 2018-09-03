import { Injectable } from '@angular/core';
import { Lodging } from '../model/Lodging';
import { Service } from '../model/Service';
import { Category } from '../model/Category';
import { LodgingType } from '../model/LodgingType';
import { Message } from '../model/Message';
import { Reservation } from '../model/Reservation';

import { ImageUrl } from '../model/ImageUrl';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from'@angular/http';


@Injectable()
export class InboxService {

  readonly serverURL: string = 'http://127.0.0.1:9000';
 
  constructor(private http: HttpClient) { }

  
	public getMessages():Promise<Message[]> {
	  return this.http.get(this.serverURL+ '/messages').toPromise()
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
  
  public async sendMessage(message:Message,id:string){
	  console.log(id);
	  console.log(message.content);
	  return  await this.http.post(this.serverURL+ '/message/'+id,message).toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
	
}
