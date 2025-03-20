import { Component, OnDestroy, OnInit } from '@angular/core';
import { PagesModule } from '../../pages.module';
import { IUser } from '@lingua/api';
import { Subscription, Observable } from 'rxjs';
import { NotificationService, UserService } from '@lingua/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lingua-user-detail',
  imports: [PagesModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  user$!: Observable<IUser>;
  userId?: string | null;

   isModalOpen = false;
  recordToDelete?: IUser | null;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadUser();

    this.userService.refresh$.subscribe(() => {
      this.loadUser();
    })
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  
  loadUser() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');

      if(this.userId) {
        this.user$ = this.userService.getUserById(this.userId);
      }
    })
  }
  
  handleDelete(): void {
    this.isModalOpen = true;
  }

  confirmDelete(): void
  {
    if(this.recordToDelete) {
      this.userService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.notify.success('User succesfully deleted');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error deleting user: ', error);
        }
      })
    }
  }

  closeModal(): void {
    console.log('close modal');
    this.isModalOpen = false;
  }
  
  isChildRouteActive(): boolean {
    return this.route.children.length > 0;
  }
}
