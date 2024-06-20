import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { PhoneFrameComponent } from '../phone-frame/phone-frame.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FooterComponent, PhoneFrameComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usuarios: any[] = [];
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      username: ['', Validators.required],
      birthdate: ['', Validators.required]
    });

    if (typeof localStorage !== 'undefined') {
      const usuariosGuardados = localStorage.getItem('usuarios');
      this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    }
  }

  ngOnInit(): void {}

  registrarUsuario(email: string, name: string, password: string, username: string, birthdate: string): boolean {
    const usuarioExistente = this.usuarios.find(user => user.email === email || user.username === username);
    if (usuarioExistente) {
      alert('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario = { email, name, password, username, birthdate };
    this.usuarios.push(nuevoUsuario);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    alert('Usuario registrado exitosamente.');
    return true;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const { email, name, password, repeatPassword, username, birthdate } = this.registerForm.value;
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      const registroExitoso = this.registrarUsuario(email, name, password, username, birthdate);
      if (registroExitoso) {
        this.registerForm.reset();
        this.submitted = false;
      }
    }
  }
}
