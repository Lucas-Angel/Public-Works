import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from 'src/app/provider/post-provider';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  historico:string="";
  idUsuario:number;
  pegar: any;
  obrasDivulgadas: any = [];

  constructor(
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private alertController: AlertController
  ) { }
  
  ngOnInit() {
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
 
    });
  }
  
  async verHistorico(historico:string){
    this.historico=historico;
    if(historico=="divulgacoes"){
      let body = {
        idusuario: this.idUsuario,
        crud: "historicoObras"
      }

      this.postPvdr.postData(body, 'select.php').subscribe(async data => {
        console.log(data);
        if(data.success){
          this.obrasDivulgadas = data.result;
          
        /*  const toast = await this.toastCtrl.create({
            message: 'Tem registro.',
            duration: 2000
          });
          toast.present();*/

          
        }
      });
    }else{
      
    }
  }

  async verInfoObra(i:number){
    const alert = await this.alertController.create({
      
      header: 'Detalhes',
      message: `<h6>Custo previsto: R$`+this.obrasDivulgadas[i]['custoPrevisto']+`</h6>
                <h6>Data de inicio: `+this.obrasDivulgadas[i]['dataInicio']+`</h6>`,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          cssClass: 'secondary',
          
        }
      ]
    });

    await alert.present();
  }
}
