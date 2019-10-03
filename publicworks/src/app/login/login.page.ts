import { Component } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostProvider } from '../provider/post-provider';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email:String = "";
  senha:String ="";

  constructor(
    private router:Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private navCtrl:NavController
  ) { }

  
  async login(){
    if(this.email==""){
      
      const toast = await this.toastCtrl.create({
        message: 'Digite o E-Mail' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.senha==""){
      const toast = await this.toastCtrl.create({
        message: 'Digite a senha' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else{
      let body = {
        email: this.email,
        senha: this.senha,
        crud: "login"
      }

      this.postPvdr.postData(body, 'select.php').subscribe(async data =>{
        if(data.success){
          this.storage.set('session_storage', data.result);
          this.router.navigate(['/tabs/home']);
        }else{
          const toast = await this.toastCtrl.create({
            message: 'Login ou senha inválidos.',
            duration: 2000
          });
          toast.present();
        }
      })
    }
  }

  registrar(){
    this.navCtrl.navigateForward(['/registro']);
 
  }

}
