import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';
import { ReservaModel } from 'src/app/models/reserva-model';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reserva-picker',
  templateUrl: './reserva-picker.component.html',
  styleUrls: ['./reserva-picker.component.css']
})
export class ReservaPickerComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  idCasa: string = this.aRoute.snapshot.params.id;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  reserva: ReservaModel = {};
  fechaInicio?: string;
  fechaFin?: string;

  constructor(calendar: NgbCalendar, private aRoute: ActivatedRoute, private reservasService:ReservasService, private router:Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;

      if(this.toDate.day.toString().length < 2 && this.toDate.month.toString().length < 2){

        this.fechaFin = `${this.toDate?.year}-0${this.toDate?.month}-0${this.toDate?.day}`

      }else if(this.toDate.day.toString().length < 2 && this.toDate.month.toString().length === 2){

        this.fechaFin = `${this.toDate?.year}-${this.toDate?.month}-0${this.toDate?.day}`

      }else if(this.toDate.day.toString().length === 2 && this.toDate.month.toString().length < 2){

        this.fechaFin = `${this.toDate?.year}-0${this.toDate?.month}-${this.toDate?.day}`

      }else{
        this.fechaFin = `${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`
      }
      

    } else {
      this.toDate = null;
      this.fromDate = date;
      
      if(this.fromDate.day.toString().length < 2 && this.fromDate.month.toString().length < 2){

        this.fechaInicio = `${this.fromDate?.year}-0${this.fromDate?.month}-0${this.fromDate?.day}`

      }else if(this.fromDate.day.toString().length < 2 && this.fromDate.month.toString().length === 2){

        this.fechaInicio = `${this.fromDate?.year}-${this.fromDate?.month}-0${this.fromDate?.day}`

      }else if(this.fromDate.day.toString().length === 2 && this.fromDate.month.toString().length < 2){

        this.fechaInicio = `${this.fromDate?.year}-0${this.fromDate?.month}-${this.fromDate?.day}`

      }else{
        this.fechaInicio = `${this.fromDate?.year}-${this.fromDate?.month}-${this.fromDate?.day}`
      }

    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  ngOnInit(): void {
  }

  corregirFechas() {
    this.reserva.fechaInicio = this.fechaInicio;
    this.reserva.fechaFin = this.fechaFin;
  }

  asignarReserva() {
    this.corregirFechas()
    this.reserva.idCasa = this.idCasa;

    this.reservasService.crearReserva(this.reserva).subscribe(data =>{
      alert('Reserva hecha satisfactoriamente, serás redirigido al menú principal');
      this.router.navigate(['dashboard']);
    }, error =>{
      console.log(error);
      alert('Fallo al realizar la reserva, intente de nuevo con otra fecha o mas tarde');
    })

  }

  

}
