import { Component} from '@angular/core';
// se importa el viewwillenter 
import {ViewWillEnter, ViewDidLeave} from '@ionic/angular';
// Se importan los formBuilder, formGroup y Validators de angular forms
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// importamos el servicio
import {AuthserviceService} from './../servicio/auth/authservice.service';
// se importa la suscripcion
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewWillEnter, ViewDidLeave {
  // se crea variable para el formulaio vacio
  public formulario!: FormGroup;
  public bloqueoCarga : boolean = false;
  private subcripcionCarga!: Subscription;

  constructor(
    // se inyectan los form y el authservicio
    private formb: FormBuilder,
    private auth: AuthserviceService,

  ) {  
    this.formulario = formb.group({
      usuario: ['',[Validators.required]],
      contrasenia: ['',[Validators.required]]
    })
  }

  //metodo para validar con el submit
  public validacionFormulario(){
    // se crea la constante
    const valida = this.formulario.valid;

    if(!valida){
      console.log('pasa aqui')
      return
    } 
    const datos = this.formulario.getRawValue();
    const usuario = datos['usuario'];
    const contrasenia = datos['contrasenia'];
    // se agraga el metodo de iniciar sesion authservice
    this.auth.inicioSesion(usuario, contrasenia)
  } 

  // se cambia el onInit por ionviewwillenter y se genera el metodo
  public ionViewWillEnter(): void {
    this.subcripcionCarga = this.auth.cargando.subscribe(nuevoValor => {
      this.bloqueoCarga = nuevoValor;
    });

    

  }

  // se agrega el viewdidleave
  public ionViewDidLeave(): void {
    if(this.subcripcionCarga){
      this.subcripcionCarga.unsubscribe()
    }
  }

}
