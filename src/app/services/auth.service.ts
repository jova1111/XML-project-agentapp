import { Injectable } from '@angular/core';
import { Lodging } from '../model/Lodging';
import { Favour } from '../model/Favour';
import { Category } from '../model/Category';
import { LodgingType } from '../model/LodgingType';
import { Period } from '../model/Period';

import { ImageUrl } from '../model/ImageUrl';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from'@angular/http';


@Injectable()
export class AuthService {
  readonly serverURL: string = 'http://127.0.0.1:9000';
  private imageUrl: ImageUrl= new ImageUrl();
  constructor(private http: HttpClient) { }

  /*public login(lodging: Lodging) {
    var data = {
      /*client_id: '2',
      client_secret: 'dRKS8omkeSCVp4VdaCZnd2DItMHxdlur96NGOine',
      grant_type: 'password',
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
  */public login(agentId: string){
	  return new Promise((resolve, reject)=> {
		  this.http.post(this.serverURL + '/login/'+agentId).subscribe(
        (response: any) => {
          this.authenticate(response.token, response.expiresIn);
          resolve("Successfully logged in!");
		  window.top.location.href="/home";
        },
        (error: HttpErrorResponse) => {
          reject('Error');
        });
	   
	  });
	}

  private authenticate(tokenStr: string, expDate: number) {
    let token = { value: tokenStr, expirationDate: Date.now() + expDate * 1000 }
    localStorage.setItem('token', JSON.stringify(token));
  }

  public getServices():Promise<Favour[]> {
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
  
   public async saveImage(imageUrl: ImageUrl):Promise<ImageUrl> {
	   
	   await this.http.post(this.serverURL+ '/image',imageUrl).toPromise()
        .then(res=>{this.imageUrl=res})
        .catch(this.handleError);
      return this.imageUrl;
	  
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
    let headers = {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token')).value}
    return new Promise((resolve, reject) => {this.http.post(this.serverURL + '/secure/lodging', lodging, { headers: headers } ).subscribe(
      (success) => {
        resolve(success)
		alert("Successfully created!!!");
		window.top.location.href = "/register";
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
