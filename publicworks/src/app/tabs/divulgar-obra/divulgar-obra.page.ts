import { Component } from '@angular/core';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/Storage';
import { Http } from '@angular/http';
import { PostProvider } from 'src/app/provider/post-provider';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

/*this.imagens.push(this.tes);
    this.tes++;
    for(let i of this.imagens){
      console.log(i);
    } */
@Component({
  selector: 'app-divulgar-obra',
  templateUrl: 'divulgar-obra.page.html',
  styleUrls: ['divulgar-obra.page.scss']
})
export class DivulgarObraPage {

  nomeObra:string="";
  custoPrevisto:number=undefined;
  dataInicio: string="";
  dataTermino: string="";
  numero:string="";
  cep: string="";
  logradouro: string="";
  bairro: string="";
  orgao: string="";
  idUsuario:number;
  pegar:any;
  lat:number;
  lng:number;
  fileUrl: any = null;
respData: any;

  constructor(
    private toastCtrl: ToastController,
    private storage: Storage,
    private provider:PostProvider,
    private http:Http,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private file: File,
    private transfer: FileTransfer
    ) {}

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.pegar = res;
      this.idUsuario = this.pegar.codigo;
    
    });
  }

  mudarFormulario(){

  }

  buscaCep(cep:string){

    this.logradouro="Carregando...";
    this.bairro="Carregando...";
    this.http.get('https://viacep.com.br/ws/'+cep+'/json/').subscribe(data => {
      const endereco = (data as any);
      const enderecoJSON = JSON.parse(endereco._body);

      this.logradouro = enderecoJSON.logradouro;
      this.bairro = enderecoJSON.bairro;
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.cep+','+this.logradouro.split(' ').join('%20')+','+this.bairro.split(' ').join('%20')+'&key=AIzaSyDf34DBCuE_fI47Twb47ZpIY38C7D-pbNY').subscribe(data2 => {
        
        const latLgl = (data2 as any);
        const latLglJSON = JSON.parse(latLgl._body);

        this.lat = latLglJSON.results[0].geometry.bounds.northeast.lat;
        this.lng = latLglJSON.results[0].geometry.bounds.northeast.lng;
        
          }, error =>{
            this.lat = 0;
            this.lng = 0;
            console.log(error);
          }
        );
        },async error =>{

          this.logradouro="";
          this.bairro="";

          const toast = await this.toastCtrl.create({
            message: 'CEP Invalido' ,
            duration: 2000,
            position: 'bottom',
            color: 'dark'
          });
          toast.present();
        }
      );

      
  }
 
  async cadastrarObra(){
    
    if(this.nomeObra==""){
      const toast = await this.toastCtrl.create({
        message: 'Nome da obra é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.custoPrevisto==undefined){
      const toast = await this.toastCtrl.create({
        message: 'Custo previsto é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.dataInicio==""){
      const toast = await this.toastCtrl.create({
        message: 'Data de inicio é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.dataTermino==""){
      const toast = await this.toastCtrl.create({
        message: 'Data de termino é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.numero==""){
      const toast = await this.toastCtrl.create({
        message: 'Numero é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.cep==""){
      const toast = await this.toastCtrl.create({
        message: 'CEP é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.logradouro==""){
      const toast = await this.toastCtrl.create({
        message: 'Logradouro é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.bairro==""){
      const toast = await this.toastCtrl.create({
        message: 'Bairro é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.orgao==""){
      const toast = await this.toastCtrl.create({
        message: 'Orgão responsavel é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else{
      console.log(this.lat);
      let body = {
        idUsuario:this.idUsuario,
        nomeObra: this.nomeObra,
        custoPrevisto: this.custoPrevisto,
        dataInicio: this.dataInicio.substring(0, this.dataInicio.indexOf("T")),
        dataTermino: this.dataTermino.substring(0, this.dataTermino.indexOf("T")),
        numero: this.numero,
        cep: this.cep,
        logradouro: this.logradouro,
        bairro: this.bairro,
        latitude: this.lat,
        longitude: this.lng,
        orgao: this.orgao,
        crud: "cadastrarObra"
      }
      
      this.provider.postData(body, 'insert.php').subscribe(async data=>{
        
        if(data.success){
          const toast = await this.toastCtrl.create({
            message: 'Obra cadastrada com sucesso' ,
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
      });
    }

  }

  tirarFotoPlaca(){
    document.getElementById('fileupload').click();
  }
 

}

