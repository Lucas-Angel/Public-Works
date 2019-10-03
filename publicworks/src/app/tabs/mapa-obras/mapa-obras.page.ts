import { Component } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PostProvider } from 'src/app/provider/post-provider';
import { Storage } from '@ionic/Storage';


declare var google;
@Component({
  selector: 'app-mapa-obras',
  templateUrl: 'mapa-obras.page.html',
  styleUrls: ['mapa-obras.page.scss']
})
export class MapaObrasPage {

  mapa: any;
  marc: any;

  idUsuario:number;
  pegar:any;
  
  obras:any = [];

  mapRef = null;
 /* obras = [
    {
      nome: 'Centro Cultural',
      custoPrevisto: 1000000,
      custoFinal: 'nulo',
      status: 'Em andamento',
      lat: -23.581258,
      long: -46.388201
    },
    {
      nome: 'Posto de Saúde',
      custoPrevisto: 1000000,
      custoFinal: 1250000,
      status: 'Paralizada',
      lat: -23.582438,
      long: -46.386699
    },
    {
      nome: 'Posto de Saúde',
      custoPrevisto: 1000000,
      custoFinal: 1300000,
      status: 'Data Ultrapassada',
      lat: -23.580058,
      long: -46.386860,

    },
    {
      nome: 'Padaria do Gabriel',
      custoPrevisto: 1000000,
      custoFinal: 1150000,
      status: 'Finalizada',
      lat: -23.583107,
      long: -46.385551
    }
  ];*/
  constructor(
    private geo : Geolocation,
    private loadingCtrl:LoadingController,
    private postPvdr: PostProvider,
    private storage: Storage,
    private alert: AlertController
  ) {}
    ngOnInit(){
      this.storage.get('session_storage').then((res)=>{
        this.pegar = res;
        this.idUsuario = this.pegar.codigo;
   
      });

      this.loadMap();
  }

  async loadMap(){
    this.carregarObras();
    
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();

    const mapEle: HTMLElement = document.getElementById('mapa');
    this.mapRef = new google.maps.Map(mapEle,{
      center:myLatLng,
      zoom:15,
      disableDefaultUI: true
    });
    
    
    
/*    geocoder.geocode({ 'latLng': myLatLng }, function (results, status) {
      
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results);
        var address = (results[0].address_components[2]);
        alert(JSON.stringify(address));
      }
    });
*/

    google.maps.event
    .addListenerOnce(this.mapRef,'idle',()=>{
      loading.dismiss();
      this.addMaker(myLatLng.lat,myLatLng.lng);
    });

    this.loadPoint();
    console.log(this.obras);

    var centerControlDiv = document.createElement('div');
        this.BotaoIcones(centerControlDiv, this.mapRef);

        this.mapRef.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
  }

  private addMaker(lat:number,lng:number){
    const marker = new google.maps.Marker({
      position:{
        lat,lng
      }, 
      map:this.mapRef,
      title: 'Sua Localização',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
    });

    let content = `
      <div>
        <h6>`+marker.title+`</h6>
      </div>
    `

    this.addInfoWindow(marker, content);
  }

  private async getLocation(){
    const rta = await this.geo.getCurrentPosition();
    return {
      lat:rta.coords.latitude,
      lng:rta.coords.longitude
    };
  }

  loadPoint(){
  //  var auxCon;
    this.marc = [];

    for(const key of Object.keys(this.obras)){
      let latlgn = new google.maps.LatLng(this.obras[key].latitudeObra, this.obras[key].longitudeObra);
      let marc = new google.maps.Marker({
        position: latlgn,
        title: this.obras[key].nome,
        map:this.mapRef,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png'
      });

    /*  if(this.obras[key].status=="Em andamento"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png';
      }else if(this.obras[key].status=="Paralizada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png';
      }else if(this.obras[key].status=="Data Ultrapassada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png';
      }else if(this.obras[key].status=="Finalizada"){
        marc.icon = 'http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png';
      }
   */
    /*  if(this.obras[key].custoFinal!='nulo'){
        auxCon = `
        <div>
          <h6>Nome:`+this.obras[key].nome+`</h6>
          <h6>Custo Previsto: R$ `+this.obras[key].custoPrevisto+`</h6>
          <h6>Custo Final: R$ `+this.obras[key].custoFinal+`</h6>
          <a>Denunciar</a>
        </div>
      `
      }else{
        auxCon = `
        <div>
          <h6>Nome:`+this.obras[key].nome+`</h6>
          <h6>Custo Previsto: R$ `+this.obras[key].custoPrevisto+`</h6>
          
        </div>
      `
      }*/
      let content = `
          <div>
            <h6>Nome: `+this.obras[key].descricaoObra+`</h6>
            <h6>Número: `+this.obras[key].numeroCasaObra+`</h6>
            <h6>Custo previsto: R$`+this.obras[key].custoPrevisto+`</h6>
            <h6>Data de inicio: `+this.obras[key].dataInicio+`</h6>
            <h6>Data prevista de termino: `+this.obras[key].dataPrevistaTermino+`</h6>
          </div>
        `
    //  let content = auxCon;
    

      this.abrirAlertObra(marc, content, this.obras[key].idObra);

    }

    
  }
  carregarObras(){
   
    let body = {
      crud: "carregarObras"
    };

    this.postPvdr.postData(body, 'select.php').subscribe(data => {
      this.obras = data.result;
      
    });
  	
  }
  addInfoWindow(marc, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marc, 'click', () => {
      infoWindow.open(this.mapa, marc);
    });
  }

  abrirAlertObra(marc, content, idObra){
    google.maps.event.addListener(marc, 'click', async () => {
      
      const alert = await this.alert.create({
        header: 'Informações da obra',
        message: content,
        
        buttons: [
          {
            text: 'Denunciar',
            handler: async () => {
              const alert = await this.alert.create({
                header: 'Informações da obra',
                message: content,
                
                buttons: [
                  {
                    text: 'Denunciar',
                    handler: () => {
                      
                    }
                  }, {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                      ;
                    }
                  }
                ],
            
              });
          
              await alert.present();
            }
          }, {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              ;
            }
          }
        ],
    
      });
  
      await alert.present();

    });
  }

  BotaoIcones(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Icones';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', async ()=> {
      
      const alert = await this.alert.create({
        header: 'Icones',
        message: `<ion-grid>
        <ion-row>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/ylw-pushpin.png">
          </ion-col>
    
          <ion-col>
            Obras em andamento
          </ion-col>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/red-pushpin.png">
          </ion-col>    
          <ion-col>
            Obras atrasadas
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png">
          </ion-col>
          <ion-col>
            Data de entraga ultrapassada e Status não confirmado
          </ion-col>
    
          <ion-col size="1">
            <img src="http://maps.google.com/mapfiles/ms/icons/grn-pushpin.png">
          </ion-col>
          <ion-col>
            Finalizada
          </ion-col>
        </ion-row>
      </ion-grid>`,
        
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              
            }
          }
        ],
    
      });
  
      await alert.present();
    });
  
  }
  
}
