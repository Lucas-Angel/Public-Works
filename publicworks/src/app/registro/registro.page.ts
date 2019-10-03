import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../provider/post-provider';
import { BrMaskerModule } from 'br-mask';
import { Http } from '@angular/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  nome:String="";
  sobrenome:string="";
  email:String="";
  cpf:String="";
  cep:String="";
  ruaav:string="";
  bairro:string="";
  senha:String="";
  confSenha:String="";
  numero:String="";
  complemento:string="";

  constructor(
    private router:Router,
    private provider:PostProvider,
    private toastCtrl: ToastController,
    private http:Http
  ) { }


  login(){
    this.router.navigate(['/login']);
  }
  async cadastrar(){
    if(this.nome==""){
      const toast = await this.toastCtrl.create({
        message: 'Nome é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.sobrenome==""){
      const toast = await this.toastCtrl.create({
        message: 'Sobrenome é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }
    else if(this.email==""){
      const toast = await this.toastCtrl.create({
        message: 'E-Mail é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.cpf==""){
      const toast = await this.toastCtrl.create({
        message: 'CPF é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.senha==""){
      const toast = await this.toastCtrl.create({
        message: 'Senha é obrigatória' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.confSenha==""){
      const toast = await this.toastCtrl.create({
        message: 'Confirmação de senha é obrigatório' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else if(this.senha != this.confSenha){
      const toast = await this.toastCtrl.create({
        message: 'As senhas estão diferentes' ,
        duration: 2000,
        position: 'bottom',
        color: 'dark'
      });
      toast.present();
    }else{
      let body = {
        nome: this.nome +" " +this.sobrenome,
        email: this.email,
        cpf: this.cpf,
        senha: this.senha,
        numero: this.numero,
        cep: this.cep,
        ruaav: this.ruaav,
        complemento: this.complemento,
        bairro: this.bairro,
        crud: "cadastro"
      }
      this.provider.postData(body, 'insert.php').subscribe(async data=>{
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Cadastro realizado com sucesso' ,
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
  buscaCep(cep:string){

    this.ruaav="Carregando...";
    this.bairro="Carregando...";

    this.http.get('https://viacep.com.br/ws/'+cep+'/json/').subscribe(data => {
      const endereco = (data as any);
      const enderecoJSON = JSON.parse(endereco._body);

      this.ruaav = enderecoJSON.logradouro;
      this.bairro = enderecoJSON.bairro;
      
  
        },async error =>{

          this.ruaav="";
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
}
