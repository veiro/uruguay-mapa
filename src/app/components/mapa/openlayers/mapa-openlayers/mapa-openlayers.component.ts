import { OverlayMensaje, OverlayMessageComponent } from './overlay-message/overlay-message.component';
import Overlay from 'ol/Overlay.js';
//import { PuntoMapa } from 'src/app/model/punto-mapa';
import { MapaService } from './../../../../services/mapa/mapa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {ScaleLine, defaults as defaultControls, ZoomSlider, Geolocate} from 'ol/control.js';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj.js';
import { transform } from 'ol/proj.js';
import {OSM, Vector} from 'ol/source';
import * as source from 'ol/source';
import * as geom from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import * as style from 'ol/style';
import TileWms from 'ol/source/TileWMS';
import * as layer from 'ol/layer';
import { ToastService } from 'src/app/services/toast/ToastService';
import XYZ from 'ol/source/XYZ.js';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from 'ol-ext/interaction/SelectCluster';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopUpOpcionesComponent } from './pop-up-opciones/pop-up-opciones.component';
import GeolocationOl from 'ol/Geolocation';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalCapas } from './modal-capas/modal-capas.component';
import { Informacion, ModalClusterComponent } from './modal-cluster/modal-cluster.component';


@Component({
  selector: 'app-mapa-openlayers',
  templateUrl: './mapa-openlayers.component.html',
  styleUrls: ['./mapa-openlayers.component.css'],
})
export class MapaOpenlayersComponent implements OnInit {
  @ViewChild('map') map: Map;
  @ViewChild(OverlayMessageComponent) _overlayMessageComponent: OverlayMessageComponent;
  @ViewChild(PopUpOpcionesComponent) popUpOpcionesComponent: PopUpOpcionesComponent;
  @ViewChild('popupAcciones') popupAcciones: any;
  @ViewChild('popup') popup: any;

  puntosMapaObra: Array<any>;
  puntosMapaIndustria: Array<any>;
  capaActual: TileLayer;
  capaPadrones: any;

  geolocation: any;
  puntoOverlayMensaje: OverlayMensaje = new OverlayMensaje();
  informacion: Informacion = new Informacion();
  mostrarOverlay = false;
  overlayPopUP: any;
  overlayPopUPAcciones: any;
  popupClusterOVerlay: any;
  checkLocalizar = false;
  positionLayer: any;
  clusterSource: any;
  view: any;
  popUpAbierto = false;
  ubicacion: Coordinates;
  markerVectorLayerPosicionSeleccionada: any;
  markerVectorLayerPosicionActual: any;
  watchCurrentPostition: any;

  checkPadron = false;
  checkMapaGoogle = false;
  checkMaparaCorreo = true;
  layerGoogleMaps = null;
  layerMapaCorreo = null;
  capaPadronesSource: any;

  constructor( public _mapService: MapaService,
               private _toast: ToastService,
               private _geolocation: Geolocation,
               public _modalController: ModalController) { }

  ngOnInit() {
    this._geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion = resp.coords;
      this.iniciarMapa();
      this.mostrarLayerMapaBase();
      this.mostrarLayerPadrones();
      this.agregarMarcadorPosicionActual();
      //this.obtenerPuntosObras();
      this.obtenerPuntosIndustria();
      this.agregarEventoOnclickConPopUp();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  mostrarLayerMapaBase() {
    if (this.checkMapaGoogle) {
      this.layerMapaCorreo.setVisible(false);
      this.layerGoogleMaps.setVisible(true);
    } else if (this.checkMaparaCorreo) {
      this.layerMapaCorreo.setVisible(true);
      this.layerGoogleMaps.setVisible(false);
    }
  }

  mostrarLayerPadrones() {
    this.capaPadrones.setVisible(this.checkPadron);
  }


  iniciarMapa() {
    this.layerGoogleMaps =  new TileLayer({
      source: new XYZ({
        url: 'http://maps.googleapis.com/maps/vt/lyrs=r&x={x}&y={y}&z={z}'
      })
    });

    this.layerMapaCorreo = new TileLayer({
        source: new TileWms({
          url: "http://geo.correo.com.uy/geoserver/wms",
          params: {
            layers: 'visualizador:paises_puntos,visualizador:paises_sudamerica,visualizador:mb2_paises_sudamerica,visualizador:mb2_oceanos_sudamerica,visualizador:provincias_sudamerica,visualizador:mb2_uy_departamentos,visualizador:mb2_uy_localidades_ine,visualizador:rios_sudamerica,visualizador:mb2_waterways,visualizador:mb2_hidro_sin_rp,visualizador:mb2_hidro_ln,visualizador:mb2_lim_adm,visualizador:mojones_uy,visualizador:mb2_landuse,visualizador:mb2_natural,visualizador:mb2_buildings,visualizador:mb2_roads,visualizador:mb2_railways,visualizador:mb2_places',
            format: 'image/png',
            SRS:"EPSG:900913"
          }
        })
      },
    );

    this.capaPadronesSource = new TileWms({
      url: "http://geoservicios.mtop.gub.uy/geoserver/planos_uy/wms",
      params: {
        layers: 'parcelario_urbano,parcelario_rural',
        format: 'image/png'
      }
    });

    
    this.capaPadrones = new TileLayer({
      source: this.capaPadronesSource,
      opacity: 0.5
    });

    this.view = new View({
      projection: 'EPSG:900913',
      center:  fromLonLat([this.ubicacion.longitude, this.ubicacion.latitude]),
      zoom: 15
    });

    this.map = new Map({
      target: 'map',
      controls: defaultControls().extend([
        new ScaleLine(),
        new ZoomSlider()
      ]),
      layers: [
       this.layerGoogleMaps,
       this.layerMapaCorreo,
       this.capaPadrones
      ],
      view: this.view
    });
  }

  iniciarMapaOSM() {
    this.map = new Map({
      target: 'map',
      controls: defaultControls().extend([
        new ScaleLine(),
        new ZoomSlider()
      ]),
      layers: [
        new TileLayer({
          source:  new OSM()
        },
        )
      ],
      view: new View({
        projection: 'EPSG:900913',
        center:  fromLonLat([-56.158966, -34.884448]),
        zoom: 15
      })
    });
  }

  agregarMarcadorPosicionActual()  {

    this.map.removeLayer(this.markerVectorLayerPosicionActual);

    let featuresPoint: Feature[];
     featuresPoint = [];

    var iconStyle = new style.Style({
      image: new style.Circle({
        radius: 6,
        fill: new style.Fill({
          color: '#3399CC'
        }),
        stroke: new style.Stroke({
          color: '#fff',
          width: 2
        })
      })
    });


    var punto = new Feature({
      geometry: new geom.Point(fromLonLat([this.ubicacion.longitude, this.ubicacion.latitude])),
      style: iconStyle
    });

    punto.setStyle(iconStyle);
    featuresPoint.push(punto);

    let markers = new Vector({
      features: featuresPoint
    });

    this.markerVectorLayerPosicionActual = new VectorLayer({
      source: markers,
    });

    this.map.addLayer(this.markerVectorLayerPosicionActual);

    // lo dejo escuchando los cambios de la ubicacion, asi los dibuja.
    this.watchCurrentPostition = this._geolocation.watchPosition().subscribe((data) => {
      this.ubicacion = data.coords;
      this.agregarMarcadorPosicionActual();
    });
  }

  // obtenerPuntosObras() {
  //   this._mapService.obtenerPuntosObra().subscribe(
  //       response => {
  //       this.puntosMapaObra = this._procesarRespuesta.response(response);
  //       this.agregarCapaPuntosObra();
  //     },
  //       error => {
  //         this._toast.pushError("Error al obtener puntos de Construción");
  //       }
  //     );
  // }

  obtenerPuntosIndustria() {
    this._mapService.obtenerPuntosIndustria().subscribe(
      response => {
      this.puntosMapaIndustria = response;
      this.agregarCapaPuntosIndustria();
    },
      error => {
        this._toast.pushError("Error al obtener puntos de Industria y Comercio");
      }
    );
  }

  agregarCapaPuntosObra() {
    let featuresPoint: Feature[];
     featuresPoint = [];

    var iconStyle = new style.Style({
      image: new style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/icon/iconoObra.png'
      }))
    });

    this.puntosMapaObra.forEach( x => {
      var punto = new Feature({
        geometry: new geom.Point(fromLonLat([parseFloat(x.longitud), parseFloat(x.latitud)])),
        Tipo: x.tipoPunto,
        Obra: x.nroObra,
        style: iconStyle
        });
        punto.setStyle(iconStyle);
      featuresPoint.push( punto );
    });

    let markers = new Vector({
      features: featuresPoint
    });

    let markerVectorLayer = new VectorLayer({
      source: markers,

  });

    this.map.addLayer(markerVectorLayer);
  }

  agregarCapaPuntosIndustria() {
    let featuresPoint: Feature[];
    featuresPoint = [];

    this.puntosMapaIndustria.forEach( x => {
      var punto = new Feature({
        geometry: new geom.Point(fromLonLat([parseFloat(x.longitud), parseFloat(x.latitud)])),
        Tipo: x.tipoPunto,
        Denominacion: x.denominacion,
        Aportacion: x.aportacion,
        Empresa: x.empresa,
        Contribuyente: x.contribuyente,
        Local: x.local,
        });
      featuresPoint.push( punto );
    });

    let markers = new Vector({
      features: featuresPoint
    });

    let markerVectorLayer = new VectorLayer({
      source: markers,

  });
    this.cluster(featuresPoint);

  }

  agregarEventoOnclickConPopUp() {
    // pop up para ver datos de los puntos
    this.overlayPopUP = new Overlay({
      element: this.popup.nativeElement ,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });
    this.map.addOverlay(this.overlayPopUP);

    // pop up para ver el modal de seleccion de capas
    this.overlayPopUPAcciones = new Overlay({
      element: this.popupAcciones.nativeElement ,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    });

    this.map.addOverlay(this.overlayPopUPAcciones);

    this.map.on('dblclick', (evt) => {
      // es un click en cualquier lado entonces abro pop up de opciones
      this.popUpAbierto = true;
      this.agregarMarcadorPosicionSeleccionada(evt.coordinate);
      this.map.getView().animate({center: evt.coordinate, duration: 500});
      this.overlayPopUPAcciones.setPosition(evt.coordinate);
      const puntoGoogle = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');

      //obtengo la url para consultar el padron
      let urlConsutaPadron = this.capaPadronesSource.getGetFeatureInfoUrl(
        evt.coordinate, this.view.getResolution(), 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
        urlConsutaPadron = urlConsutaPadron + '&QUERY_LAYERS=parcelario_urbano%2Cparcelario_rural';

      this.popUpOpcionesComponent.cargarPopUp(puntoGoogle, urlConsutaPadron);
      this.map.addOverlay(this.overlayPopUPAcciones);
      
    });

    // display popup on click
    this.map.on('singleclick', (evt) => {
      var sFeature = this.map.forEachFeatureAtPixel(evt.pixel,
        sFeature => {
          return sFeature;
          });
        
      if (sFeature && sFeature.getProperties().features.length == 1) {
        var featureSeleccionada = sFeature.getProperties().features[0];
        var coordinates = featureSeleccionada.getGeometry().getCoordinates();
        this.map.getView().animate({center: coordinates, duration: 500});
        const id = sFeature.getId();
        const propiedades = featureSeleccionada.getProperties();
        this.puntoOverlayMensaje.id = id;
        this.puntoOverlayMensaje.propiedades = propiedades;
        this.overlayPopUP.setPosition(coordinates);
        this.map.addOverlay(this.overlayPopUP);
        this.overlayPopUP.setVisible(true);
        this._overlayMessageComponent.cargarPopUp();
      }
      if (sFeature && sFeature.getProperties().features.length > 1) {
        // toco en un cluster
        this.informacion.puntos = sFeature.values_.features;
        this.mostrarModalCluster(this.informacion);

      }
    });
  }

  cerrarPopUp(cierro) {
    this.map.removeOverlay(this.overlayPopUP);
  }

  cerrarPopUpAcciones(cierro) {
    this.map.removeOverlay(this.overlayPopUPAcciones);
    this.popUpAbierto = false;
    this.map.removeLayer(this.markerVectorLayerPosicionSeleccionada);
  }

  cerrarPopUpCluster(){
    this.map.removeOverlay(this.popupClusterOVerlay);
  }
  
  agregarMarcadorPosicionSeleccionada(coord)  {
    let featuresPoint: Feature[];
     featuresPoint = [];

    var iconStyle =  new style.Style({
      image: new style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/icon/mapa/posactual.png'
      }))
    });

    var punto = new Feature({
      geometry: new geom.Point(coord),
      style: iconStyle
    });

    punto.setStyle(iconStyle);
    featuresPoint.push(punto);

    let markers = new Vector({
      features: featuresPoint
    });

    this.markerVectorLayerPosicionSeleccionada = new VectorLayer({
      source: markers,
    });

    this.map.addLayer(this.markerVectorLayerPosicionSeleccionada);
  }

  centrarEnUbicacion() {
      this.checkLocalizar = !this.checkLocalizar;
      this.map.getView().animate({center: fromLonLat([this.ubicacion.longitude, this.ubicacion.latitude]), duration: 500});
      setTimeout(() => {
        this.checkLocalizar = !this.checkLocalizar;
      }, 500);
  }

  cluster(_features: Feature[]) {
    var clusterSourcePoint = new source.Cluster({
      distance: 20,
      source: new source.Vector({
        features: _features
      })
    });

    // Animated cluster layer
    var styleCache = {};
    function getStyle (feature) {
      let size = feature.get('features').length;
      let _style = styleCache[size];
      var texto;
      if (size == 1) {
         texto = new style.Text({
          text: ' ',
          fill: new style.Fill({
            color: '#fff'
          })
        });
      } else {
        texto = new style.Text({
          text: size.toString(),
          fill: new style.Fill({
            color: '#fff'
          }),
          font: '12px Verdana',
        });
      }
      if (!_style) {
        var varcolor = '#42BF16';
        _style = styleCache[size] = new style.Style({
          image: new style.Circle({
            radius: 15,
            fill: new style.Fill({
              color: '#42BF16'
            }),
            stroke: new style.Stroke({
              color: '#fff',
              width: 2
            })
          }),
          text: texto
        });
      }
      return [_style];
    }

    // Animated cluster layer
    var clusterLayer = new AnimatedCluster({
      name: 'Cluster',
      source: clusterSourcePoint,
      animationDuration: 700,
      style: getStyle
    });


    // Style for selection
    var img = new style.Circle({
      radius: 15,
      stroke: new style.Stroke({
        color:"rgba(0,255,255,1)",
        width:1
      }),
      fill: new style.Fill({
        color:"rgba(0,255,255,0.3)"
      })
    });
    var style0 = new style.Style({
      image: img
    });
    this.map.addLayer(clusterLayer);

  }


  async mostrarMenu() {
    let modalCerrar = null;
    await this._modalController.create({
      component: ModalCapas,
      componentProps:{
        'inCheckPadron' : this.checkPadron,
        'inCheckMapaGoogle' : this.checkMapaGoogle,
        'inCheckMapaCorreo' : this.checkMaparaCorreo
      }
    }).then( modal => {
      modalCerrar = modal;
      modal.present();
    });

    const  modalCerrado  = await modalCerrar.onWillDismiss();
    this.checkPadron = modalCerrado.data.checkPadron;
    this.checkMapaGoogle = modalCerrado.data.checkMapaGoogle;
    this.checkMaparaCorreo =  modalCerrado.data.checkMapaCorreo;

    this.mostrarLayerPadrones();
    this.mostrarLayerMapaBase();
  }

  async mostrarModalCluster(info: Informacion) {
    let modalCerrar = null;
    await this._modalController.create({
      component: ModalClusterComponent,
      componentProps: {
        'info' : info
      }
    }).then( modal => {
      modalCerrar = modal;
      modal.present();
    });

    await modalCerrar.onWillDismiss();
  }

}
