import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILocation, IRoom } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { FormatService, NotificationService, RoomService } from '@lingua/services';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-room-list',
  imports: [PagesModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent implements OnInit, OnDestroy {
  rooms?: IRoom[] | null;
  sub!: Subscription;

  roomList$?: Observable<IRoom[]>;

  isModalOpen = false;
  recordToDelete?: IRoom | null;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private format: FormatService
  ) {}

  ngOnInit(): void {
    this.loadRooms();

    this.roomService.refresh$.subscribe(() => {
      this.loadRooms();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadRooms() {
    this.roomList$ = this.roomService.getRooms();
    this.sub = this.roomService.getRooms().subscribe((results) => {
      this.rooms = results;
    });
  }

  getRoom(room: IRoom): string {
    return this.format.getRoomSlug(room);


  }

  getLocationAddress(room: IRoom): string {
    const location = room.location as ILocation;
    return this.format.getLocationAddress(location);
  }

  handleDelete(record: IRoom): void {
    this.recordToDelete = record;
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.roomService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.loadRooms();
          this.notify.success('Gelukt!');
        },
        error: (error) => {
          console.error('Error deleting lesson:', error);
        },
        complete: () => {
          this.recordToDelete = null;
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
