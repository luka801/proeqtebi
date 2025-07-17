import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private http:HttpClient) { }

 getAllProducts():Observable<any>{
    return this.http.get(`https://restaurant.stepprojects.ge/api/Baskets/GetAll`)
  }
 deleteProduct(id:number):Observable<any>{
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`)
  }
 updateProduct(data:any):Observable<any>{
    return this.http.put(`https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket`,data,{
      headers:{
        'Content-Type':'application/json'
      }
    })
  }

}
