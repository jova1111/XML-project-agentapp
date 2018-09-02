import { Service } from './Service'
import { Category } from './Category'
import { LodgingType } from './LodgingType'
import { ImageUri } from './ImageUri'
import { Period } from './Period'

export class Lodging {
    place: string;
    guestNumber : number;
    description: string;
	service : Service[];
	price : number;
	category : Category;
	lodgingType : LodgingType;
	images : ImageUri[];
	periods: Period[];
	
}
