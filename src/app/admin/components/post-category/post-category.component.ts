import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) { }

  
  ngOnInit(): void {  // menthion the controls for  category form
    this.categoryForm = this.fb.group({
      name: [null,[Validators.required]],
      description: [null,[Validators.required]],
    })
  }

  addCategory() : void{
    if(this.categoryForm.valid){
        this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>{
          if(res.id != null){
            this.snackBar.open('Category Posted Successfully!','Close',{
              duration: 5000
            });
            this.router.navigateByUrl('/admin/dashboard');
          }else{
            this.snackBar.open(res.messages,'Close',{
              duration: 5000,
              panelClass: 'error-snackbar'
            })
          }
        })
    }else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
