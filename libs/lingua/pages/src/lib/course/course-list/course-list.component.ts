import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourse } from '@lingua/api';
import { CourseService, NotificationService } from '@lingua/services';
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

    isModalOpen = false;
    recordToDelete?: ICourse | null;
  
    constructor(private courseService: CourseService, private route: ActivatedRoute, private notify:NotificationService) {}
  
    ngOnInit(): void {
      this.loadCourses();
  
      this.courseService.refresh$.subscribe(() => {
        this.loadCourses();
      });
    }
    
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
    
    loadCourses() {
      this.courseList$ = this.courseService.getCourses();
      this.sub = this.courseService.getCourses().subscribe((results) => {
        this.courses = results;
      });
    }

     handleDelete(record: ICourse): void {
        this.recordToDelete = record;
        this.isModalOpen = true;
      }
    
      confirmDelete(): void {
        if (this.recordToDelete) {
          this.courseService.delete(this.recordToDelete._id).subscribe({
            next: () => {
              this.loadCourses();
              this.notify.success('Gelukt!');
            },
            error: (error) => {
              this.notify.error(error);
            },
            complete: () => {
              this.recordToDelete = null;
              this.isModalOpen = false;
            },
          });
        }
      }
    
      closeModal(): void {
        this.isModalOpen = false;
      }
  
    isChildRouteActive(): boolean {
      return this.route.children.length > 0; 
    }
}
