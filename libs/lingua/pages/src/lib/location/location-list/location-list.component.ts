import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService, NotificationService } from '@lingua/services';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ILocation } from '@lingua/api';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-location-list',
  imports: [PagesModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations?: ILocation[] | null;
  sub!: Subscription;

  locationList$?: Observable<ILocation[]>;

  isModalOpen = false;
  recordToDelete?: ILocation | null;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadLocations();

    this.locationService.refresh$.subscribe(() => {
      this.loadLocations();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadLocations(): void {
    this.locationList$ = this.locationService.getLocations();
    this.sub = this.locationService.getLocations().subscribe((results) => {
      this.locations = results;
    });
  }

  handleDelete(record: ILocation): void {
    this.recordToDelete = record;
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.locationService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.loadLocations();
          this.notify.success('Gelukt!');
        },
        error: (error) => {
          this.notify.error(error);
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
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
