import { Injectable } from '@angular/core';
import { Lodging } from '../model/Lodging';
import { Service } from '../model/Service';
import { Category } from '../model/Category';
import { LodgingType } from '../model/LodgingType';
import { ImageUri } from '../model/ImageUri';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from'@angular/http';


@Injectable()
export class HomeService {

  readonly serverURL: string = 'http://127.0.0.1:9000';
  private imageUri: ImageUri= new ImageUri();
  constructor(private http: HttpClient) { }

 /* public synchronize(){
	
    
                                     
    this.http.post(this.serverURL + '/welcome').toPromise();
  }*/
}
