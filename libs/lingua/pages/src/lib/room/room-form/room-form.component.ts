import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LinguaCommonModule } from '@lingua/common';
import { Subscription } from 'rxjs';
import { Id, IRoom, ICreateRoom, ILocation } from '@lingua/api';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';
import { Types } from 'mongoose';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'lingua-room-form',
  imports: [CommonModule, ReactiveFormsModule, LinguaCommonModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css',
})
export class RoomFormComponent implements OnInit, OnDestroy {
  formSub?: Subscription;
  isEditMode?: boolean;
  existId!: Id;

  locations: ILocation[] = [];
 
  roomForm: FormGroup = new FormGroup({
    slug: new FormControl(null, Validators.required),
    floor: new FormControl(null, Validators.required),
    capacity: new FormControl(null, Validators.required),
    hasMonitor: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadLocations();
    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id) {
        this.loadRoomData(id);
        this.isEditMode = true;
        this.existId = new Types.ObjectId(id);
      } else {
        this.initializeNewRoom();
        this.isEditMode = false
      }
    });

  }

  loadLocations() {
    this.locationService.getLocations().subscribe((results) => {
      this.locations = results;
    }); 
  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  initializeNewRoom() {
    this.roomForm.reset();
  }

  loadRoomData(id: string) {
    this.formSub = this.roomService.getRoomById(id).subscribe({
      next: (room: IRoom) => {
        this.roomForm.patchValue({
          slug: room.slug,
          floor: room.floor,
          capacity: room.capacity,
          hasMonitor: room.hasMonitor,
          location: room.location._id
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen kamergegevens:', err)
      }
    })
  }

  onSubmit(): void {
    const data: ICreateRoom = {
      slug: this.roomForm.value.slug,
      floor: this.roomForm.value.floor,
      capacity: this.roomForm.value.capacity,
      hasMonitor: this.roomForm.value.hasMonitor,
      location: this.roomForm.value.location,
    }

    if(this.isEditMode) {
      this.roomService.update(data, this.existId).subscribe((updatedRoom) => {
        this.roomService.triggerRefresh();
        this.router.navigate(['rooms', updatedRoom._id]);
      })
    } else {
      this.roomService.create(data).subscribe((room) => {
        this.roomService.triggerRefresh();
        this.router.navigate(['/rooms'])
      })
    }
  }

  closeForm() {
    const currentUrl = this.router.url.split('/');
    currentUrl.pop();
    this.router.navigate([currentUrl.join('/')]);
  }
}
