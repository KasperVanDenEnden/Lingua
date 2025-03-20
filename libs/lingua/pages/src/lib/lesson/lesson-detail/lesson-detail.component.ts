import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse, ILesson, ILocation, IRoom, IUser } from '@lingua/api';
import { Subscription, Observable } from 'rxjs';
import { LessonService, NotificationService } from '@lingua/services';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-lesson-detail',
  imports: [PagesModule],
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

  isModalOpen = false;
  recordToDelete?: ILesson | null;

  constructor(
    private lessonService: LessonService,
    private route:ActivatedRoute,
    private router:Router,
    private notify:NotificationService
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
          this.recordToDelete = lesson;
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

  handleDelete(): void {
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    if (this.recordToDelete) {
      this.lessonService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          this.notify.success('Gelukt!')
          this.router.navigate(['/lessons']);
        },
        error: (error) => {
          console.error('Error deleting lesson:', error);
          // Show error message (optional)
        },
      });
    }
  }
  
  closeModal(): void {
    console.log('close modal');
    this.isModalOpen = false;
  }

  isChildRouteActive(): boolean {
    return this.route.children.length > 0;
  }
}
