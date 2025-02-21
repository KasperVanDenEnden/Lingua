import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinguaCommonModule } from '@lingua/common';
import { Observable, Subscription } from 'rxjs';
import { ClassService } from '../class.service';
import { IClass, IUser } from '@lingua/api';

@Component({
  selector: 'lingua-class-detail',
  imports: [CommonModule, RouterModule, LinguaCommonModule],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css',
})
export class ClassDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  class$!: Observable<IClass>;
  classId?: string | null;

  teacher?: IUser | null;
  assistants?: IUser[] | null;

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadClass();

    this.classService.refresh$.subscribe(() => {
      this.loadClass();
    });
  }
  
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadClass() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.classId = params.get('id');

      if (this.classId) {
        this.class$ = this.classService.getClassById(this.classId);
        this.class$.subscribe( classData => {
          this.teacher = classData.teacher as IUser;
          this.assistants = classData.assistants as IUser[];
        })
      }
    });
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; // Checkt of er een child actief is
  }
}
