import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent  {

  employeeForm!: FormGroup ;
  isEdit: boolean = false;
  employee: Employee | undefined;
  employeeId: any;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.formBuilder.group({
      id: ['', Validators.required], // ID field added
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
      skills: this.formBuilder.array([
        this.createSkillFormGroup()
      ])
    });
  }
  createSkillFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      experience: ['', Validators.required]
    });
  }

  get skillsArray(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }
  addSkill(): void {
    const skillsArray = this.employeeForm.get('skills') as FormArray;
    skillsArray.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    const skillsArray = this.employeeForm.get('skills') as FormArray;
    if (skillsArray.length > 1) {
      skillsArray.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.isEdit = true;
      this.loadEmployeeDetails();
    }
  }

  loadEmployeeDetails(): void {
    const employee = this.employeeService.getEmployeeById(this.employeeId!);
    if (employee) {
      this.employeeForm.patchValue(employee);
    } else {
      alert('Employee Not Found')
    }
  }

  populateSkills(): void {
    if (this.employee && this.employee.skills.length > 0) {
      const skillsArray = this.employeeForm.get('skills') as FormArray;
      this.employee.skills.forEach((skill: any) => {
        skillsArray.push(
          this.formBuilder.group({
            name: [skill.name, Validators.required],
            experience: [skill.experience, Validators.required]
          })
        );
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      if (this.isEdit) {
        this.employeeService.updateEmployee(formData);
        this.router.navigate(['/employees']);
      } else {
        // Check if the ID is unique
      if (this.employeeService.isIdUnique(formData.id)) {
        // Add the new employee if the ID is unique
        this.employeeService.addEmployee(formData);
        this.router.navigate(['/employees']);
      } else {
        // Handle scenario where ID is not unique (display error, prevent submission, etc.)
        console.log('Employee ID already exists. Please Enter Another One');
        // You can also display an error message to the user
      }

      }

    }
  }
}

