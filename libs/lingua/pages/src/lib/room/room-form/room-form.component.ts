import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Id, IRoom, ICreateRoom, ILocation } from '@lingua/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Types } from 'mongoose';
import { LocationService, RoomService } from '@lingua/services';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-room-form',
  imports: [PagesModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css',
})
export class RoomFormComponent implements OnInit, OnDestroy {
  formSub?: Subscription;
  locationSub?: Subscription;
  isEditMode?: boolean;
  existId!: Id;

  locations: ILocation[] = [];
  availableFloors: number[] = [];
 
  roomForm: FormGroup = new FormGroup({
    slug: new FormControl(null, Validators.required),
    floor: new FormControl(null, Validators.required),
    capacity: new FormControl(null, Validators.required),
    hasMonitor: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.loadLocations();

    this.roomForm.get('location')?.valueChanges.subscribe(() => {
      this.updateFloorOptions();
    });

    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id) {
        this.loadRoomData(id);
        this.isEditMode = true;
        this.existId = new Types.ObjectId(id);
      } else {
        this.roomForm.reset();
        this.isEditMode = false
      }
    });

  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  loadLocations() {
    this.locationService.getLocations().subscribe((results) => {
      this.locations = results;
    }); 
  }

  loadRoomData(id: string) {
    this.formSub = this.roomService.getRoomById(id).subscribe({
      next: (room: IRoom) => {
        this.roomForm.patchValue({
          slug: room.slug,
          floor: room.floor,
          capacity: room.capacity,
          hasMonitor: room.hasMonitor,
          location: room.location._id,
          status: room.status
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen kamergegevens:', err)
      }
    })
  }

  updateFloorOptions() {
    const selectedLocationId = this.roomForm.get('location')?.value;
    if (!selectedLocationId) {
      this.availableFloors = [];
      return;
    }
    
    const selectedLocation = this.locations.find(loc => loc._id === selectedLocationId);
    if (selectedLocation && selectedLocation.floors) {
      this.availableFloors = Array.from({length: selectedLocation.floors}, (_, i) => i);
    } else {
      this.availableFloors = [];
    }
    
    const currentFloor = this.roomForm.get('floor')?.value;
    if (currentFloor !== null && !this.availableFloors.includes(Number(currentFloor))) {
      this.roomForm.get('floor')?.setValue(null);
    }
  }

  onSubmit(): void {
    const data: ICreateRoom = {
      slug: this.roomForm.value.slug,
      floor: this.roomForm.value.floor,
      capacity: this.roomForm.value.capacity,
      hasMonitor: this.roomForm.value.hasMonitor,
      location: this.roomForm.value.location,
      status: this.roomForm.value.status
    }

    if(this.isEditMode) {
      this.roomService.update(data, this.existId).subscribe((updatedRoom) => {
        this.roomService.triggerRefresh();
        this.router.navigate(['rooms', updatedRoom._id]);
      })
    } else {
      this.roomService.create(data).subscribe(() => {
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
