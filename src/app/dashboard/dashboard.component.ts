import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import { AvilablilityService } from "../services/avilablility.service";
import { CurrentSates, StateAvailable } from "../models/invoice";
import { CurrentsService } from "../services/currents.service";
import { LazyLoadEvent, SortEvent } from "primeng/api";
import { Table } from "primeng/table";
import { Observable, Subscription, timer } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>;

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>;

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>;

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>;
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }
  public chartHovered(e: any): void {
    //console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(
    private availabilityService: AvilablilityService,
    private currentStatesService: CurrentsService
  ) {}

  basicData: any;
  basicOptions: any;

  currentStates: CurrentSates[];
  loading: boolean;
  cols: any[];
  currentTime: string;
  loadCurrentStates(event: LazyLoadEvent) {
    this.loading = true;
    //console.log("lazy", event);
    let filt = {};
    if ("globalFilter" in event && event.globalFilter !== null) {
      filt["aut"] = event.globalFilter;
    }
    // lamando al servicio para obtener los estados actuales de los servicios
    this.currentStatesService.getCurrentStates(filt).then((res) => {
      this.currentStates = res.sort(function (a, b) {
        return a.invId - b.invId;
      });
      this.currentTime = this.currentStates[0].datetime;
      this.loading = false;
    });
  }

  initBigLineChartServiceAvailables(res: StateAvailable[]) {
    const maxGenAvail = res.reduce((prev, current) =>
      prev.disponibilidadServicio > current.disponibilidadServicio
        ? prev
        : current
    );
    //console.log(maxGenAvail.disponibilidadServicio);
    let labelFromServ = [];
    let dataFromServ = [];
    res.forEach((element) => {
      dataFromServ.push(
        (
          (element.disponibilidadServicio /
            maxGenAvail.disponibilidadServicio) *
          100
        ).toFixed(2)
      );
      labelFromServ.push(element.autorizador);
    });
    this.lineBigDashboardChartData = [
      {
        label: "Average Availability of Services",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        borderWidth: 2,
        data: dataFromServ,
      },
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      },
    ];
    this.lineBigDashboardChartLabels = labelFromServ;
    this.lineBigDashboardChartOptions = {
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0,
        },
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "#fff",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10,
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 10,
              fontColor: "orange",
              fontStyle: "bold",
            },
          },
        ],
      },
    };

    this.lineBigDashboardChartType = "line";
  }
  clear(table: Table) {
    table.clear();
  }

  subscription: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 30000);

  ngOnInit() {
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.loadCurrentStates({});
    });

    this.loading = true;

    this.cols = [
      { field: "invId", header: "ID" },
      { field: "autorizador", header: "Estado|Provincia" },
      { field: "autorizacion", header: "Autorizaci??n" },
      { field: "autorizacionDevolucion", header: "Autorizaci??n Devolucion" },
      { field: "discapacidad", header: "Discapacidad" },
      { field: "consultaProtocolo", header: "Consulta Protocolo" },
      { field: "estadoServicio", header: "Estado Servicio" },
      { field: "tiempoMedio", header: "Tiempo Medio" },
      { field: "consultaRegistro", header: "Consulta Registro" },
      { field: "recepcionEventos", header: "Recepcion Eventos" },
      //{ field: "datetime", header: "Datetime" },
    ];

    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, "#80b6f4");
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    // llamando al servicio para obtener la disponibilidad historica de los servicios
    this.availabilityService.getStatesAvailbility({}).then((res) => {
      this.initBigLineChartServiceAvailables(res);
    });

    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: 1,
      scales: {
        yAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false,
            },
            ticks: {
              stepSize: 500,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, "#80b6f4");
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.lineChartData = [
      {
        label: "Active Users",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610, 700, 630],
      },
    ];
    this.lineChartColors = [
      {
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        backgroundColor: this.gradientFill,
      },
    ];
    this.lineChartLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = "line";

    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, "#18ce0f");
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB("#18ce0f", 0.4));

    this.lineChartWithNumbersAndGridData = [
      {
        label: "Email Stats",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: [40, 500, 650, 700, 1200, 1250, 1300, 1900],
      },
    ];
    this.lineChartWithNumbersAndGridColors = [
      {
        borderColor: "#18ce0f",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#18ce0f",
        backgroundColor: this.gradientFill,
      },
    ];
    this.lineChartWithNumbersAndGridLabels = [
      "12pm,",
      "3pm",
      "6pm",
      "9pm",
      "12am",
      "3am",
      "6am",
      "9am",
    ];
    this.lineChartWithNumbersAndGridOptions =
      this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = "line";

    this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB("#2CA8FF", 0.6));

    this.lineChartGradientsNumbersData = [
      {
        label: "Active Countries",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 1,
        data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155],
      },
    ];
    this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      },
    ];
    this.lineChartGradientsNumbersLabels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.lineChartGradientsNumbersOptions = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: 1,
      scales: {
        yAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false,
            },
            ticks: {
              stepSize: 20,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    this.lineChartGradientsNumbersType = "bar";
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
