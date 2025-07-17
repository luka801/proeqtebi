import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../services/proxy.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  constructor(private proxyService:ProxyService){}
  productsArray:Array<any> = [];
  categoriesArray:Array<any> = [];
  ngOnInit(): void {
    this.getAllProductsFromMain();
    this.getAllCategoriesFromMain();
  }


  getAllProductsFromMain(){
    this.proxyService.getAllProducts()
    .subscribe({
      next:(response) => {
        this.productsArray = response;
        console.log(response,'response')
      },
      error:(error) => {
        console.error(error)
      },
      complete:() => {
        console.log("complated")
      }
    })
  }


  getAllCategoriesFromMain(){
    this.proxyService.getAllCategires()
    .subscribe({
      next:(response) => {
        this.categoriesArray = response;
      },
      error:(error) => {
        console.error(error)
      },
      complete:() => {
        console.log("complated")
      }
    })
  }


  formObjectEmitterSub(event:any){
    let queryArray:Array<string> = []
    if(event.nuts){
      queryArray.push(`nuts=${event.nuts}`)
    }
    if(event.vegeterian){
      queryArray.push(`vegeterian=${event.vegeterian}`)
    }
    if(event.spiciness){
      queryArray.push(`spiciness=${event.spiciness}`)
    }
    if(event.categoryId){
      queryArray.push(`categoryId=${event.categoryId}`)
    }

    let queryString = ``
    if(queryArray.length > 0){
      queryString += `?`
      queryString += queryArray.join('&')
    }

    this.proxyService.getFilteredProducts(queryString)
    .subscribe({
      next:(response:any) => {
        this.productsArray = response;
        
      },
      error:(err) => {
        console.error(err)
      }
    })
  }

  productEmitterSub(item:any){
    let reqBody = {
      quantity: 1,
      price: item.price,
      productId: item.id
    }

    this.proxyService.addToBasket(reqBody)
    .subscribe({
      next:() => {
        alert('კალათში დაემატა წარმატებით')
      },
      error:(error) => {
        alert('ვერ მოხერხდა დამატება.')
        console.error(error)
      }
    })
    
  }
}
