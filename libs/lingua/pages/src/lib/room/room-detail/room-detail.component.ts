import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RoomService } from '@lingua/services';
import { Observable, Subscription } from 'rxjs';
import { ILocation, IRoom } from '@lingua/api';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-room-detail',
  imports: [CommonModule,RouterModule, LinguaCommonModule],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  room$!: Observable<IRoom>;
  roomId?: string | null;
  location?: ILocation | null;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRoom();

    this.roomService.refresh$.subscribe(() => {
      this.loadRoom();
    })

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
        });
      }
    })
  }

  getLocationAddress(): string {
    return [
      `${this.location?.street} ${this.location?.number}`.trim(),
      `${this.location?.postal} ${this.location?.city}`.trim(),
      this.location?.province
    ].filter(Boolean).join(', ');
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
