import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    /*So, loginform! : FormGroup; is essentially declaring that loginForm will be of type FormGroup 
  and that TypeScript should not consider it as potentially null or undefined, 
  even if it's not initialized immediately.*/
  loginForm! : FormGroup;    // create the object for the login up form 
  hidePassword = true;   // variable to store the value for hide password

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,   // to show the messages to the user
    private authService: AuthService,
    private router: Router) {

    }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      email: [null,[Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() : void{
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username,password).subscribe({
      next: (response) => {
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      error: (error) => {
        this.snackBar.open('Bad Credentials', 'ERROR', { duration: 5000 });
      }
    });

  }

}
