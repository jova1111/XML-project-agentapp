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
export class AuthService {

  readonly serverURL: string = 'http://127.0.0.1:9000';
  private imageUri: ImageUri= new ImageUri();
  constructor(private http: HttpClient) { }

  public login(lodging: Lodging) {
    var data = {
      /*client_id: '2',
      client_secret: 'dRKS8omkeSCVp4VdaCZnd2DItMHxdlur96NGOine',
      grant_type: 'password',*/
      email: lodging.place,
      password: lodging.description
    };
    return new Promise((resolve, reject)=> {
      this.http.post(this.serverURL + '/login', data).subscribe(
        (response: any) => {
          this.authenticate(response.token, response.expiresIn);
          resolve("Successfully logged in!");
        },
        (error: HttpErrorResponse) => {
          reject('Нисте унели исправне податке!');
        });
    });
  }

  private authenticate(tokenStr: string, expDate: number) {
    let token = { value: tokenStr, expirationDate: Date.now() + expDate * 1000 }
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getServices():Promise<Service[]> {
	  return this.http.get(this.serverURL+ '/service').toPromise()
        .then(this.extractData)
        .catch(this.handleError);
      
	  
  }
  public getCategories():Promise<Category[]> {
    console.log('DOSO');
	  return this.http.get(this.serverURL+ '/categories').toPromise()
        .then(this.extractData)
        .catch(this.handleError);
      
	  
  }
  
  public getTypes():Promise<LodgingType[]> {
	  return this.http.get(this.serverURL+ '/types').toPromise()
        .then(this.extractData)
        .catch(this.handleError);
      
	  
  }
  
   public async saveImage(imageUri: ImageUri):Promise<ImageUri> {
	   
	   await this.http.post(this.serverURL+ '/image',imageUri).toPromise()
        .then(res=>{this.imageUri=res})
        .catch(this.handleError);
      return this.imageUri;
	  
  }
  public isAuthenticated():boolean {
    let tokenJson = localStorage.getItem('token');
    if (!tokenJson) {
      return false;
    }
    let token = JSON.parse(tokenJson);
    if(Date.now() > token.expirationDate) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

   private extractData(res: Response) {
    

    return res;
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
  public register(lodging: Lodging) {
    const headers: HttpHeaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
                                     .append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {this.http.post(this.serverURL + '/lodging', lodging, { headers: headers } ).subscribe(
      (success) => {
        resolve(success)
		console.log(success)
      }, 
      (error) => {
        reject(error)
      })
    });
  }
  
	public async postImage(fileToUpload: File):Promise<string>{
	var val = "";
    const endpoint = 'https://api.imgur.com/3/image';
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
	const headers: HttpHeaders = new HttpHeaders({'Authorization': 'Client-ID c98199048ba3773','Accept': 'application/json'})
                                     
	await this.http.post(endpoint, formData, { headers: headers}).toPromise().then(res=>{val=res.data.link;});
	
	return val;
	}
	
	public async savePeriods(periods: Period[]):Promise<Period[]>{
		const headers: HttpHeaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})
                                     .append('Content-Type', 'application/json');
                                 
		return await this.http.post(this.serverURL+ '/period',periods, {headers:headers}).toPromise()
        .then(this.extractData)
        .catch(this.handleError);

	}
}
