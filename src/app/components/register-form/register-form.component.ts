import { Component, OnInit, ElementRef,AfterViewInit,ViewChild } from '@angular/core';
import { Lodging } from '../../model/Lodging';
import { Favour } from '../../model/Favour';
import { Category } from '../../model/Category';
import { LodgingType } from '../../model/LodgingType';
import { ImageUrl } from '../../model/ImageUrl';
import { Period } from '../../model/Period';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [ AuthService ]
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('periods') periodsDiv: ElementRef;
  private lodging: Lodging = new Lodging();
  private services: Favour[] = [];
  private lodgingServices: Favour [] = [];
  private categories: Category[] = [];
  private types: LodgingType[] = [];
  private imageUris: string[] = [];
  private files : File[]=[];
  private periods: Period[] =[];
  private period : Period = new Period();
  private images: ImageUrl[] = [];
  private imageUrl: ImageUrl = new ImageUrl();
  
  constructor(private authService: AuthService) { 
  }

  async ngOnInit() {
	  
	 await this.authService.getServices().then(res => this.services = res);
	 await this.authService.getCategories().then(res => this.categories = res);
	 await this.authService.getTypes().then(res => this.types = res);

	 console.log(this.categories);
	 console.log(this.types);
	 
  }
  

	onChange(service:Favour, isChecked: boolean) {
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
		console.log(this.files);
		
	}
	async uploadImage(){
		
		for(var i=0; i < this.files.length ; i++){
			let imgUrl= await this.authService.postImage(this.files[i]);
			console.log('vratio: ' + imgUrl);
			this.imageUrl = new ImageUrl();
			this.imageUrl.url = imgUrl;
			console.log(this.imageUrl);
			this.imageUrl= await this.authService.saveImage(this.imageUrl);
			console.log(this.imageUrl);
			this.images.push(this.imageUrl);
			console.log('ubacio')
		}
		alert('Saved images!');
		console.log(this.images);
	}
	addPeriod(){
		var tempPeriod = new Period();
		tempPeriod.dateFrom = this.period.dateFrom;
		tempPeriod.dateTo = this.period.dateTo;
		tempPeriod.reserved = false;
		this.periods.push(tempPeriod);

	}
	
  async onSubmit() {
	  this.lodging.favours=this.lodgingServices;
	  this.lodging.imageUrls=this.images;
	  this.lodging.periods = await this.authService.savePeriods(this.periods) ;
	  console.log(this.lodging.periods);

	this.authService.register(this.lodging).then(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}

