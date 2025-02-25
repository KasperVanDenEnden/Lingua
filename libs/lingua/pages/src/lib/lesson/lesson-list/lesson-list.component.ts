import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICourse, ILesson, ILocation, IRoom, IUser } from '@lingua/api';
import { LessonService, NotificationService } from '@lingua/services';
import { ActivatedRoute } from '@angular/router';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-lesson-list',
  imports: [PagesModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
})
export class LessonListComponent implements OnInit, OnDestroy {
  lessons!: ILesson[] | null;
  sub!: Subscription;

  lessonList$?: Observable<ILesson[]>;

  isModalOpen = false;
  recordToDelete?: ILesson | null;

  constructor(private lessonService: LessonService, private route: ActivatedRoute, private notify: NotificationService) {}

  ngOnInit(): void {
    this.loadLessons();

    this.lessonService.refresh$.subscribe(() => {
      this.loadLessons();
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadLessons() {
    this.lessonList$ = this.lessonService.getLessons();
    this.sub = this.lessonService.getLessons().subscribe((results) => {
      this.lessons = results;
    });
  }

  getClass(lesson:ILesson) {
    return (lesson.course as ICourse)?.title || ''
  }

  getTeacher(lesson: ILesson): string {
    const teacher = lesson.teacher as IUser;
    if (!teacher) return '';
    return `${teacher.firstname || ''} ${teacher.lastname || ''}`.trim();
  }

  getRoom(lesson: ILesson): string | undefined {
    const room = lesson.room as IRoom;
    const location = room?.location as ILocation;
  
    if (!room || !location) return;
  
    return `${location.slug}-${room.floor}.${room.slug}`;
  }
  
  handleDelete(record: ILesson): void {
    console.log(record, 'record');
    this.recordToDelete = record;
    this.isModalOpen = true;
  }

  confirmDelete(): void {
    console.log('confirmed deletion');
    if (this.recordToDelete) {
      console.log('recordToDeleteIsSet', this.recordToDelete._id)
      this.lessonService.delete(this.recordToDelete._id).subscribe({
        next: () => {
          // Reload the list after successful deletion
          this.loadLessons();
          // Show success message (optional)
          this.notify.success('Gelukt!');
        },
        error: (error) => {
          console.error('Error deleting lesson:', error);
          // Show error message (optional)
        },
        complete: () => {
          // Reset the recordToDelete and close modal
          this.recordToDelete = null;
          this.isModalOpen = false;
        }
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
