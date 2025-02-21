import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { IClass, ICreateLesson, Id, ILesson, ILocation, IRoom, IUser } from '@lingua/api';
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
    // Laad de docenten, kamers en klassen tegelijk
    forkJoin({
      teachers: this.userService.getUsers(),
      rooms: this.roomService.getRooms(),
      classes: this.classService.getClasses(),
    }).subscribe({
      next: (results) => {
        this.teachers = results.teachers.filter((user) => user.role === 'teacher');
        this.rooms = results.rooms;
        this.classes = results.classes;
  
        // Nadat de gegevens geladen zijn, laad je de lesgegevens (indien bewerken)
        this.route.parent?.paramMap.subscribe((params) => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.existId = new Types.ObjectId(id);
            this.loadLessonData(id); // Laad les na het ophalen van docenten
          } else {
            this.lessonForm.reset();
            this.isEditMode = false;
          }
        });
      },
      error: (err) => {
        console.error('Fout bij het ophalen van gegevens:', err);
      }
    });
  }
  

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  loadLessonData(id: string) {
    this.formSub = this.lessonService.getLessonById(id).subscribe({
      next: (lesson: ILesson) => {
        // Update de form-waarden
        this.lessonForm.patchValue({
          teacher: lesson.teacher._id,
          class: lesson.class._id,
          room: lesson.room._id,
          day: formatDate(lesson.day, 'yyyy-MM-dd', 'en'),
          startTime: formatDate(lesson.startTime, 'HH:mm', 'en'),
          endTime: formatDate(lesson.endTime, 'HH:mm', 'en'),
        });
  
        // Update de leraar-opties nadat de formulierwaarden zijn gepatcht
        this.updateTeacherOptions();
  
        // Selecteer de juiste leraar in de dropdown
        this.lessonForm.get('teacher')?.setValue(lesson.teacher._id);
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

  getRoomSlug(room: IRoom): string {
    console.log(room, 'getRoomSlug');
    const location = room.location as ILocation;


    return `${location.slug}-${room.floor}.${room.slug}`
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
