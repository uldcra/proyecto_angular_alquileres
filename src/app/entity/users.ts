import {Advertisement} from './advertisement';
import {Search} from './search';

export interface users{
    id?: number;
    name: string;
    email: string;
    password: string;
    roles : Array<string>;
    myFavorites: Array<Advertisement>;
    mySearches:Array<Search>;
    myAdvertisements: Array<Advertisement>;
}