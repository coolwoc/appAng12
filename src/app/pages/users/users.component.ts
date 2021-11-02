import { Component, OnInit, ViewChild } from '@angular/core';

import * as fromUser from '@src/src/app/models/User';
import { NotificationService, UsersService } from '../../services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'surname', 'email', 'actions'];
  public dataSource = new MatTableDataSource<fromUser.User>();
  users!: fromUser.User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private auth: AuthService,
    private user: UsersService,
    private notification: NotificationService
  ) { 
    this.auth.userAuthSuccesfully();
  }

  ngOnInit(): void {
    this.user.getAllUsers().subscribe(
      data => { 
        this.dataSource.data = data.items;
      },
      error => { this.notification.error(error.message) }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getActionsDelete(elem: fromUser.User): void {
  
    this.user.deleteUserById(elem.id).subscribe(
      (data) => {
        this.notification.success(elem.id +' '+ elem.email + 'delete');
        window.location.reload();
      },
      error => { this.notification.error(error.message) }
    )
  }
}
