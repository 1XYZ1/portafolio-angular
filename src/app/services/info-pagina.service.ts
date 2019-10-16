import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Productos } from '../interfaces/productos.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any [] = [];

  constructor( private http: HttpClient ) {
    this.CargarEquipo();
    this.CargarInfo();

  }
  private CargarInfo() {
    // console.log('Servicio de infoPagina listo');

    // Leer el archivo JSON
     this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {

          this.cargada = true;
          this.info = resp;
          console.log(resp);


        });


  }
  private CargarEquipo() {
   // console.log('Servicio de infoEquipo listo');

    this.http.get('https://practica-angular-6a0e6.firebaseio.com/equipo.json')
        .subscribe( (resp: Productos[]) => {
          this.equipo = resp;
     //    console.log(resp);
        });

  }

}
