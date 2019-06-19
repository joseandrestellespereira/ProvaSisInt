import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacina } from './models/vacina';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VacinaService } from './vacina.service';

@Component({
  selector: 'app-vacina',
  templateUrl: './vacina.component.html',
  styleUrls: ['./vacina.component.css']
})
export class VacinaComponent implements OnInit {
  displayedColumns: string[] = ['actionsColumn','idVacina','idAnimal', 'dtVacina', 'peso', 'dosagem', 'aplicador', 'descMedicamento'];
  vacina: Vacina;
  teste: any;
  vacinas: any;
  dataSource: any;
  edit: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private vacinaService: VacinaService) { }

  ngOnInit() {
    this.vacina = new Vacina();
    this.vacinas = new Array<Vacina>();
    this.listAll();
  }

  listAll(){
    this.vacinaService.findAll().subscribe(response => {
      if (response)
        this.loadTable(response);
    }, error => {
      console.log(error);
    });
  }

  loadTable(vacinas: any){
    this.dataSource = new MatTableDataSource<Vacina>(vacinas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  salvar(){
    this.vacinaService.save(this.vacina).subscribe(response => {
      if (response){
        alert('Salvou!!!!');
        this.listAll();
      }
    }, error => {
      console.log(error);
    });
    this.vacina = new Vacina();
  }

  excluir(vacinaId: number){
    this.vacinaService.remove(vacinaId).subscribe(response => {
      if (response)
        this.listAll();
    }, error => {
      console.log(error);
    });
  }

  markEdit(vacina: any){
    this.vacina = vacina;
    this.edit = true;
  }

  atualizar(){
    this.vacinaService.update(this.vacina).subscribe(response => {
      if (response){
        alert('Atualizou!!!!');
        this.listAll();
        this.edit = false;
        this.vacina = new Vacina();
      }        
    }, error => {
      console.log(error);
    });
  }

}
