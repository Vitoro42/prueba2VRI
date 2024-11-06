import { Component, OnInit } from '@angular/core';
// importamos los servicios
import {ProductoservicioService} from './../servicio/producto/productoservicio.service';
import {Producto} from './../interfaces/Producto';
// importacion ciclo de vida
import {ViewWillEnter, ViewDidLeave} from '@ionic/angular';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements ViewWillEnter, ViewDidLeave {
  // se agrega variable del array producto vacia
  public productos: Producto[] = [];
  private subscripcionProd!: Subscription;

  constructor(
    private servProd: ProductoservicioService

  ) { }

  
  ionViewWillEnter(): void {
    this.subscripcionProd = this.servProd.producto.subscribe(productos =>{
      this.productos = productos;
    });
    this.servProd.listaProductos();
  }

  ionViewDidLeave(): void {
    if(this.subscripcionProd){
      this.subscripcionProd.unsubscribe();
    }
  }

  public siguiente(){
    this.servProd.cargarMasProductos()
    
  }

}
