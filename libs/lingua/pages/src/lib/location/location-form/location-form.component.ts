import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '@lingua/services';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICreateLocation, Id, ILocation, IUser } from '@lingua/api';
import { LinguaCommonModule } from '@lingua/common';
import { Types } from 'mongoose';
import { AuthService } from '@lingua/services';

@Component({
  selector: 'lingua-location-form',
  imports: [CommonModule, ReactiveFormsModule, LinguaCommonModule],
  templateUrl: './location-form.component.html',
  styleUrl: './location-form.component.css',
})
export class LocationFormComponent implements OnInit, OnDestroy {
  formSub?: Subscription;
  isEditMode?: boolean;
  existId!: Id;

  locationForm: FormGroup = new FormGroup({
    slug: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
    number: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    postal: new FormControl(null, Validators.required),
    province: new FormControl(null, Validators.required),
    createdBy: new FormControl(null, Validators.required),
    rooms: new FormControl(null, Validators.required),
    floors: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // Edit bestaande locatie
        this.loadLocationData(id);
        this.isEditMode = true;
        this.existId = new Types.ObjectId(id);
      } else {
        // Nieuwe locatie aanmaken
        this.initializeNewLocation();
        this.isEditMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  initializeNewLocation(): void {
    // Reset alle velden naar de begintoestand
    this.locationForm.reset();
    
    this.auth.getUserFromLocalStorage().subscribe(
      (user: IUser | null) => {
        if (user) {
          const { id } = user;
          this.locationForm.patchValue({
            createdBy: id
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadLocationData(id: string): void {
    this.formSub = this.locationService.getLocationById(id).subscribe({
      next: (location: ILocation) => {
        // Update de bestaande form controls met nieuwe waarden
        this.locationForm.patchValue({
          slug: location.slug,
          street: location.street,
          number: location.number,
          city: location.city,
          postal: location.postal,
          province: location.province,
          createdBy: location.createdBy,
          rooms: location.rooms,
          floors: location.floors,
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen locatiegegevens:', err);
      },
    });
  }

  onSubmit(): void {
    const data: ICreateLocation = {
      slug: this.locationForm.value.slug,
      number: this.locationForm.value.number,
      street: this.locationForm.value.street,
      city: this.locationForm.value.city,
      postal: this.locationForm.value.postal,
      province: this.locationForm.value.province,
      createdBy: this.locationForm.value.createdBy,
      rooms: this.locationForm.value.rooms,
      floors: this.locationForm.value.floors,
    }

    if (this.isEditMode) {
      // update
      this.locationService.update(data, this.existId).subscribe((updatedLocation) => {
        this.locationService.triggerRefresh(); 
          this.router.navigate(['/locations', updatedLocation._id])
        }
      )
    } else {
      // create
      this.locationService.create(data).subscribe((location) => {
        this.locationService.triggerRefresh(); 
        this.router.navigate(['/locations']);
      })
    }
  }

  closeForm() {
    const currentUrl = this.router.url.split('/');
    currentUrl.pop();
    this.router.navigate([currentUrl.join('/')]);
  }
}
