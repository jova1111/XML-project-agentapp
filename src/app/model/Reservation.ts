import { Lodging } from '../model/Lodging';
import { Period } from '../model/Period';

export class Reservation {
    id: number;
    period: Period;
	lodging: Lodging;
	activated: boolean;
    
}
