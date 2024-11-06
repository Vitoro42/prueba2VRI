import { Injectable } from '@angular/core';
// Importamos el HttpClient
import {HttpClient} from '@angular/common/http';
// importamos las intefaces
import {LoginCuerpo} from './../../interfaces/LoginCuerpo';
import {LoginUsuario} from './../../interfaces/LoginUsuario';
// importamos los comportamientos de los observables
import {BehaviorSubject} from 'rxjs';
// se importa el router para redireccionar a la pagina de poductos
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  //creamos solicitud a la URL de DUMMY
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';

  // Agregamos variables publicas y guardamos token
  public loginUsuario: LoginUsuario | null = null;
  public accessToken: string | null = null;
  // Agragamos los observadores
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    //inyectamos el HttpCliente
    private http: HttpClient,
    //inyectamos el Router
    private router: Router,
    
  ) { 

  }
  // creamos el metodo para iniciar sesion
  public inicioSesion(user: string, contrasenia: string){
    // activa el observable cargando
    this.$cargando.next(true);

    // cramos la constante
    const cuerpo: LoginCuerpo = {
      username: user,
      password: contrasenia,
    }
    // realizamos la peticion a internet
    this.http.post<LoginUsuario>(this.URL_LOGIN, JSON.stringify(cuerpo),{
      // se agrega la cabecera
      headers:{
        'Content-Type': 'application/json'
      }
    })
    // nos suscribimos para recibir el resultado
    .subscribe(resultado => {
      this.loginUsuario = resultado;
      this.accessToken = resultado.accessToken;
      this.$cargando.next(false);
      this.router.navigate(['/','productos']);
      console.log(resultado);
    })
  }  

  // creamos el metodo de cierre de sesion
  public cierreSesion(){
    if(this.loginUsuario){
      // Los valores vuelven a ser nulos
      this.loginUsuario = null;
      this.accessToken = null;
    }
  }
}
