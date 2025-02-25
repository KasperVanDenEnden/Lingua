import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from '@lingua/api';
import { CourseService } from '@lingua/services';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-course-list',
  imports: [PagesModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit, OnDestroy {
    courses?: ICourse[] | null;
    sub!: Subscription;
  
    courseList$?: Observable<ICourse[]>;
  
    constructor(private courseService: CourseService, private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.loadClasses();
  
      this.courseService.refresh$.subscribe(() => {
        this.loadClasses();
      });
    }
    
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
    
    loadClasses() {
      this.courseList$ = this.courseService.getCourses();
      this.sub = this.courseService.getCourses().subscribe((results) => {
        this.courses = results;
      });
    }
  
    isChildRouteActive(): boolean {
      return this.route.children.length > 0; 
    }
}
