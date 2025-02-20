import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../location.service';
import { ILocation } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-location-list',
  imports: [CommonModule, LinguaCommonModule, RouterModule],
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
