import { Component, OnInit } from "@angular/core";
import { Invoice } from "../models/invoice";
import { InvoiceService } from "../services/invoice.service";
import { LazyLoadEvent } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: "invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"],
})
export class InvoiceComponent implements OnInit {
  invoiceStates: Invoice[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  rows = 10;

  text: string;
  results: string[];
  search(event) {
    console.log("searchDate", event);
    this.invoiceService.getUniquesDatesTime({}).then((res) => {
      this.results = res.filter((e) => e.includes(event.query));
    });
  }
  selectedDatetime(select) {
    console.log("selected Date", select);
    this.loadInvoicesStatesHistory({first:0,rows:this.rows,globalFilter:select});
  }

  constructor(private invoiceService: InvoiceService) {}
  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.results = [];
    this.text="";
    this.cols = [
      { field: "histId", header: "ID" },
      { field: "autorizador", header: "Aut|Provincia" },
      { field: "datetime", header: "Datetime" },
      { field: "autorizacion", header: "Autorización" },
      { field: "autorizacionDevolucion", header: "Autorización Devolucion" },
      { field: "consultaProtocolo", header: "Consulta Protocolo" },
      { field: "consultaRegistro", header: "Consulta Registro" },
      { field: "discapacidad", header: "Discapacidad" },
      { field: "estadoServicio", header: "Estado Servicio" },
      { field: "recepcionEventos", header: "Recepcion Eventos" },
      { field: "tiempoMedio", header: "Tiempo Medio" },
    ];
    this.loading = true;
  }

  loadInvoicesStatesHistory(event: LazyLoadEvent) {
    this.loading = true;
    console.log('mostrando los valores del Lazy',event);

    let lazyEvent = {
      pageNo:  event.first / event.rows,
      pageSize: event.rows,
    };
    if (event.sortField !== undefined && event.sortField !== null) {
      lazyEvent["sortBy"] = event.sortField;
      lazyEvent["sortOrder"] = event.sortOrder;
    }
    else
    {
      lazyEvent["sortBy"] = "";
      lazyEvent["sortOrder"] = 1;
    }
    if (event.globalFilter !== undefined && event.globalFilter !== null) {
      lazyEvent["fecha"] = event.globalFilter;
    }
    else
    lazyEvent["fecha"] = this.text;

    this.invoiceService.getInvoiceStatesHistory(lazyEvent).then((res) => {
      this.invoiceStates = res.invoices;
      this.totalRecords = res.totalItems;
      this.loading = false;
    });
  }
}
