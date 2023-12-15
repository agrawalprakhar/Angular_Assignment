import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      contactNumber: '1234567890',
      email: 'john@example.com',
      gender: 'Male',
      skills: [
        { name: 'Programming', experience: '{Exp. 3 years}' },
        { name: 'Design', experience: '{Exp. 2 years}' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      contactNumber: '9876543210',
      email: 'jane@example.com',
      gender: 'Female',
      skills: [
        { name: 'Programming', experience: '{Exp. 3 years}' }
      ]
    }
  ];
  constructor() {
    
   }

   isIdUnique(id: number): boolean {
    return !this.employees.some(employee => employee.id === id);
  }

  getEmployees(): Employee[] {
    return this.employees;
  }
  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
}


