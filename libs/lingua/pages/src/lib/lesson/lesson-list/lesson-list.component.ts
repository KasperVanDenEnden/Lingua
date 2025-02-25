import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import { Observable, Subscription } from 'rxjs';
import { ICourse, ILesson, ILocation, IRoom, IUser } from '@lingua/api';
import { LessonService } from '../lesson.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'lingua-lesson-list',
  imports: [CommonModule, LinguaCommonModule, RouterModule],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.css',
})
export class LessonListComponent implements OnInit, OnDestroy {
  lessons!: ILesson[] | null;
  sub!: Subscription;

  lessonList$?: Observable<ILesson[]>;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) {}

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
  

  isChildRouteActive(): boolean {
    return this.route.children.length > 0; 
  }
}
