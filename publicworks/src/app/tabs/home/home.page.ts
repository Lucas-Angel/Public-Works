import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-Home',
  templateUrl: 'Home.page.html',
  styleUrls: ['Home.page.scss']
})
export class HomePage implements OnInit{

  nome: string;
  foto: string;
  pegar: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit(){
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.nome = this.pegar.nome;
      this.foto = this.pegar.foto;
      console.log(this.pegar.nome);
    });
    console.log(this.storage);
    
  }

  editarPerfil(){
    this.router.navigate(['/editar-perfil/']);
  }
  
  logout(){
    this.storage.clear();
    console.log(this.storage);
    this.navCtrl.navigateForward(['/login']);
  }
}
