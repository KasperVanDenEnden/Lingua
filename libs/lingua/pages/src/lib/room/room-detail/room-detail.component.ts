import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService, NotificationService, RoomService } from '@lingua/services';
import { Observable, Subscription } from 'rxjs';
import { ILocation, IRoom } from '@lingua/api';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-room-detail',
  imports: [PagesModule],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  room$!: Observable<IRoom>;
  roomId?: string | null;
  location?: ILocation | null;

  isModalOpen = false;
  recordToDelete?: IRoom | null;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private router: Router,
    private format: FormatService
  ) {}

  ngOnInit(): void {
    this.loadRoom();

    this.roomService.refresh$.subscribe(() => {
      this.loadRoom();
    });
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  
  loadRoom() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.roomId = params.get('id');

      if(this.roomId) {
        this.room$ = this.roomService.getRoomById(this.roomId);
        this.room$.subscribe(room => {
          this.location = room.location as ILocation;
          this.recordToDelete = room;
        });
      }
    })
  }

  getRoomSlug(room:IRoom | null): string {
    if(!room) return 'No slug available';
    return this.format.getRoomSlug(room);
  }

  getLocationAddress(room:IRoom | null): string {
    return this.format.getLocationAddress(room?.location as ILocation);
  }

  handleDelete(): void {
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.roomService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.notify.success('Gelukt!')
          this.router.navigate(['/lessons']);
        },
        error: (error) => {
          this.notify.error(error);
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
