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

  dataEvento: any = {};
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
        this.dataEvento = response['dataEvento'];
        const tempData = [];
        for (const item of this.dataEvento) {

          var dateAsistencia,
          diaDateAsistencia,
          mesDateAsistencia,
          añoDateAsistencia,
          hoursDateAsistencia,
          minuteDateAsistenca,
          secondsDateAsistenca,
          stringDateOne,
          stringHourOne;

          if (item.fasistencia) {
            dateAsistencia = new Date(item.fasistencia);
            diaDateAsistencia = dateAsistencia.getDate();
            mesDateAsistencia = dateAsistencia.getMonth();
            añoDateAsistencia = dateAsistencia.getFullYear();
            hoursDateAsistencia = dateAsistencia.getHours();
            minuteDateAsistenca = dateAsistencia.getMinutes();
            secondsDateAsistenca = dateAsistencia.getSeconds();
            stringDateOne = diaDateAsistencia + '/' + mesDateAsistencia + '/' + añoDateAsistencia;
            stringHourOne = hoursDateAsistencia + ':' + minuteDateAsistenca + ':' + secondsDateAsistenca;
          } else {
            stringDateOne = '';
            stringHourOne = '';
          }
          /*const dateSala = new Date(item.created);
          const diaDateSala = dateSala.getDate();
          const mesDateSala = dateSala.getMonth();
          const añoDateSala = dateSala.getFullYear();
          const hoursDateSala = dateSala.getHours();
          const minuteDatSala = dateSala.getMinutes();
          const secondsDateSala = dateSala.getSeconds();
          const stringDateSecond = diaDateSala + '/' + mesDateSala + '/' + añoDateSala;
          const stringHourSecond = hoursDateSala + ':' + minuteDatSala + ':' + secondsDateSala ;*/
          const data = {
                        Codigo: item.codigo,
                        Fuente: item.fuente,
                        Nombre: item.name,
                        Apellido_Paterno: item.appaterno,
                        Apellido_Materno: item.apmaterno,
                        Empresa: item.empresa,
                        Cargo: item.cargo,
                        Tipo_Invitado: item.tipoinvitado,
                        Email: item.email,
                        Telefono: item.telefono,
                        Ciudad: item.ciudad,
                        Pais: item.pais,
                        Lead_Source: item.leadsource,
                        Lead_Source_Details: item.leadsourced,
                        Product_Interest: item.productinterest,
                        Lead_Owner: item.leadowner,
                        Fecha_Asistencia: stringDateOne,
                        Hora_Asistencia: stringHourOne
                      };
          if (item.sala_info.length !== 0) {
            const cantSalas = item.sala_info.length;
            for (let index = 0; index < cantSalas; index++) {
              const numberXls = index + 1;
              const nameHeader = 'Nombre_Sala_' + numberXls;
              const nameHeaderFA = 'Fecha_Asistencia_' + numberXls;
              const nameHeaderHA = 'Hora_Asistencia_' + numberXls;
              data[nameHeader] = item.sala_info[index].name;
              if (item.asistente_sala.length !== 0) {
                const cantAsistenteSala = item.asistente_sala.length;
                for (let y = 0; y < cantAsistenteSala; y++) {
                  if (item.sala_info[index]._id ===  item.asistente_sala[y].sala) {
                    const dateSala = new Date(item.asistente_sala[y].created);
                    const diaDateSala = dateSala.getDate();
                    const mesDateSala = dateSala.getMonth();
                    const añoDateSala = dateSala.getFullYear();
                    const hoursDateSala = dateSala.getHours();
                    const minuteDatSala = dateSala.getMinutes();
                    const secondsDateSala = dateSala.getSeconds();
                    const stringDateSecond = diaDateSala + '/' + mesDateSala + '/' + añoDateSala;
                    const stringHourSecond = hoursDateSala + ':' + minuteDatSala + ':' + secondsDateSala ;
                    data[nameHeaderFA] = stringDateSecond;
                    data[nameHeaderHA] = stringHourSecond;
                  }
                }
              } else {
                data[nameHeaderFA] = '';
                data[nameHeaderHA] = '';
              }
            }
          }
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
