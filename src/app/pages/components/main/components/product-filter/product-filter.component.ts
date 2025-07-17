import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: false,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
@Input() categoriesArray:Array<any> = [];
@Output() formObjectEmitter:EventEmitter<any> = new EventEmitter();
filterObject:any = this.createFilterObject();


createFilterObject(){
  return {
    categoryId:'',
    spiciness:'',
    nuts:'',
    vegeterian:''
  }
}

onFormSubmit(){
this.formObjectEmitter.emit(this.filterObject)
}
}
