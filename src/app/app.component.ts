import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Spike Angular Admin Template';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.email) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/authentication/login']);
    }
  }
}
