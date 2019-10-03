// General Imports
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';

// Open Layers
import Overlay from 'ol/Overlay.js';
import Map from 'ol/Map';
import View from 'ol/View';
import { ScaleLine, Zoom, ZoomSlider } from 'ol/control.js';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj.js';
import { transform } from 'ol/proj.js';
import { Vector } from 'ol/source';
import * as source from 'ol/source';
import * as geom from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import * as style from 'ol/style';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';

// Layers
import * as Layers from './layers';

// Homemade Components
import { OverlayMensaje, OverlayMessageComponent } from './overlay-message/overlay-message.component';
import { PopUpOpcionesComponent } from './pop-up-opciones/pop-up-opciones.component';
import { ModalCapas } from './modal-capas/modal-capas.component';
import { Informacion, ModalClusterComponent } from './modal-cluster/modal-cluster.component';

// Models
// import { PuntoMapa } from 'src/app/model/punto-mapa';

// Services
import { MapaService } from './../../services/mapa/mapa.service';
import { ToastService } from 'src/app/services/toast/ToastService';

@Component({
  selector: 'app-mapa-openlayers',
  templateUrl: './mapa-openlayers.component.html',
  styleUrls: ['./mapa-openlayers.component.css'],
})

export class MapaOpenlayersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') map: Map;
  @ViewChild(OverlayMessageComponent) _overlayMessageComponent: OverlayMessageComponent;
  @ViewChild(PopUpOpcionesComponent) popUpOpcionesComponent: PopUpOpcionesComponent;
  @ViewChild('popupAcciones') popupAcciones: any;
  @ViewChild('popup') popup: any;

  // Input Parameters
  @Input() centerCoordinates = {latitude: -32.659237, longitude: -56.082402};
  @Input() centerInDeviceLocation = true;
  @Input() initialZoom = 7;
  @Input() showDeviceLocation = true;
  @Input() showLayerElCorreo = true;
  @Input() showLayerGoogleMaps = true;
  @Input() showLayerIDEUY = true;
  @Input() showLayerOSM = true;
  @Input() showLayerPadrones = true;
  @Input() showLayersSelector = true;
  @Input() showScaleLine = true;
  @Input() showUserLocationButton = true;
  @Input() showZoom = true;
  @Input() showZoomSlider = true;

  // Layers
  layerDeviceLocation = Layers.layerDeviceLocation;
  layerMapaElCorreo = Layers.LayerMapaElCorreo;
  layerMapaGoogleMaps =  Layers.LayerMapaGoogleMaps;
  layerOSM =  Layers.LayerOSM;
  layerPadrones = Layers.LayerPadrones;
  layerIDEUY = Layers.LayerIDEUY;

  // Visible Layers
  checkMapaCorreo = this.showLayerElCorreo;
  checkMapaIDEUY = !this.showLayerElCorreo && this.showLayerIDEUY;
  checkMapaOSM = !this.showLayerElCorreo && !this.showLayerIDEUY && this.showLayerOSM;
  checkMapaGoogle = !this.showLayerElCorreo && !this.showLayerIDEUY && !this.showLayerOSM && this.showLayerGoogleMaps;
  checkPadron = false;

  // Subscriptions
  watchCurrentPosition: any;

  // To Review
  puntosMapaObra: Array<any>;
  puntosMapaIndustria: Array<any>;
  capaActual: TileLayer;
  geolocation: any;
  puntoOverlayMensaje: OverlayMensaje = new OverlayMensaje();
  informacion: Informacion = new Informacion();
  mostrarOverlay = false;
  overlayPopUP: any;
  overlayPopUPAcciones: any;
  popupClusterOVerlay: any;
  checkLocalizar = false;
  clusterSource: any;
  view: any;
  popUpAbierto = false;
  ubicacion: Coordinates;
  markerVectorLayerPosicionSeleccionada: any;

  constructor (
      public _mapService: MapaService,
      private _toast: ToastService,
      private _geolocation: Geolocation,
      public _modalController: ModalController
  ) {
    console.log('[mapa-openlayers.component.ts] - constructor | Start');
  }

  ngOnInit() {
    console.log('[mapa-openlayers.component.ts] - ngOnInit | Start');
    // ToDo: Habría que sacar del then los métodos que iniializan el mapa, y resolver de otra forma la muestra de la posición del usuario.
    // ToDo: Se se hace eso, si falla la obtanción de la ubicación, el resto anda igual.
    this._geolocation.getCurrentPosition().then((resp) => {
      this.ubicacion = resp.coords;
      this.initMap();
      this.showSelectedLayers();
      this.agregarMarcadorPosicionActual();

      this.obtenerPuntosIndustria();
      this.agregarEventoOnclickConPopUp();

      // Workaround to show map in the first render
      const that = this;
      setTimeout(function() { that.map.updateSize(); }, 300);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ngAfterViewInit() {
    console.log('[mapa-openlayers.component.ts] - ngAfterViewInit | Start');
  }

  ngOnDestroy() {
    console.log('[mapa-openlayers.component.ts] - ngOnDestroy | Start');
    // ToDo: Ver si hay alguna otra subscripción para remover.
    this.watchCurrentPosition.unsubscribe();
  }

  initMap() {
    console.log('[mapa-openlayers.component.ts] - initMap | Start');
    const layers = this.loadLayers();
    const center = this.loadCenter();
    const controls = this.loadControls();

    this.view = new View({
      projection: 'EPSG:900913',
      center,
      zoom: this.initialZoom
    });

    this.map = new Map({
      target: 'map',
      controls: controls,
      layers,
      view: this.view
    });
  }

  loadLayers(): any[] {
    console.log('[mapa-openlayers.component.ts] - loadLayers | Start');
    const layers = [];

    if (this.showLayerElCorreo) {
      layers.push(this.layerMapaElCorreo);
    }
    if (this.showLayerGoogleMaps) {
      layers.push(this.layerMapaGoogleMaps);
    }
    if (this.showLayerIDEUY) {
      layers.push(this.layerIDEUY);
    }
    if (this.showLayerOSM) {
      layers.push(this.layerOSM);
    }
    if (this.showDeviceLocation) {
      layers.push(this.layerDeviceLocation);
    }
    if (this.showLayerPadrones) {
      layers.push(this.layerPadrones);
    }

    return layers;
  }

  loadCenter() {
    console.log('[mapa-openlayers.component.ts] - loadCenter | Start');
    let latitude = 0;
    let longitude = 0;

    if (this.centerInDeviceLocation) {
      latitude = this.ubicacion.latitude;
    } else if (this.centerCoordinates && this.centerCoordinates.latitude) {
      latitude = this.centerCoordinates.latitude;
    }

    if (this.centerInDeviceLocation) {
      longitude = this.ubicacion.longitude;
    } else if (this.centerCoordinates && this.centerCoordinates.longitude) {
      longitude = this.centerCoordinates.longitude;
    }

    return fromLonLat([longitude, latitude]);
  }

  loadControls() {
    const controls = [];

    if (this.showScaleLine) {
      controls.push(new ScaleLine());
    }
    if (this.showZoom) {
      controls.push(new Zoom());
    }
    if (this.showZoomSlider) {
      controls.push(new ZoomSlider());
    }

    return controls;
  }

  showSelectedLayers() {
    console.log('[mapa-openlayers.component.ts] - showSelectedLayers | Start');
    this.showBaseLayer();
    this.showInformativeLayers();
  }

  showBaseLayer() {
    console.log('[mapa-openlayers.component.ts] - showBaseLayer | Start');
    if (this.checkMapaCorreo) {
        this.layerMapaElCorreo.setVisible(true);
        this.layerIDEUY.setVisible(false);
        this.layerOSM.setVisible(false);
        this.layerMapaGoogleMaps.setVisible(false);
    } else if (this.checkMapaIDEUY) {
        this.layerMapaElCorreo.setVisible(false);
        this.layerIDEUY.setVisible(true);
        this.layerOSM.setVisible(false);
        this.layerMapaGoogleMaps.setVisible(false);
    } else if (this.checkMapaOSM) {
        this.layerMapaElCorreo.setVisible(false);
        this.layerIDEUY.setVisible(false);
        this.layerOSM.setVisible(true);
        this.layerMapaGoogleMaps.setVisible(false);
    } else if (this.checkMapaGoogle) {
        this.layerMapaElCorreo.setVisible(false);
        this.layerIDEUY.setVisible(false);
        this.layerOSM.setVisible(false);
        this.layerMapaGoogleMaps.setVisible(true);
    }
  }

  showInformativeLayers() {
    console.log('[mapa-openlayers.component.ts] - showInformativeLayers | Start');
    this.layerPadrones.setVisible(this.checkPadron);
  }

  agregarMarcadorPosicionActual()  {
    console.log('[mapa-openlayers.component.ts] - agregarMarcadorPosicionActual | Start');
    if (this.showDeviceLocation) {
      this.layerDeviceLocation.getSource().clear();
      const userLocationIconStyle = new style.Style({
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
      const userLocation = new Feature({
        geometry: new geom.Point(fromLonLat([this.ubicacion.longitude, this.ubicacion.latitude]))
      });
      userLocation.setStyle(userLocationIconStyle);
      this.layerDeviceLocation.getSource().addFeature(userLocation);

      // Lo dejo escuchando los cambios de la ubicacion, asi los dibuja.
      if (!this.watchCurrentPosition) {
        this.watchCurrentPosition = this._geolocation.watchPosition().subscribe((data) => {
          this.ubicacion = data.coords;
          this.agregarMarcadorPosicionActual();
        });
      }
    }
  }




  obtenerPuntosIndustria() {
    this._mapService.obtenerPuntosIndustria().subscribe(
      response => {
      this.puntosMapaIndustria = response;
      this.agregarCapaPuntosIndustria();
    },
      error => {
        this._toast.pushError('Error al obtener puntos de Industria y Comercio');
      }
    );
  }

  agregarCapaPuntosObra() {
    let featuresPoint: Feature[];
     featuresPoint = [];

    const iconStyle = new style.Style({
      image: new style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/icon/iconoObra.png'
      }))
    });

    this.puntosMapaObra.forEach( x => {
      const punto = new Feature({
        geometry: new geom.Point(fromLonLat([parseFloat(x.longitud), parseFloat(x.latitud)])),
        Tipo: x.tipoPunto,
        Obra: x.nroObra,
        style: iconStyle
        });
        punto.setStyle(iconStyle);
      featuresPoint.push( punto );
    });

    const markers = new Vector({
      features: featuresPoint
    });

    const markerVectorLayer = new VectorLayer({
      source: markers,

  });

    this.map.addLayer(markerVectorLayer);
  }

  agregarCapaPuntosIndustria() {
    let featuresPoint: Feature[];
    featuresPoint = [];

    this.puntosMapaIndustria.forEach( x => {
      const punto = new Feature({
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

    const markers = new Vector({
      features: featuresPoint
    });

    const markerVectorLayer = new VectorLayer({
      source: markers
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

      // obtengo la url para consultar el padron
      let urlConsutaPadron = this.layerPadrones.getSource().getGetFeatureInfoUrl(
        evt.coordinate, this.view.getResolution(), 'EPSG:3857',
        {'INFO_FORMAT': 'application/json'});
        urlConsutaPadron = urlConsutaPadron + '&QUERY_LAYERS=parcelario_urbano%2Cparcelario_rural';

      this.popUpOpcionesComponent.cargarPopUp(puntoGoogle, urlConsutaPadron);
      this.map.addOverlay(this.overlayPopUPAcciones);
    });

    // display popup on click
    this.map.on('singleclick', (evt) => {
      const sFeature = this.map.forEachFeatureAtPixel(evt.pixel, (_sFeature => _sFeature));

      if (sFeature && sFeature.getProperties().features.length === 1) {
        const featureSeleccionada = sFeature.getProperties().features[0];
        const coordinates = featureSeleccionada.getGeometry().getCoordinates();
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

  cerrarPopUpCluster() {
    this.map.removeOverlay(this.popupClusterOVerlay);
  }

  agregarMarcadorPosicionSeleccionada(coord)  {
    let featuresPoint: Feature[];
     featuresPoint = [];

    const iconStyle =  new style.Style({
      image: new style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/icon/mapa/posactual.png'
      }))
    });

    const punto = new Feature({
      geometry: new geom.Point(coord),
      style: iconStyle
    });

    punto.setStyle(iconStyle);
    featuresPoint.push(punto);

    const markers = new Vector({
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
    const clusterSourcePoint = new source.Cluster({
      distance: 20,
      source: new source.Vector({
        features: _features
      })
    });

    // Animated cluster layer
    const styleCache = {};
    function getStyle (feature) {
      const size = feature.get('features').length;
      let _style = styleCache[size];
      let texto;
      if (size === 1) {
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
        const varcolor = '#42BF16';
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
    const clusterLayer = new AnimatedCluster({
      name: 'Cluster',
      source: clusterSourcePoint,
      animationDuration: 700,
      style: getStyle
    });


    // Style for selection
    const img = new style.Circle({
      radius: 15,
      stroke: new style.Stroke({
        color: 'rgba(0,255,255,1)',
        width: 1
      }),
      fill: new style.Fill({
        color: 'rgba(0,255,255,0.3)'
      })
    });
    const style0 = new style.Style({
      image: img
    });
    this.map.addLayer(clusterLayer);

  }

  async mostrarMenu() {
    let modalCerrar = null;

    await this._modalController.create({
      component: ModalCapas,
      componentProps: {
        'inCheckPadron' : this.checkPadron,
        'inCheckMapaGoogle' : this.checkMapaGoogle,
        'inCheckMapaCorreo' : this.checkMapaCorreo,
        'inCheckMapaIDEUY' : this.checkMapaIDEUY,
        'inCheckMapaOSM' : this.checkMapaOSM
      }
    }).then( modal => {
      modalCerrar = modal;
      modal.present();
    });

    const  modalCerrado  = await modalCerrar.onWillDismiss();
    this.checkMapaCorreo =  modalCerrado.data.checkMapaCorreo;
    this.checkMapaIDEUY =  modalCerrado.data.checkMapaIDEUY;
    this.checkMapaOSM =  modalCerrado.data.checkMapaOSM;
    this.checkMapaGoogle = modalCerrado.data.checkMapaGoogle;
    this.checkPadron = modalCerrado.data.checkPadron;

    this.showSelectedLayers();
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
