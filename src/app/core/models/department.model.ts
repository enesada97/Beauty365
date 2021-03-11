import { Doctor } from './doctor.model';

export class Department {
    id: number;
    departmentName: string;
    status:boolean;
    doctors:Doctor[];
    constructor(department) {
      {
        this.id = department.id || 0;
        this.departmentName = department.departmentName || '';
        this.doctors = department.doctors || '';
        this.status = department.status || true;
      }
    }
  }
  
  