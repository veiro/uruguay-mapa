// General Imports
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
import { DataOutOnClick } from './model/data-out-on-click';
import { HttpClient } from '@angular/common/http';
import { UruguayMapaServices } from './services/uruguay-mapa.services';

@Component({
  selector: 'uruguay-mapa',
  templateUrl: './uruguay-mapa.component.html',
  styleUrls: [ './uruguay-mapa.component.css'],
})

export class UruguayMapaComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('map') map: Map;
    @ViewChild(OverlayMessageComponent) _overlayMessageComponent: OverlayMessageComponent;
    @ViewChild(PopUpOpcionesComponent) popUpOpcionesComponent: PopUpOpcionesComponent;
    @ViewChild('popupAcciones') popupAcciones: any;
    @ViewChild('popup') popup: any;

    // Input Parameters
    @Input() centerCoordinates = {latitude: -32.659237, longitude: -56.082402};
    @Input() centerInDeviceLocation = true;
    @Input() customLayers = null;
    @Input() initialZoom = 7;
    @Input() showDeviceLocation = true;
    @Input() showLayerElCorreo = true;
    @Input() showLayerGoogleMaps = true;
    @Input() showLayerIDEUY = true;
    @Input() showLayerOSM = true;
    @Input() showLayerPadrones = true;
    @Input() showLayerRoutes = true;
    @Input() showLayersSelector = true;
    @Input() showScaleLine = true;
    @Input() showUserLocationButton = true;
    @Input() showZoom = true;
    @Input() showZoomSlider = true;

    // Output parameters
    @Output() eventClick = new EventEmitter<DataOutOnClick>();

    // Layers
    layerDeviceLocation = Layers.layerDeviceLocation;
    layerIDEUY = Layers.LayerIDEUY;
    layerMapaElCorreo = Layers.LayerMapaElCorreo;
    layerMapaGoogleMaps =  Layers.LayerMapaGoogleMaps;
    layerOSM =  Layers.LayerOSM;
    layerPadrones = Layers.LayerPadrones;
    layerRoutes = Layers.LayerRoutes;

    // Visible Layers
    checkMapaCorreo = false;
    checkMapaIDEUY = false;
    checkMapaOSM = false;
    checkMapaGoogle = false;
    checkPadron = false;
    checkRoutes = false;

    // Subscriptions
    watchCurrentPosition: any;

    // Data
    ubicacion: Coordinates;

    // Global variables    
    view: any;
    layerPosicionSeleccionada: any;

   

    constructor(
      private _geolocation: Geolocation,
      public _modalController: ModalController,
      private _uruguayMapaServices: UruguayMapaServices
    ) { }

    ngOnInit() {
        //console.log('[mapa-openlayers.component.ts] - ngOnInit | Start');
        this._geolocation.getCurrentPosition().then((resp) => {
          //console.log('Voy a inicar con: ', resp.coords);
          this.inicar(resp.coords);
        }).catch((error) => {
          console.error('No se puedieron obtener las coordenas', error);
          this.inicar(this.centerCoordinates);
        });
    }

    private inicar(coordenadas) {
        this.ubicacion = coordenadas;
        this.initMap();
        this.showSelectedLayers();
        this.addDeviceLocationMarker();
        this.loadCustomLayers();


        this.agregarEventoOnclickConPopUp();
        // Workaround to show map in the first render
        const that = this;
        setTimeout(that.map.updateSize(), 1000);
    }

    ngAfterViewInit() {
        //console.log('[mapa-openlayers.component.ts] - ngAfterViewInit | Start');
    }

    ngOnDestroy() {
        //console.log('[mapa-openlayers.component.ts] - ngOnDestroy | Start');
        this.watchCurrentPosition.unsubscribe();
    }

    initMap() {
        //console.log('[mapa-openlayers.component.ts] - initMap | Start');
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
        //console.log('[mapa-openlayers.component.ts] - loadLayers | Start');
        const layers = [];

        if (this.showLayerElCorreo) {
          layers.push(this.layerMapaElCorreo);
          this.checkMapaCorreo = true;
        }
        if (this.showLayerIDEUY) {
            layers.push(this.layerIDEUY);
            if (!this.showLayerElCorreo) {
                this.checkMapaIDEUY = true;
            }
        }
        if (this.showLayerOSM) {
            layers.push(this.layerOSM);
            if (!this.showLayerElCorreo && !this.showLayerIDEUY) {
                this.checkMapaOSM = true;
            }
        }
        if (this.showLayerGoogleMaps) {
          layers.push(this.layerMapaGoogleMaps);
            if (!this.showLayerElCorreo && !this.showLayerIDEUY && !this.showLayerOSM) {
                this.checkMapaGoogle = true;
            }
        }
        if (this.showDeviceLocation) {
          layers.push(this.layerDeviceLocation);
        }
        if (this.showLayerPadrones) {
          layers.push(this.layerPadrones);
        }
        if (this.showLayerRoutes) {
          layers.push(this.layerRoutes);
        }

        return layers;
    }

    loadCenter() {
        //console.log('[mapa-openlayers.component.ts] - loadCenter | Start');
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
        //console.log('[mapa-openlayers.component.ts] - showSelectedLayers | Start');
        this.showBaseLayer();
        this.showInformativeLayers();
    }

    showBaseLayer() {
        //console.log('[mapa-openlayers.component.ts] - showBaseLayer | Start');
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
        //console.log('[mapa-openlayers.component.ts] - showInformativeLayers | Start');
        this.layerPadrones.setVisible(this.checkPadron);
        this.layerRoutes.setVisible(this.checkRoutes);
    }

    addDeviceLocationMarker()  {
        //console.log('[mapa-openlayers.component.ts] - addDeviceLocationMarker | Start');
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
              this.addDeviceLocationMarker();
            });
          }
        }
    }

    loadCustomLayers() {
        //console.log('[mapa-openlayers.component.ts] - loadCustomLayers | Start');
        if (this.customLayers && this.customLayers.length > 0) {
          this.customLayers.forEach(customLayer => this.createCustomLayer(customLayer));
        }
    }

    createCustomLayer(customLayer) {
        //console.log('[mapa-openlayers.component.ts] - createCustomLayer | Start');
        //console.log('[mapa-openlayers.component.ts] - createCustomLayer | customLayer:');
        //console.log(customLayer);

        const featuresPoint: Feature[] = [];

        customLayer.LayerData.forEach( featureData => {
          // tslint:disable-next-line:max-line-length
          const feature = new Feature({...featureData, geometry: new geom.Point(fromLonLat([parseFloat(featureData.longitude), parseFloat(featureData.latitude)]))});
          featuresPoint.push(feature);
        });
        const markers = new Vector({features: featuresPoint});

        let layer = null;
        const iconStyle = customLayer.IconStyle ? customLayer.IconStyle : {};

        function getStyle (feature) {
            const _style = new style.Style({
                // ToDo: use parameter IconStyle.Type (CIRCLE, SQUARE, TRIANGLE, STAR, ETC) and RegularShape from Open Layers
                image: new style.Circle({
                    radius: iconStyle.Size ? iconStyle.Size : 10,
                    fill: new style.Fill({
                        color: iconStyle.BackgroundColor ? iconStyle.BackgroundColor : '#42BF16'
                    }),
                    stroke: new style.Stroke({
                        color: iconStyle.BorderColor ? iconStyle.BorderColor : '#FFF',
                        width: iconStyle.BorderWidth ? iconStyle.BorderWidth : 2
                    })
                })
            });
            return [_style];
        }

        if (customLayer.Cluster) {
            const clusterDistance = customLayer.ClusterDistance ? customLayer.ClusterDistance : 50;
            const clusterAnimationDuration = customLayer.ClusterAnimationDuration ? customLayer.ClusterAnimationDuration : 700;
            const layerName = customLayer.LayerName;
            layer = this.createCustomLayerWithCluster(featuresPoint, clusterDistance, clusterAnimationDuration, iconStyle, layerName);
        } else {
            layer = new VectorLayer({style: getStyle, source: markers});
        }
        this.map.addLayer(layer);
    }

    createCustomLayerWithCluster(_features: Feature[], clusterDistance, clusterAnimationDuration, clusterIconStyle, layerName) {
        const clusterSourcePoint = new source.Cluster({
          distance: clusterDistance,
          source: new source.Vector({
            features: _features
          })
        });

        const styleCache = {};
        function getStyle (feature) {
          const size = feature.get('features').length;
          let _style = styleCache[size];
          const text = new style.Text({
              text: size === 1 ? ' ' : size.toString(),
              fill: new style.Fill({
                  color: clusterIconStyle.TextColor ? clusterIconStyle.TextColor : '#FFF'
              }),
              font: clusterIconStyle.ClusterTextFont ? clusterIconStyle.ClusterTextFont : '12px Verdana'
          });

          if (!_style) {
            _style = styleCache[size] = new style.Style({
                // ToDo: use parameter clusterIconStyle.Type (CIRCLE, SQUARE, TRIANGLE, STAR, ETC) and RegularShape from Open Layers
                image: new style.Circle({
                    radius: clusterIconStyle.Size ? clusterIconStyle.Size : 10,
                    fill: new style.Fill({
                    color: clusterIconStyle.BackgroundColor ? clusterIconStyle.BackgroundColor : '#42BF16'
                }),
                stroke: new style.Stroke({
                    color: clusterIconStyle.BorderColor ? clusterIconStyle.BorderColor : '#FFF',
                    width: clusterIconStyle.BorderWidth ? clusterIconStyle.BorderWidth : 2
                })
              }),
              text: text
            });
          }
          return [_style];
        }

        const clusterLayer = new AnimatedCluster({
          name: layerName ? layerName : 'ClusterLayer',
          source: clusterSourcePoint,
          animationDuration: clusterAnimationDuration,
          style: getStyle
        });

        return clusterLayer;
    }








   

    agregarEventoOnclickConPopUp() {     

        this.map.on('singleclick', (evt) => {
          let infoOut = new DataOutOnClick();

          infoOut.coordinates = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
          
          let promiseInfoPadron = this.obtenerInfoPadron(evt, infoOut);          

          const sFeature = this.map.forEachFeatureAtPixel(evt.pixel, (_sFeature => _sFeature));

          if (sFeature && sFeature.getProperties().features.length === 1) {
            const featureSeleccionada = sFeature.getProperties().features[0];  
            // centro el mapa en la feature          
            const coordinates = featureSeleccionada.getGeometry().getCoordinates();
            this.map.getView().animate({center: coordinates, duration: 500});

            infoOut.featureSelected = featureSeleccionada.getProperties();
          }
          if (sFeature && sFeature.getProperties().features.length > 1) {
            // toco en un cluster
             sFeature.values_.features.forEach(element => {
              element.values_.geometry=null;
              infoOut.clusterFeatureSelected.push(element.values_);
             });
          }

          promiseInfoPadron.then(
            (val) => {              
              this.eventClick.emit(infoOut);
            }
          ,
            (err) => {
              this.eventClick.emit(infoOut);
            }
          );
          
        });
    }

  private obtenerInfoPadron(evt: any, infoOut: DataOutOnClick) {
    let promise = new Promise((resolve, reject) => {
      // calculo la url del serivicio wms de padrones con la funcion getFeatureInfo
      let urlConsutaPadron = this.layerPadrones.getSource().getGetFeatureInfoUrl(evt.coordinate, this.view.getResolution(), 'EPSG:3857', { 'INFO_FORMAT': 'application/json' });
      urlConsutaPadron = urlConsutaPadron + '&QUERY_LAYERS=parcelario_urbano%2Cparcelario_rural';

      //llamo con un get
      this._uruguayMapaServices.obtenerDatosDelPadron(urlConsutaPadron).subscribe(res => {
        //dependiendo el resultado aviso
        if (res.features[0]) {
          infoOut.padron = res.features[0].properties;
          resolve();
        }
      }, err => {
        console.error("Error al obtner la informacion del padron", err);
        reject();
      });
    });
    return promise;
  }

    // no se usa pero capaz que algun dia se quiere.  
    markOnThePositionSelected(evt){
      
      this.agregarMarcadorPosicionSeleccionada(evt.coordinate);
      this.map.getView().animate({center: evt.coordinate, duration: 500});
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

        this.layerPosicionSeleccionada = new VectorLayer({
          source: markers,
        });

        this.map.addLayer(this.layerPosicionSeleccionada);
    }

   

    async mostrarMenu() {
        let modalCerrar = null;

        await this._modalController.create({
          component: ModalCapas,
          componentProps: {
            'inShowPadron' : this.showLayerPadrones,
            'inCheckPadron' : this.checkPadron,
            'inShowRoutes' : this.showLayerRoutes,
            'inCheckRoutes' : this.checkRoutes,
            'inShowMapaGoogle' : this.showLayerGoogleMaps,
            'inCheckMapaGoogle' : this.checkMapaGoogle,
            'inShowMapaCorreo' : this.showLayerElCorreo,
            'inCheckMapaCorreo' : this.checkMapaCorreo,
            'inShowMapaIDEUY' : this.showLayerIDEUY,
            'inCheckMapaIDEUY' : this.checkMapaIDEUY,
            'inShowMapaOSM' : this.showLayerOSM,
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
        this.checkRoutes = modalCerrado.data.checkRoutes;

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
