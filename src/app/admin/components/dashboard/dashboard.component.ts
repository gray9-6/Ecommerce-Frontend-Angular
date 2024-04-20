import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private adminService: AdminService,
    private fb :FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  getAllProducts(){
   this.products = [];
   this.adminService.getAllProducts().subscribe(res=>{
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
   this.adminService.getAllProductsByName(title).subscribe(res=>{
    // isme hum har product ki image mein , ek string concate kar rahe hai , jisse hum , user ko image dikha sake
    res.forEach(element => {
      element.processedImg = 'data:image/jpeg;base64' + element.byteImg;
      // ab concate karne ke baad hum iss element ko hamare main product ke array mein push kar denge,
      this.products.push(element); 
    });
   })
  }


  deleteProduct(productId: any) {
    this.adminService.delteProduct(productId).subscribe(res => {
      if (res && res.body != null) { // Check if 'res' is not null
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      } else {
        this.snackBar.open('Product Deleted Successfully!', 'Close', {
          duration: 5000
        });
  
        // After deleting the product, refresh the product list on the dashboard
        this.getAllProducts();
      }
    }, error => {
      console.error("Error deleting product:", error);
      // Handle error cases if needed
    });
  }
  

}
