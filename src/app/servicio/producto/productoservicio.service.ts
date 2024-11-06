import { Injectable } from '@angular/core';
// Importamos interfaces
import {Producto} from './../../interfaces/Producto';
import {ResProducto} from './../../interfaces/ResProducto';
//importamos comportamientos
import {BehaviorSubject} from 'rxjs';
// importamos httpcliente
import {HttpClient} from '@angular/common/http';
// importamos el auth para utilizar el token
import {AuthserviceService} from './../auth/authservice.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoservicioService {
  private readonly URL_PRODUCTOS = 'https://dummyjson.com/auth/products';
  
  private salto = 0;
  private cantSalto =30;
  private $productos= new BehaviorSubject<Producto[]>([]);
  public producto = this.$productos.asObservable();
  private total = 0;

  constructor(
    //Inyectamos http y auth
    private http: HttpClient,
    private auth: AuthserviceService,

  ) { }

  public listaProductos(){
    const nuevaUrl = `${this.URL_PRODUCTOS}?limit=${this.cantSalto}&skip=0`;
    
    this.http.get<ResProducto>(nuevaUrl,{
      headers: {
        'Authorization' : 'Bearer '+this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos =>{
      this.$productos.next(datos.products);
      this.total = datos.total;

    });
  }

  
  public cargarMasProductos() {
    //comprueba si hay productos
    if (this.salto >= this.total) {
      
      return;
    }

    this.salto += this.cantSalto;
    const nuevaUrl = `${this.URL_PRODUCTOS}?limit=${this.cantSalto}&skip=${this.salto}`;

    this.http.get<ResProducto>(nuevaUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      const productosActuales = this.$productos.getValue();
      this.$productos.next([...productosActuales, ...datos.products]);
    });
  
  }
  


}
 