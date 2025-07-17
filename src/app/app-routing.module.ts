import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/components/main/main.component';
import { BasketComponent } from './pages/components/basket/basket.component';
const routes: Routes = [
  {
    path:'',pathMatch:'full',redirectTo:'home'
  },
  {path:'home',component:MainComponent},
  {path:'basket',component:BasketComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
