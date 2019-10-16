import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Productos[] = [];

  constructor( private http: HttpClient) {
    this.CargarProductos();

   }
   private CargarProductos() {
this.http.get('https://practica-angular-6a0e6.firebaseio.com/productos_idx.json').subscribe((resp: any[]) => {
this.productos = resp;
console.log(resp);
this.cargando = false;
} );

   }
}
