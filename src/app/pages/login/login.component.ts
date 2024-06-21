import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import gsap from 'gsap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CardsComponent } from './components/cards/cards.component';

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

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const timeline = gsap.timeline();
    timeline
      .to('.fire-animation', { duration: 2, width: '200%', height: '200%', opacity: 1 })
      .to('.charizard', { duration: 1.5, opacity: 1, scale: 3.2 }, '-=1.5')
      .to('.fire-animation', { duration: 1, opacity: 0 }); // Adiciona a animação de desaparecimento do fogo
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'l5network@l5network.com' && password == '12345') {
        this.messageService.add({ severity: 'success', detail: 'Logado com sucesso' });
      } else {
        this.messageService.add({ severity: 'error', detail: 'Email e/ou senha incorretos' });
      }
    }
  }
}
