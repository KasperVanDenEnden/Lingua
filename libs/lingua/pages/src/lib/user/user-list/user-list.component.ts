import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagesModule } from '../../pages.module';
import { NotificationService, UserService } from '@lingua/services';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lingua-user-list',
  imports: [PagesModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  users?: IUser[];
  sub!: Subscription;

  userList$?: Observable<IUser[]>;

  isModalOpen = false;
  recordToDelete?: IUser;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.userService.refresh$.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadUsers() {
    this.userList$ = this.userService.getUsers();
    this.sub = this.userService.getUsers().subscribe((results) => {
      this.users = results;
    });
  }

  handleDelete(record: IUser): void {
    this.recordToDelete = record;
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.userService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.loadUsers();
          this.notify.success('Gelukt!');
        },
        error: (error) => {
          this.notify.error(error);
        },
        complete: () => {
          this.recordToDelete = undefined;
          this.isModalOpen = false;
        },
      });
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0;
  }
}
