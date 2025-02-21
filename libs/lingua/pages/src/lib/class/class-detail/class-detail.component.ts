import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinguaCommonModule } from '@lingua/common';
import { Observable, Subscription } from 'rxjs';
import { ClassService } from '../class.service';
import { IClass, IUser } from '@lingua/api';
import { UserService } from '../../user/user.service';
import { FormsModule } from '@angular/forms';
import { ClassAssistantService } from '../class-assistant.service';

@Component({
  selector: 'lingua-class-detail',
  imports: [CommonModule, RouterModule, LinguaCommonModule, FormsModule],
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.css',
})
export class ClassDetailComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  class$!: Observable<IClass>;
  classId?: string | null;

  teacher?: IUser | null;
  assistants?: IUser[] | null;
  availableTeachers?: IUser[] | null;
  selectedTeacher?: IUser | null;

  constructor(
    private classService: ClassService,
    private classAssistantService: ClassAssistantService,
    private route: ActivatedRoute,
    private userService: UserService
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

    if(this.classId) {
      this.classAssistantService.addAssistant(teacher._id, this.classId).subscribe({
        next: (response) => {
          console.log("Assistant successfully assigned:");
          this.classService.triggerRefresh();
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

    if(this.classId) {
      this.classAssistantService.removeAssistant(teacher._id, this.classId).subscribe({
        next: (response) => {
          console.log("Assistant successfully removed:");
          this.classService.triggerRefresh();
        },
        error: (error) => {
          console.error("Failer to remove assistant:", error)
        }
      })
    }
  }
}
