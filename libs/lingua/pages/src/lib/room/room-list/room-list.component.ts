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
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  
  loadRooms() {
    this.roomList$ = this.roomService.getRooms()
    this.sub = this.roomService.getRooms().subscribe((results) => {
      this.rooms = results;
      console.log(this.rooms[0].location)
    })
  }

  getRoomLocationSlug(room: IRoom): string {
    return (room.location as ILocation)?.slug || '';
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
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
