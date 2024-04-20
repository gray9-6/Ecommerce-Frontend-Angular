import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/admin/service/admin.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // products ko store karne ke liye ek variable bana liya 
    products: any[] = [];

    // Search form 
    searchProductForm!: FormGroup;
  
    // adminService ko inject kar liya taaki uske methods ko use kar sake
    constructor(private customerService: CustomerService,
      private fb :FormBuilder,
      private snackBar: MatSnackBar
    ) { }
  
    getAllProducts(){
     this.products = [];
     this.customerService.getAllProducts().subscribe(res=>{
      // isme hum har product ki image mein , ek string concate kar rahe hai , jisse hum , user ko image dikha sake
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64' + element.byteImg;
        // ab concate karne ke baad hum iss element ko hamare main product ke array mein push kar denge,
        this.products.push(element); 
      });
     })
    }
  
    ngOnInit(): void {
      this.getAllProducts();
  
      // searchProductForm ko intialize kiya , or formBuilder ke group method mein , iss form ke control mention karenge
      this.searchProductForm = this.fb.group({
        title: [null,[Validators.required]]
      })
    }
  
  
    submitForm(){
      this.products = [];
      const title = this.searchProductForm.get('title')!.value;
     this.customerService.getAllProductsByName(title).subscribe(res=>{
      // isme hum har product ki image mein , ek string concate kar rahe hai , jisse hum , user ko image dikha sake
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64' + element.byteImg;
        // ab concate karne ke baad hum iss element ko hamare main product ke array mein push kar denge,
        this.products.push(element); 
      });
     })
    }

    addToCart(id : any){
      this.customerService.addToCart(id).subscribe(res =>{
        this.snackBar.open("Product added to cart successfully","Close",{duration : 50000})
      })
    }
}
