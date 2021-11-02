import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user!: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getMeInfo().subscribe((data: any) => {
      this.user = data.name
    })
    
  }

  logout() {
    this.auth.logOut();
  }
}