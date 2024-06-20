import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private el: ElementRef) {
    if (typeof localStorage !== 'undefined') {
      const usuariosGuardados = localStorage.getItem('usuarios');
      this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(emailOrUsername: string, password: string): boolean {
    const usuario = this.usuarios.find(user => (user.email === emailOrUsername || user.username === emailOrUsername) && user.password === password);
    if (usuario) {
      this.showToast('Inicio de sesión exitoso.', 'success');
      return true;
    } else {
      this.showToast('Email/Usuario o contraseña incorrectos.', 'danger');
      return false;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const emailOrUsernameControl = this.loginForm.get('emailOrUsername');
      const passwordControl = this.loginForm.get('password');
      
      if (emailOrUsernameControl && passwordControl) {
        const emailOrUsername = emailOrUsernameControl.value;
        const password = passwordControl.value;


        const inicioExitoso = this.iniciarSesion(emailOrUsername, password);
        if (inicioExitoso) {
          this.loginForm.reset();
        }
      } else {
        console.error('Form controls are missing');
        this.showToast('Formulario no válido.', 'danger');
      }
    } else {
      this.showToast('Formulario no válido.', 'danger');
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register').then(() => {
      window.location.reload();
    });
  }

  showToast(message: string, type: 'success' | 'danger') {
    const toastContainer = this.el.nativeElement.querySelector('#toast-container');
    const toastElement = document.createElement('div');
    toastElement.className = `toast align-items-center text-bg-${type} border-0`;
    toastElement.role = 'alert';
    toastElement.ariaLive = 'assertive';
    toastElement.ariaAtomic = 'true';
    toastElement.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    toastContainer.appendChild(toastElement);

    const toastBootstrap = new bootstrap.Toast(toastElement);
    toastBootstrap.show();

    setTimeout(() => {
      toastBootstrap.hide();
      toastElement.remove();
    }, 3000);
  }
}
