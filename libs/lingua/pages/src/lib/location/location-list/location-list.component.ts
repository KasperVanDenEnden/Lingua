import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '@lingua/services';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ILocation } from '@lingua/api';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-location-list',
  imports:[PagesModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css',
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations?: ILocation[] | null;
  sub!: Subscription;

  locationList$?: Observable<ILocation[]>;

  constructor(private locationService: LocationService, private route:ActivatedRoute) {}
  
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
    this.sub = this.locationService.getLocations().subscribe((results)=> {
      this.locations = results
    });
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
