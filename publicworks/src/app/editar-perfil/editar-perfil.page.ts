import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage {
  
  id:number;
  senha:string;
  foto:string;
  pegar: any;
  caminho:string="http://localhost:8080/publicworks/img/";
  caminhoImagem; 
  url="";
  nomeImagem;
  imgData;

  constructor(
    private router:Router,
    private storage: Storage,
    public alert: AlertController,
    public toastCtrl: ToastController,
    private provider:PostProvider,
    private actionSheetController: ActionSheetController
    ) { }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.id = this.pegar.codigo;
      this.senha = this.pegar.senha;
      this.foto = this.pegar.foto;
      
    });
  }

  voltar(){
    this.router.navigate(['/tabs/home']);
  }
  async editarFoto(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Pegar Imagem',
      buttons: [{
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          
        }
      }, {
        text: 'Galeria',
        icon: 'image',
        handler: () => {
          
          
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
  async editarEmail(){
    const alert = await this.alert.create({
      header: 'Editar E-Mail',
      inputs: [{
        name: 'email',
        type: 'text',
        placeholder: 'E-Mail'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            ;
          }
        }, {
          text: 'Editar',
          handler: () => {
            
          }
        }
      ],
  
    });

    await alert.present();
  }

  async editarSenha(){
    const alert = await this.alert.create({
      header: 'Editar Senha',
      inputs: [
        {
        name: 'senha',
        type: 'password',
        placeholder: 'Senha antiga'
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha'
        },
        {
          name: 'confNovaSenha',
          type: 'password',
          placeholder: 'Confirmar nova senha'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, {
          text: 'Editar',
          handler: async (data) => {
            if(data.senha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a senha antiga',
                duration: 2000
              });
              toast.present()
            }else if(data.novaSenha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a nova senha',
                duration: 2000
              });
              toast.present()
            }else if(data.confNovaSenha==""){
              const toast = await this.toastCtrl.create({
                message: 'Digite a confirmação da nova senha',
                duration: 2000
              });
              toast.present()
            }else if(data.novaSenha!=data.confNovaSenha){
              const toast = await this.toastCtrl.create({
                message: 'Senhas diferentes',
                duration: 2000
              });
              toast.present()
            }else if(data.senha!=this.senha){
              const toast = await this.toastCtrl.create({
                message: 'Senha antiga incorreta',
                duration: 2000
              });
              toast.present()
            }else{
              let body = {
                id: this.id,
                senha: data.novaSenha,
                crud: 'editarSenha'
              }
              this.provider.postData(body, 'update.php').subscribe(async data=>{
                if(data.success){
                  const toast = await this.toastCtrl.create({
                    message: 'Senhas atualizadas com sucesso' ,
                    duration: 2000,
                    position: 'bottom',
                    color: 'dark'
                  });
                  toast.present();
                }else{
                  const toast = await this.toastCtrl.create({
                    message: data.msg ,
                    duration: 2000,
                    position: 'bottom',
                    color: 'dark'
                  });
                  toast.present();
                }
              })
            }
          }
        }
      ],
  
    });

    await alert.present();
  }
  
  async editarNotificacao(){
    const alert = await this.alert.create({
      header: 'Receber notificações via...',
      mode: 'md',
      inputs: [
        
        {
          
          name: 'radio',
          type: 'radio',
          label: 'App'
        },
        {
        name: 'radio1',
        type: 'radio',
        label: 'Email',
        
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Desativar notificações'
        }
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        }, 
            
        
      ],
  
    });

    await alert.present();
  }
 /* teste(){
    this.caminho="../../assets/img/";
    this.foto="logo.jpg";
  }*/
}
