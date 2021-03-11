import { AppointmentService } from 'src/app/core/service/appointment.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventInput } from '@fullcalendar/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDto } from 'src/app/core/models/appointmentdto.model';
import { MatRadioChange } from '@angular/material/radio';
import trLocale from '@fullcalendar/core/locales/tr';
import { Appointment } from 'src/app/core/models/appointment.model';
const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

@Component({
  selector: 'app-appointments-calendar',
  templateUrl: './appointments-calendar.component.html',
  styleUrls: ['./appointments-calendar.component.sass']
})
export class AppointmentsCalendarComponent {
}
