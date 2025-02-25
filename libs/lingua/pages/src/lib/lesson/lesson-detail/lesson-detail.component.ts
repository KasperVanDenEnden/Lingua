import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ICourse, ILesson, ILocation, IRoom, IUser } from '@lingua/api';
import { Subscription, Observable } from 'rxjs';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'lingua-lesson-detail',
  imports: [CommonModule, LinguaCommonModule, RouterModule],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.css',
})
export class LessonDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  lesson$!: Observable<ILesson>;
  lessonId?: string | null;
  room?: IRoom | null;
  location?: ILocation | null;
  course?: ICourse | null;
  teacher?: IUser | null;

  constructor(
    private lessonService: LessonService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadLesson();
    
    this.lessonService.refresh$.subscribe(() => {
      this.loadLesson();
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadLesson() {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.lessonId = params.get('id');

      if (this.lessonId) {
        this.lesson$ = this.lessonService.getLessonById(this.lessonId);
        this.lesson$.subscribe(lesson => {
          this.room = lesson.room as IRoom;
          this.location = this.room.location as ILocation;
          this.course = lesson.course as ICourse;
          this.teacher = lesson.teacher as IUser;
        })
      }
    });
  }

  getRoomSlug(): string {
    return `${this.location?.slug}-${this.room?.floor}.${this.room?.slug}`
  }

  getTeacher(): string {
    return `${this.teacher?.firstname} ${this.teacher?.lastname} ( ${this.teacher?.email} )`
  }

  getClass(): string {
    return `${this.course?.title}: ${this.course?.description}`
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0;
  }
}
