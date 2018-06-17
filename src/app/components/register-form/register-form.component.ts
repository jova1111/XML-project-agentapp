import { Component, OnInit } from '@angular/core';
import { Lodging } from '../../model/Lodging';
import { Service } from '../../model/Service';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUri } from '../../model/ImageUri';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [ AuthService ]
})
export class RegisterFormComponent implements OnInit {

  private lodging: Lodging = new Lodging();
  private services: Service[] = [];
  private lodgingServices: Service [] = [];
  private categories: Category[] = [];
  private types: LodgingType[] = [];
  private imageUris: string[] = [];
  private files : File[]=[];
  private images: ImageUri[] = [];
  private imageUri: ImageUri = new ImageUri();
  constructor(private authService: AuthService) { 
  }

  ngOnInit() {
	  
	 this.authService.getServices().then(res => this.services = res);
	 
	 this.authService.getCategories().then(res => this.categories = res);
	 this.authService.getTypes().then(res => this.types = res);
	 
  }

	onChange(service:Service, isChecked: boolean) {
		console.log(service);
		if(isChecked) {
			this.lodgingServices.push(service);
		} else {
			let index = this.lodgingServices.findIndex(x => x == service)
			this.lodgingServices.splice(index,1);
		}
	}
	setValue(id:number){
		let index = this.categories.findIndex(x => x.id == id)
		console.log(this.categories[index]);
		this.lodging.category = this.categories[index] 
		
	}
	setType(id:number){
		let index = this.types.findIndex(x => x.id == id)
		console.log(this.types[index]);
		this.lodging.lodgingType = this.types[index] 
		
	}
	
	
		
	handleFileInput(files : FileList){
		for (var i = 0; i < files.length; i++) {
				this.files.push(files[i]);
		}
		
	}
	async uploadImage(){
		
		for(var i=0; i < this.files.length ; i++){
			let imgUri= await this.authService.postImage(this.files[i]);
			
			
			this.imageUri.setUri(imgUri);
			console.log(this.imageUri);
			this.imageUri= await this.authService.saveImage(this.imageUri);
			console.log(this.imageUri);
			this.images.push(this.imageUri);
			console.log('ubacio')
		}
		console.log('ubacio sve');
	}
  onSubmit() {
	  this.lodging.service=this.lodgingServices;
	  this.lodging.images=this.images;
	  console.log(this.lodging.fromDate);
    this.authService.register(this.lodging).then(
      (response) => console.log(response),
      (error) => console.log(error) 
    );
  }

}
