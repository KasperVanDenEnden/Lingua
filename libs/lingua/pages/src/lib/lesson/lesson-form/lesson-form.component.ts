import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { IClass, ICreateLesson, Id, ILesson, IRoom, IUser } from '@lingua/api';
import { LessonService } from '../lesson.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Types } from 'mongoose';
import { UserService } from '../../user/user.service';
import { RoomService } from '../../room/room.service';
import { ClassService } from '../../class/class.service';

@Component({
  selector: 'lingua-lesson-form',
  imports: [CommonModule, LinguaCommonModule, ReactiveFormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css',
})
export class LessonFormComponent implements OnInit, OnDestroy {
  formSub?: Subscription;
  isEditMode?: boolean;
  existId!: Id;

  classes?: IClass[] | null;
  rooms?: IRoom[] | null;
  teachers?: IUser[] | null;
  filteredTeachers: IUser[] = [];

  lessonForm: FormGroup = new FormGroup({
    teacher: new FormControl(null, Validators.required),
    class: new FormControl(null, Validators.required),
    room: new FormControl(null, Validators.required),
    day: new FormControl(null, Validators.required),
    startTime: new FormControl(null, Validators.required),
    endTime: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private userService: UserService,
    private roomService: RoomService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.loadRooms();
    this.loadClasses();

    this.lessonForm.get('class')?.valueChanges.subscribe(() => {
      this.updateTeacherOptions();
    })

    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadLessonData(id);
        this.isEditMode = true;
        this.existId = new Types.ObjectId(id);
      } else {
        this.lessonForm.reset();
        this.isEditMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  loadTeachers() {
    this.userService.getUsers().subscribe((results) => {
      this.teachers = results.filter((user) => user.role === 'teacher');
    });
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((results) => {
      this.rooms = results;
    });
  }

  loadClasses() {
    this.classService.getClasses().subscribe((results) => {
      this.classes = results;
    });
  }

  loadLessonData(id: string) {
    this.formSub = this.lessonService.getLessonById(id).subscribe({
      next: (lesson: ILesson) => {
        this.lessonForm.patchValue({
          teacher: lesson.teacher._id,
          class: lesson.class._id,
          room: lesson.room._id,
          day: lesson.day,
          startTime: lesson.startTime,
          endTime: lesson.endTime,
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen lesgegevens:', err);
      },
    });
  }

  updateTeacherOptions() {
    console.log('updating teachers dropdown');
    const selectedClassId = this.lessonForm.get('class')?.value;
    if(!selectedClassId || !this.classes || !this.teachers) {
      this.filteredTeachers = [];
      return;
    }
    
    const selectedClass = this.classes.find(cl => cl._id === selectedClassId);
    if (selectedClass) {
      console.log('Filtering gestart');

      const assignedTeacherIds = [
        selectedClass.teacher,  // Hoofdleraar ID (direct toegevoegd)
        ...(Array.isArray(selectedClass.assistants) ? selectedClass.assistants : [])  // Assistants IDs (al als IDs)
      ].filter(id => id);
      
      console.log('Toegewezen leraren:', assignedTeacherIds);
      
      // 3. Filter leraren zodat ALLEEN de reeds toegewezen leraren in de dropdown blijven
      this.filteredTeachers = this.teachers.filter(teacher => assignedTeacherIds.includes(teacher._id));
    } else {
        this.filteredTeachers = [];
      }
    
    const currentTeacher = this.lessonForm.get('teacher')?.value;
    if (currentTeacher !== null && !this.filteredTeachers.includes(currentTeacher)) {
      this.lessonForm.get('teacher')?.setValue(null);
    }
  }

  onSubmit(): void {
    const data: ICreateLesson = {
      teacher: this.lessonForm.value.teacher,
      class: this.lessonForm.value.class,
      room: this.lessonForm.value.room,
      day: this.lessonForm.value.day,
      startTime: this.convertTimeStringToDate(this.lessonForm.value.startTime),
      endTime: this.convertTimeStringToDate(this.lessonForm.value.endTime),
    };

    if (this.isEditMode) {
      this.lessonService
        .update(data, this.existId)
        .subscribe((updatedLesson) => {
          this.lessonService.triggerRefresh();
          this.router.navigate(['lessons', updatedLesson._id]);
        });
    } else {
      this.lessonService.create(data).subscribe((lesson) => {
        this.lessonService.triggerRefresh();
        this.router.navigate(['/lessons']);
      });
    }
  }

  closeForm() {
    const currentUrl = this.router.url.split('/');
    currentUrl.pop();
    this.router.navigate([currentUrl.join('/')]);
  }

  convertTimeStringToDate(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
}
