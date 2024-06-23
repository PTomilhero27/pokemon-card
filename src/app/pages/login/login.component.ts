import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CardsComponent } from './components/cards/cards.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    ToastModule,
    RippleModule,
    CardsComponent
  
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'l5network@l5network.com' && password == '12345') {
        this.messageService.add({ severity: 'success', detail: 'Logado com sucesso' });
        this.router.navigate(['/home']);
      } else {
        this.messageService.add({ severity: 'error', detail: 'Email e/ou senha incorretos' });
      }
    }
  }
}
