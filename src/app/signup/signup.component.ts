import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {



  /*So, signupForm! : FormGroup; is essentially declaring that signupForm will be of type FormGroup 
  and that TypeScript should not consider it as potentially null or undefined, 
  even if it's not initialized immediately.*/
  signupForm! : FormGroup;    // create the object for the sign up form 
  hidePassword = true;   // variable to store the value for hide password

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,   // to show the messages to the user
    private authService: AuthService,
    private router: Router) {

    }

  ngOnInit(): void {    // conrols for our signup form 
    this.signupForm = this.fb.group({
      name: [null,[Validators.required]],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required]],
      confirmPassword: [null,[Validators.required]],
      
    })

  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;
  }


  onSubmit() : void{
    // getting the value from the signup form 
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    // if the password do not match 
    if(password !== confirmPassword){
      this.snackBar.open('Password do not match.', 'Close', {duration: 5000, panelClass: 'error-snackbar'});
      return;
    }

    // this.authService.register(this.signupForm.value).subscribe(
    //   // if response is sucessful
    //   (response) =>{
    //     this.snackBar.open('Sign up sucessful!','Close',{duration: 5000});   // show the message 
    //     this.router.navigateByUrl("/login")   // and then navigate them to our login page
    //   },
    //   // iin case of erro
    //   (error) =>{
    //     this.snackBar.open('Sign up failed. Please try again.','Close',{duration: 5000,panelClass: 'error-snackbar'});   // show the message 
    //   }

    // )

    this.authService.register(this.signupForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
        this.router.navigateByUrl("/login");
      },
      error: (error) => {
        this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    });
    


  }


}
