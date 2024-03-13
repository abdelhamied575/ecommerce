import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailesComponent } from './components/detailes/detailes.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './setting/forgetpassword/forgetpassword.component';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  component:BlankLayoutComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'cart',component:CartComponent},
    {path:'wishlist',component:WishlistComponent},
    {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule)},

    {path:'products',component:ProductsComponent},
    {path:'allorders',component:AllordersComponent},
    {path:'checkout/:id',component:CheckoutComponent},
    
    {path:'details/:id',component:DetailesComponent},
    {path:'brands',component:BrandsComponent},
    {path:'categories',component:CategoriesComponent}
    ]},

  {path:'',component:AuthLayoutComponent,
  children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forget',component:ForgetpasswordComponent}
  ]},

  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
