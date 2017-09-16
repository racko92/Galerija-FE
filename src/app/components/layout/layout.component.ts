import { Component, Inject } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  private userId: number;

  constructor(private auth: AuthService) {
   }

}
