import { Service } from './Service'
import { Category } from './Category'
import { LodgingType } from './LodgingType'
import { ImageUri } from './ImageUri'

export class Lodging {
    place: string;
    guestNumber : number;
    description: string;
	service : Service[];
	price : number;
	category : Category;
	lodgingType : LodgingType;
	fromDate : string;
	toDate : string;
	images : ImageUri[];
	
	
}
