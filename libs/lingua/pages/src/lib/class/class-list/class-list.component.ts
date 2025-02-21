import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IClass } from '@lingua/api';
import { Observable, Subscription } from 'rxjs';
import { ClassService } from '../class.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-class-list',
  imports: [CommonModule, LinguaCommonModule, RouterModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css',
})
export class ClassListComponent implements OnInit, OnDestroy {
  classes?: IClass[] | null;
  sub!: Subscription;

  classList$?: Observable<IClass[]>;

  constructor(private classService: ClassService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadClasses();

    this.classService.refresh$.subscribe(() => {
      this.loadClasses();
    });
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  
  loadClasses() {
    this.classList$ = this.classService.getClasses();
    this.sub = this.classService.getClasses().subscribe((results) => {
      this.classes = results;
    });
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; 
  }
}
