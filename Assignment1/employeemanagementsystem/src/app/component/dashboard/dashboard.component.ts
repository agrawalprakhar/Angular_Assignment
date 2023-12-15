import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  employeeToDelete: Employee | null = null;
  deleteMessage = '';
  deleteMessageVisible = false;

  constructor(  private employeeService: EmployeeService) {}
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  prepareToDelete(employee: Employee): void {
    this.employeeToDelete = employee;
    this.deleteMessage = `Are you sure you want to delete ${employee.name}?`;
  }
  cancelDelete(): void {
    this.employeeToDelete = null;
    this.deleteMessage = '';
  }

  confirmDelete(): void {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete.id);
      this.deleteMessage = `The Employee ${this.employeeToDelete.name} is deleted successfully.`;
      this.deleteMessageVisible = true;
      setTimeout(() => {
        this.deleteMessage = '';
        this.deleteMessageVisible = false;
        this.loadEmployees();
      }, 2000);
    }
    this.employeeToDelete = null;
  }
}
