import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  // variables 
  productForm: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null;   // selected images ko store karne ke liye variable
  imagePreview: string | ArrayBuffer | null;   // image preview ko store karne ke liye
  listofCategories: any;
  category: any;
  imageArray:any;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }





  ngOnInit(): void {   // isme product form ke controls ko mention karenge
    this.productForm = this.fb.group({
      categoryId: [null,[Validators.required]],  // by default iski value null hogi , or iss field mein  validator lagaya hai 
      name: [null,[Validators.required]],
      price: [null,[Validators.required]],
      description: [null,[Validators.required]],

    });

    this.getAllCategories();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe(res =>{
      this.listOfCategories = res;
    })
  }

  addProduct(): void{
    if(this.productForm.valid){
      const formData= {};

      // formData['img'] = this.selectedFile;    // uncomment this when you are trying to add the image
      formData['categoryId'] = this.productForm.get('categoryId').value;
      formData['name']=this.productForm.get('name').value
      formData['description']=this.productForm.get('description').value;
      formData['price']=this.productForm.get('price').value;

      


      console.log(formData);

      this.adminService.addProduct(formData).subscribe((res) =>{
        if(res.id != null){
          this.snackBar.open('Product Posted Successfully!', 'Close',{
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');   // after sucessfully added the product, redirect them to dashboard
        }else{
          this.snackBar.open(res.message,'ERROR',{
            duration: 5000
          });
        }
      })


    }else{   // agar product form valid nahi hai 
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }



  onFileSelected(event) {
    const file: File = event.target.files[0];  // agar multiple files select ki hai , toh jo sabse pehli file hai usko hum dikhayenge preview mein
    // this.previewImage();    // uncomment this when you are trying to add the image
    // this.selectedFile = file;
  }
  
  // onFileSelected(event) {
  //   const files: FileList = event.target.files;  
  //   if (files.length > 0) {
  //     this.selectedFile = files[0];  // Get the first file from the list
  //     this.previewImage();
  //   }
  // }
  

  // isme hum selected file ko format karnege taaki usko wo image show kar sake 
  previewImage(){
    const reader = new FileReader();    // file reader ka object
    reader.onload= () =>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
