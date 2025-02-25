import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationService } from '@lingua/services';
import { ILocation, IUser } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-location-detail',
  imports: [CommonModule, RouterModule, LinguaCommonModule],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css',
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  location$!: Observable<ILocation>;
  locationId?: string | null;
  createdByUser?: IUser | null;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
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
        });
      }
    });
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
