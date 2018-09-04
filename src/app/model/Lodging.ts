import { Favour } from './Favour'
import { Category } from './Category'
import { LodgingType } from './LodgingType'
import { ImageUrl } from './ImageUrl'
import { Period } from './Period'

export class Lodging {
    place: string;
    guestNumber : number;
    description: string;
	favours : Favour[];
	price : number;
	category : Category;
	lodgingType : LodgingType;
	imageUrls : ImageUrl[];
	periods: Period[];
	name :string;
	
}
