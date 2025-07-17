import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/components/main/components/product/product.component';
import { ProductFilterComponent } from './pages/components/main/components/product-filter/product-filter.component';
import { BasketComponent } from './pages/components/basket/basket.component';
import { BasketItemComponent } from './pages/components/basket/components/basket-item/basket-item.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { FooterComponent } from './pages/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProductComponent,
    ProductFilterComponent,
    BasketComponent,
    BasketItemComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
