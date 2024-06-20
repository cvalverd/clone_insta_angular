import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { PhoneFrameComponent } from '../phone-frame/phone-frame.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, PhoneFrameComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usuarios: any[] = [];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({});
    if (typeof localStorage !== 'undefined') {
      const usuariosGuardados = localStorage.getItem('usuarios');
      this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
    }
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
      username: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }

  registrarUsuario(email: string, name: string, password: string, username: string, birthdate: string): boolean {
    console.log('Intentando registrar usuario:', { email, name, username, birthdate });
    const usuarioExistente = this.usuarios.find(user => user.email === email || user.username === username);
    if (usuarioExistente) {
      alert('El usuario ya existe.');
      console.log('El usuario ya existe.');
      return false;
    }

    const nuevoUsuario = { email, name, password, username, birthdate };
    this.usuarios.push(nuevoUsuario);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
    alert('Usuario registrado exitosamente.');
    console.log('Usuario registrado exitosamente:', nuevoUsuario);
    return true;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, name, password, repeatPassword, username, birthdate } = this.registerForm.value;
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      const registroExitoso = this.registrarUsuario(email, name, password, username, birthdate);
      if (registroExitoso) {
        this.registerForm.reset();
      }
    }
  }
}
