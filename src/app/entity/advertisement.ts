
import {Comment} from './comment';

export interface Advertisement{

    id?: number;
    type: string;
    property:string;
    rooms:number;
    bathrooms:number;
    squareMeters:number;
    location:string;
    address:string;
    price:number;
    picture:string;
    images : Array<string>;
    comments: Comment[];
}