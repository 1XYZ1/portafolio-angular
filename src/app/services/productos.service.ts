import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Productos[] = [];
  productosFiltrados: Productos[] = [];

  constructor( private http: HttpClient) {
    this.CargarProductos();
   }

   private CargarProductos() {

// Promesa
  return new Promise((resolve, reject) => {

    this.http.get('https://practica-angular-6a0e6.firebaseio.com/productos_idx.json').subscribe((resp: any[]) => {
this.productos = resp;
// console.log(resp);
this.cargando = false;
resolve();
});

  });


}
getProducto(id: string) {

return this.http.get(`https://practica-angular-6a0e6.firebaseio.com/productos/${id}.json`);




}
buscarProducto(termino: string) {

if (this.productos.length === 0) {
  // Cargar productos
this.CargarProductos().then(() => {
  // Ejecutar despues de tener los productos
  // Aplicar Filtro
  this.filtrarProductos(termino);

});
} else {
   this.filtrarProductos(termino);
}
}

private filtrarProductos(termino: string) {
// console.log(this.productos);
this.productosFiltrados = [];
termino = termino.toLocaleLowerCase();


this.productos.forEach(prod => {
  const tituloLower = prod.titulo.toLowerCase();

  if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
    this.productosFiltrados.push(prod);
  }
});



}

}

