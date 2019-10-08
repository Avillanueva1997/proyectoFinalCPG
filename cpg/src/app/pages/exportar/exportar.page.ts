import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Storage } from '@ionic/storage';
import { ExcelServiceService } from '../../services/excel-service.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.page.html',
  styleUrls: ['./exportar.page.scss'],
})
export class ExportarPage implements OnInit {

  post: any;

  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];

  salaasistente: any = {};
  dataGlobal: any = {};

  constructor(private postService: PostsService, private storage: Storage, private excelService: ExcelServiceService) { }

  ngOnInit() {
    this.cargarPost();
  }

  downloadExcel(event: any) {
    this.postService.getDataExcel(this.post).subscribe(
      response => {
        // this.exportAsXLSX();
        console.log(response);
        this.salaasistente = response['dataEvento'];
        const tempData = [];
        for (const item of this.salaasistente) {
          const dateAsistencia = new Date(item.asistente.fasistencia);
          const diaDateAsistencia = dateAsistencia.getDate();
          const mesDateAsistencia = dateAsistencia.getMonth();
          const añoDateAsistencia = dateAsistencia.getFullYear();
          const hoursDateAsistencia = dateAsistencia.getHours();
          const minuteDateAsistenca = dateAsistencia.getMinutes();
          const secondsDateAsistenca = dateAsistencia.getSeconds();
          const stringDateOne = diaDateAsistencia + '/' + mesDateAsistencia + '/' + añoDateAsistencia;
          const stringHourOne = hoursDateAsistencia + ':' + minuteDateAsistenca + ':' + secondsDateAsistenca;
          const dateSala = new Date(item.created);
          const diaDateSala = dateSala.getDate();
          const mesDateSala = dateSala.getMonth();
          const añoDateSala = dateSala.getFullYear();
          const hoursDateSala = dateSala.getHours();
          const minuteDatSala = dateSala.getMinutes();
          const secondsDateSala = dateSala.getSeconds();
          const stringDateSecond = diaDateSala + '/' + mesDateSala + '/' + añoDateSala;
          const stringHourSecond = hoursDateSala + ':' + minuteDatSala + ':' + secondsDateSala ;
          const data = {
                        Evento: item.post.mensaje,
                        Nombre_Invitado: item.asistente.name,
                        Apellido: item.asistente.appaterno,
                        Empresa: item.asistente.empresa,
                        Tipo_Invitado: item.asistente.tipoinvitado,
                        Fecha_Evento: stringDateOne,
                        Hora_Evento: stringHourOne,
                        Sala: item.sala.name,
                        Hora_Sala: stringDateSecond,
                        Fecha_Sala: stringHourSecond,
                      };
          tempData.push(data);
        }

        this.dataGlobal = tempData;
        console.log(this.dataGlobal);
        this.exportAsXLSX();
      }
    );
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.dataGlobal, 'file');
  }

  async cargarPost() {
    this.post = await this.storage.get('post');
  }

}
