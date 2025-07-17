import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  constructor(private http:HttpClient) { }


  getAllProducts():Observable<any>{
    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetAll`)
  }

  getAllCategires():Observable<any>{
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetAll`)
  }


  getFilteredProducts(query:string):Observable<any>{
return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered${query}`)
  }


  addToBasket(data:any):Observable<any>{
return this.http.post(`https://restaurant.stepprojects.ge/api/Baskets/AddToBasket`,data,{
  headers:{
    'Content-Type':'application/json'
  }
})
  }
}
