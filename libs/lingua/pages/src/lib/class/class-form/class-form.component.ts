import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClassService } from '../class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Id, IClass, IUser, ICreateClass } from '@lingua/api';
import { Subscription } from 'rxjs';
import { Types } from 'mongoose';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'lingua-class-form',
  imports: [CommonModule, LinguaCommonModule, ReactiveFormsModule],
  templateUrl: './class-form.component.html',
  styleUrl: './class-form.component.css',
})
export class ClassFormComponent implements OnInit, OnDestroy {
  formSub?: Subscription;
  isEditMode?: boolean;
  existId!: Id;

  teachers: IUser[] = [];

  classForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    language: new FormControl(null, Validators.required),
    teacher: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.route.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadClassData(id);
        this.isEditMode = true;
        this.existId = new Types.ObjectId(id);
      } else {
        this.initializeNewClass();

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

  initializeNewClass() {
    this.classForm.reset();
    this.classForm.patchValue({ status: 'Active' });
  }

  loadClassData(id: string) {
    this.formSub = this.classService.getClassById(id).subscribe({
      next: (classData: IClass) => {
        this.classForm.patchValue({
          status: classData.status,
          title: classData.title,
          description: classData.description,
          language: classData.language,
          teacher: classData.teacher._id,
        });
      },
      error: (err) => {
        console.error('Fout bij ophalen kamergegevens:', err);
      },
    });
  }

  onSubmit(): void {
    const data: ICreateClass = {
      status: this.classForm.value.status,
      teacher: this.classForm.value.teacher,
      title: this.classForm.value.title,
      description: this.classForm.value.description,
      language: this.classForm.value.language,
    };

    if (this.isEditMode) {
      this.classService.update(data, this.existId).subscribe((updatedClass) => {
        this.classService.triggerRefresh();
        this.router.navigate(['classes', updatedClass._id]);
      });
    } else {
      this.classService.create(data).subscribe((result) => {
        this.classService.triggerRefresh();
        this.router.navigate(['/classes']);
      });
    }
  }

  closeForm() {
    const currentUrl = this.router.url.split('/');
    currentUrl.pop();
    this.router.navigate([currentUrl.join('/')]);
  }
}
