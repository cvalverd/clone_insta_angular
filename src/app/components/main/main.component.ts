import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneFrameComponent } from '../phone-frame/phone-frame.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, PhoneFrameComponent, LoginFormComponent, FooterComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
}
