import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse, IUser } from '@lingua/api';
import { Subscription, Observable } from 'rxjs';
import { PagesModule } from '../../pages.module';
import { CourseService, CourseAssistantService, UserService } from '@lingua/services';

@Component({
  selector: 'lingua-course-detail',
  imports: [PagesModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
    course$!: Observable<ICourse>;
    courseId?: string | null;
  
    teacher?: IUser | null;
    assistants?: IUser[] | null;
    availableTeachers?: IUser[] | null;
    selectedTeacher?: IUser | null;
  
    constructor(
      private courseService: CourseService,
      private courseAssistantService: CourseAssistantService,
      private route: ActivatedRoute,
      private userService: UserService
    ) {}
  
    ngOnInit(): void {
      this.loadCourse();
  
      this.courseService.refresh$.subscribe(() => {
        this.loadCourse();
      });
    }
    
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
  
    loadCourse() {
      this.sub = this.route.paramMap.subscribe((params) => {
        this.courseId = params.get('id');
  
        if (this.courseId) {
          this.course$ = this.courseService.getCourseById(this.courseId);
          this.course$.subscribe( courseData => {
            this.teacher = courseData.teacher as IUser;
            this.assistants = courseData.assistants as IUser[];
             
            this.userService.getUsers().subscribe(users => {
              const allTeachers = users.filter(user => user.role === 'teacher');
  
              this.availableTeachers = allTeachers.filter(teacher => {
                const isNotCurrentTeacher = teacher._id !== this.teacher?._id;
                const isNotAssistant = !this.assistants?.some(assistant => assistant?._id === teacher?._id);
                return isNotCurrentTeacher && isNotAssistant;
              });
            })
          })
        }
      });
    }
  
    isChildRouteActive(): boolean {
      return this.route.children.length > 0; // Checkt of er een child actief is
    }
  
    assignAssistant(teacher: IUser) {
      if (!teacher) {
        console.log("No teacher selected.");
        return;
      }
  
      if(this.courseId) {
        this.courseAssistantService.addAssistant(teacher._id, this.courseId).subscribe({
          next: (response) => {
            console.log("Assistant successfully assigned:");
            this.courseService.triggerRefresh();
          },
          error: (error) => {
            console.error("Failed to assign assistant:", error);
          }
        });
      }
    }
  
    removeAssistant(teacher: IUser) {
      if(!teacher) {
        console.log("No teacher selected.");
        return;
      }
  
      if(this.courseId) {
        this.courseAssistantService.removeAssistant(teacher._id, this.courseId).subscribe({
          next: (response) => {
            console.log("Assistant successfully removed:");
            this.courseService.triggerRefresh();
          },
          error: (error) => {
            console.error("Failer to remove assistant:", error)
          }
        })
      }
    }
}
