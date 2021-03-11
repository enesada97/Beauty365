import { Department } from './department.model';
import { Doctor } from './doctor.model';

export class DepForDocDto {
    department:Department
    doctor:Doctor;
    constructor(depForDocDto) {
      {
        this.department= depForDocDto.department || '';
        this.doctor = depForDocDto.doctor || '';
      }
    }
  }
  
  