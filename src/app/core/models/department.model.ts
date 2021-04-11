import { Doctor } from './doctor.model';

export class Department {
    id?: number;
    departmentName?: string;
    status:boolean;
    constructor(department) {
      {
        this.id = department.id || 0;
        this.departmentName = department.departmentName || '';
        this.status = department.status || true;
      }
    }
  }

