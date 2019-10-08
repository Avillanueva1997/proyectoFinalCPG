import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AsistenteService } from '../../services/asistente.service';
import { TouchSequence } from 'selenium-webdriver';
import { Asistente } from '../../interfaces/interfaces';
import { ModalController, Platform } from '@ionic/angular';
import { ModalEditAsistentePage } from '../modal-edit-asistente/modal-edit-asistente.page';
import { ModalVisualizarAsistentePage } from '../modal-visualizar-asistente/modal-visualizar-asistente.page';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.page.html',
  styleUrls: ['./asistentes.page.scss'],
})
export class AsistentesPage{

  titulo = 'Asistentes';
  post: any;
  asistentes: Asistente[] = [];
  searchName =  false;
  searchAppaterno =  false;
  searchApmaterno =  false;
  searchEmpresa =  false;
  searchTipoinvitado =  false;
  refresh =  false;
  valueSearchName: string;
  valueSearchAppaterno: string;
  valueSearchApmaterno: string;
  valueSearchEmpresa: string;
  valueSearchTipoinvitado: string;
  mobile: boolean;

  @ViewChild('searchNombre', {static: false}) searchNameEl: ElementRef;

  constructor(private storage: Storage,
              private asistenteService: AsistenteService,
              private modalCtrl: ModalController,
              private platform: Platform) {
  }

  ionViewWillEnter() {
    this.cargarPost();
    if (this.platform.is('mobile')) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
    this.cargarAsistentes(this.post);
  }

  cargarAsistentes(post, event?: any) {
    this.asistenteService.getAsistentes(post).subscribe(
      response => {
        if(response['ok']){
          this.asistentes = response['asistentes'];
          if (event) {
            event.target.complete();
          }
        }
      }
    );
  }

  recargar(event: any) {
    this.cargarAsistentes(this.post, event);
  }

  /*onSearch(event) {
    const value = event.detail.value;
    if (value !== '') {
      this.asistenteService.getAsistentesBySearch(this.post, value).subscribe(
        response => {
          if(response['ok']){
            this.asistentes = response['asistentes'];
          }
        }
      );
    } else {
      this.cargarAsistentes(this.post);
    }
  }*/

  async onToggleChange(event: any, codigoBD) {
    const state = event.detail.checked;
    const codigo = codigoBD;
    const params = {
      codigo,
      state
    };
    const value = await this.asistenteService.updateAsistente(params);
    if (value) {
      this.cargarAsistentes(this.post);
    }
  }

  async onEdit(asistente: any) {
      const modal = await this.modalCtrl.create({
        component: ModalEditAsistentePage,
        componentProps: {
          asistente
        }
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      console.log('Retorno del modal', data );
  }

  async onWatch(asistente: any) {
    const modal = await this.modalCtrl.create({
      component: ModalVisualizarAsistentePage,
      componentProps: {
        asistente
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log('Retorno del modal', data );
  
  }


  onSearchOne(event: any) {

    if(this.refresh){
      this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    }

    this.searchName = true;
    const value = event.detail.value;

    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);

    if (value !== '') {
      this.valueSearchName = value;
      if (this.searchName && this.searchAppaterno === false && this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado === false)  {
        this.asistenteService.getAsistentesByName(this.post, this.valueSearchName).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );
      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado === false) {
        this.asistenteService.getAsistentesByNameAppaterno(this.post, this.valueSearchName, this.valueSearchAppaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameApmaterno(this.post, this.valueSearchName, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameEmpresa(this.post, this.valueSearchName, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameTipoinvitado(this.post, this.valueSearchName, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameAppaternoApmaterno(this.post,
                                                                    this.valueSearchName,
                                                                    this.valueSearchAppaterno,
                                                                    this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          }
        );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameAppaternoEmpresa(this.post,
                    this.valueSearchName,
                    this.valueSearchAppaterno,
                    this.valueSearchEmpresa).subscribe(
          response => {
          if(response['ok']){
          this.asistentes = response['asistentes'];
          }
          }
        );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchAppaterno,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameApmaternoEmpresa(this.post,
          this.valueSearchName,
          this.valueSearchApmaterno,
          this.valueSearchEmpresa).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameApmaternoTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchApmaterno,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameEmpresaTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchEmpresa,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {
        // {a,b,c,d} {a,b,c,e} {a,b,d,e} {a,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresa(this.post,
          this.valueSearchName,
          this.valueSearchAppaterno,
          this.valueSearchApmaterno,
          this.valueSearchEmpresa).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoApmaternoTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchAppaterno,
          this.valueSearchApmaterno,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoEmpresaTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchAppaterno,
          this.valueSearchEmpresa,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno === false && this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameApmaternoEmpresaTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchApmaterno,
          this.valueSearchEmpresa,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      } else if (this.searchName && this.searchAppaterno && this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        
        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(this.post,
          this.valueSearchName,
          this.valueSearchAppaterno,
          this.valueSearchApmaterno,
          this.valueSearchEmpresa,
          this.valueSearchTipoinvitado).subscribe(
            response => {
            if(response['ok']){
            this.asistentes = response['asistentes'];
            }
            }
          );

      }

      this.refresh = false;
    }
  }

  onSearchTwo(event: any) {

    if(this.refresh){
      this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    }


    this.searchAppaterno = true;
    const value = event.detail.value;

    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);

    if (value !== '') {
      this.valueSearchAppaterno = value;
      if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaterno(this.post, this.valueSearchAppaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado === false) { 
        this.asistenteService.getAsistentesByNameAppaterno(this.post, this.valueSearchName, this.valueSearchAppaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaternoApmaterno(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaternoEmpresa(this.post, this.valueSearchAppaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        // tslint:disable-next-line: max-line-length
        this.asistenteService.getAsistentesByAppaternoTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        // {a,b,c} {a,b,d} {a,b,e} {b,c,d} {b,c,e} {b,d,e}

        // tslint:disable-next-line: max-line-length
        this.asistenteService.getAsistentesByNameAppaternoApmaterno(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchAppaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameAppaternoEmpresa(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresa(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoApmaternoTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']) {
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {
        // {a,b,c,d} {a,b,c,e} {a,b,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresa(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']) {
              this.asistentes = response['asistentes'];
            }
          });
      }
    } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {
      // {a,b,c,d} {a,b,c,e} {a,b,d,e} {b,c,d,e}

      this.asistenteService.getAsistentesByNameAppaternoApmaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
        response => {
          if(response['ok']) {
            this.asistentes = response['asistentes'];
          }
        });
    } else if (this.searchAppaterno && this.searchName &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {
      // {a,b,c,d} {a,b,c,e} {a,b,d,e} {b,c,d,e}

      this.asistenteService.getAsistentesByNameAppaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
        response => {
          if(response['ok']) {
            this.asistentes = response['asistentes'];
          }
        });
    } else if (this.searchAppaterno && this.searchName === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {
      // {a,b,c,d} {a,b,c,e} {a,b,d,e} {b,c,d,e}

      this.asistenteService.getAsistentesByAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
        response => {
          if(response['ok']) {
            this.asistentes = response['asistentes'];
          }
        });
    } else if(this.searchAppaterno && this.searchName &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

      this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
        response => {
          if(response['ok']) {
            this.asistentes = response['asistentes'];
          }
        });

    }

    this.refresh = false;
  }

  onSearchThree(event: any) {

    if(this.refresh){
      this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    }


    this.searchApmaterno = true;
    const value = event.detail.value;

    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);

    if (value !== '') {
      this.valueSearchApmaterno = value;
      if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByApmaterno(this.post, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        // {a,c} {b,c} {c,d} {c,e}

        this.asistenteService.getAsistentesByNameApmaterno(this.post, this.valueSearchName, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaternoApmaterno(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByApmaternoEmpresa(this.post, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByApmaternoTipoinvitado(this.post, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado === false) {
        // {a,b,c} {a,c,d} {a,c,e} {b,c,d} {b,c,e} {c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaterno(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByNameApmaternoEmpresa(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameApmaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresa(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoApmaternoTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByApmaternoEmpresaTipoinvitado(this.post, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if ( this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        // {a,b,c,d} {a,b,c,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresa(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if ( this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,c,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if ( this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,c,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if ( this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,c,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if ( this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,c,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      }

      this.refresh = false;
    }
  }

  onSearchFour(event: any) {

    if(this.refresh){
      this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    }

    this.searchEmpresa = true;
    const value = event.detail.value;

    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);

    if (value !== '') {
      this.valueSearchEmpresa = value;
      console.log(this.valueSearchEmpresa);
      if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        this.asistenteService.getAsistentesByEmpresa(this.post, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {
        // {a,d}{b,d}{c,d}{d,e}

        this.asistenteService.getAsistentesByNameEmpresa(this.post, this.valueSearchName, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {
        // {a,d}{b,d}{c,d}{d,e}

        this.asistenteService.getAsistentesByAppaternoEmpresa(this.post, this.valueSearchAppaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {
        // {a,d}{b,d}{c,d}{d,e}

        this.asistenteService.getAsistentesByApmaternoEmpresa(this.post, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {
        // {a,d}{b,d}{c,d}{d,e}

        this.asistenteService.getAsistentesByEmpresaTipoinvitado(this.post, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado === false) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoEmpresa(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByNameApmaternoEmpresa(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByNameEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      }  else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresa(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByAppaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      }  else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,d} {a,c,d} {a,d,e} {b,c,d} {b,d,e} {c,d,e}

        this.asistenteService.getAsistentesByApmaternoEmpresaTipoinvitado(this.post, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado === false) {

        // {a,b,c,d} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresa(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
 
      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        // {a,b,c,d} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      }

      this.refresh = false;
    }
  }

  onSearchFive(event: any) {

    if(this.refresh){
      this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    }

    this.searchTipoinvitado = true;
    const value = event.detail.value;

    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);

    if (value !== '') {
      this.valueSearchTipoinvitado = value;
      if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByTipoinvitado(this.post, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        // {a,e}{b,e}{c,e}{d,e}

        this.asistenteService.getAsistentesByNameTipoinvitado(this.post, this.valueSearchName, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByApmaternoTipoinvitado(this.post, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByEmpresaTipoinvitado(this.post, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

        // {a,b,e} {a,c,e} {a,d,e} {b,c,e} {b,d,e} {c,d,e} 

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameApmaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });

      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoApmaternoTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno === false && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByAppaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByApmaternoEmpresaTipoinvitado(this.post, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa === false && this.searchTipoinvitado) {
        // {a,b,c,e} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameAppaternoApmaternoTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName && this.searchAppaterno === false &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {
        // {a,b,c,e} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByNameApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName === false && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {
        // {a,b,c,e} {a,b,d,e} {a,c,d,e} {b,c,d,e}

        this.asistenteService.getAsistentesByAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      } else if (this.searchName && this.searchAppaterno &&  this.searchApmaterno && this.searchEmpresa && this.searchTipoinvitado) {

        this.asistenteService.getAsistentesByNameAppaternoApmaternoEmpresaTipoinvitado(this.post, this.valueSearchName, this.valueSearchAppaterno, this.valueSearchApmaterno, this.valueSearchEmpresa, this.valueSearchTipoinvitado).subscribe(
          response => {
            if(response['ok']){
              this.asistentes = response['asistentes'];
            }
          });
      }

      this.refresh = false;
    }
  }

  onClearFilter() {
    this.refresh = true;
    this.searchName = this.searchAppaterno = this.searchApmaterno = this.searchEmpresa = this.searchTipoinvitado = false;
    this.valueSearchName = '';
    this.valueSearchAppaterno = '';
    this.valueSearchApmaterno = '';
    this.valueSearchEmpresa = '';
    this.valueSearchTipoinvitado = '';
    console.log(this.searchName);
    console.log(this.searchAppaterno);
    console.log(this.searchApmaterno);
    console.log(this.searchEmpresa);
    console.log(this.searchTipoinvitado);
    this.cargarAsistentes(this.post);
  }

}
