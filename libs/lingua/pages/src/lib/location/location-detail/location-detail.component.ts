import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatService, LocationService, NotificationService } from '@lingua/services';
import { ILocation, IUser } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-location-detail',
  imports: [PagesModule],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css',
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  location$!: Observable<ILocation>;
  locationId?: string | null;
  createdByUser?: IUser | null;

  isModalOpen = false;
  recordToDelete?: ILocation | null;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private notify:NotificationService,
    private router:Router,
    private format: FormatService
  ) {}

  ngOnInit(): void {
    this.loadLocation();

    this.locationService.refresh$.subscribe(() => {
      this.loadLocation();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadLocation() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');

      if (this.locationId) {
        this.location$ = this.locationService.getLocationById(this.locationId);
        this.location$.subscribe(location => {
          this.createdByUser = location.createdBy as IUser;
          this.recordToDelete = location;
        });
      }
    });
  }

  getLocationAddress(location: ILocation | null): string {
    if(!location) return '';
    return this.format.getLocationAddress(location);
  }

  handleDelete(): void {
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.locationService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.notify.success('Gelukt!')
          this.router.navigate(['/locations']);
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
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
