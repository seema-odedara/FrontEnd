import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveDataToLocalStorage(key: string, value:string){
    localStorage.setItem(key, value);
  }

  getDataFromLocalStorage(key: string){
    return localStorage.getItem(key);
  }

  removetDataFromLocalStorage(key: string){
    localStorage.removeItem(key);
  }
}
