import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ILocation, IRoom } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { RoomService } from '@lingua/pages';


@Component({
  selector: 'lingua-room-list',
  imports: [CommonModule, LinguaCommonModule, RouterModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent implements OnInit, OnDestroy {
  rooms?: IRoom[] | null;
  sub!: Subscription;

  roomList$?: Observable<IRoom[]>;

  constructor(private roomService: RoomService,private route:ActivatedRoute) {}
  
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
    this.roomList$ = this.roomService.getRooms()
    this.sub = this.roomService.getRooms().subscribe((results) => {
      this.rooms = results;
    })
  }

  getRoom(room: IRoom): string {
    const locationSlug = (room.location as ILocation)?.slug ?? '';
    const floor = room.floor ?? '';
    const roomSlug = room.slug ?? '';
  
    return `${locationSlug}-${floor}.${roomSlug}`;
  }
  

  getLocationAddress(room: IRoom): string {
    const location = room.location as ILocation;
  
    return [
      `${location.street} ${location.number}`.trim(),
      `${location.postal} ${location.city}`.trim(),
      location.province
    ].filter(Boolean).join(', ');
  }
  
  isChildRouteActive(): boolean {
    return this.route.children.length > 0;
  }
}
