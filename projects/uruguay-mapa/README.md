
# Uruguay Mapa

## Quien deberia usar?
Requisitos:
* Desarrolladores web que trabajen con Angular y no esten familiarizados con el stack de sistemas de información geografica y los estandares que se utilizan.
* El proyecto que estoy trabajando es sencillo, mostrar puntos con algun mapa base.

# Quien NO deberia usar?
* El proyecto que estoy trabajando tiene como componente central el mapa, se va a mostrar varias capas de datos y debe ser personalizable desde los botones hasta que servicios utiliza.

## Demo online

https://uruguay-mapa-como-usar.herokuapp.com/

## Versiones

Angular cli 7.3.9
Node 10.16.3
NPM 6.9.0

## ¿Video de como usar en Angular ?

https://youtu.be/aITfBc4Dz0U

## ¿Como usar en Angular paso a paso?

1- Instalar el componente, y algunas dependencias.
```
npm i uruguay-mapa
```


2- En el module root hacer el import
```
import { UruguayMapaModule } from 'uruguay-mapa';
```

3- Agregar el componente en declarations del module root .
```
imports: [
      UruguayMapaModule,
    ....
]

```

4- Tambien agregar la seccion schemas al module root si no la tenes agregada:

```
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
```
 * CUSTOM_ELEMENTS_SCHEMA  se debe agregar al import de @angular/core queda similar a la siguiente linea:
```
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```


5- En el html del componente que usa el mapa agregar la version sencilla:
```
<uruguay-mapa> </uruguay-mapa> 
```

6- Se puede agregar parametros de configuracion:
```
<uruguay-mapa 

        [centerCoordinates]="{latitude: -34.918195, longitude: -56.166603}"
        [centerInDeviceLocation]="true"
        [initialZoom]="17"
        [showDeviceLocation]="true"
        [showLayerElCorreo]="true"
        [showLayerIDEUY]="true"
        [showLayerGoogleMaps]="true"
        [showLayerOSM]="true"
        [showLayerPadrones]="true"
        [showLayersSelector]="true"
        [showScaleLine]="true"
        [showUserLocationButton]="true"
        [showZoom]="true"
        [showZoomSlider]="true"

></uruguay-mapa> 
```

## Funcionalidades

Cada funcionalidad tiene asociado un parametro de entrada, en la siguient tabla se lista los parametros, valor por defecto y un link a la documentacion.

| Parametro | Valor por defecto | Documentación |
| ------ | ------ |------ |
| centerCoordinates | latitude: -32.659237,  longitude: -56.082402 | [wiki-centrado-en-coordenadas](https://github.com/veiro/uruguay-mapa/wiki/Centrado-en-coordenadas) |
| centerInDeviceLocation | true | [en-proceso](google) |
| customLayers | null | [en-proceso](google) |
| initialZoom | 7 | [en-proceso](google)  |
| showDeviceLocation | true | [en-proceso](google)  |
| showLayerElCorreo | true | [en-proceso](google)  |
| showLayerIDEUY | true | [en-proceso](google)  |
| showLayerOSM | true | [en-proceso](google)  |
| showLayerPadrones | true | [en-proceso](google)  |
| showLayerRoutes | true | [en-proceso](google) |
| showLayersSelector | true | [en-proceso](google)  |
| showScaleLine | true | [en-proceso](google) |
| showUserLocationButton | true | [en-proceso](google)  |
| showZoom | true | [en-proceso](google)  |
| showZoomSlider | true | [en-proceso](google)  |

## Repositorio de codigo 
https://github.com/veiro/uruguay-mapa

## Tareas a futuro
https://trello.com/b/ybtDfbPd/uruguay-mapa

## Insights
https://npm-stat.com/charts.html?package=uruguay-mapa&from=2019-01-01&to=2019-11-25

## Origen del proyecto
El paquete es resultado de la implementación del proyecto del curso de Sistemas de Información Geograficos Empresariales dicatado en UDELAR - CPAP el año 2019.
El siguiente link es el informe que se genero para la entraga del trabajo final del curso, en cual se documenta mas del paquete. 
https://docs.google.com/document/d/1KpvKCahrResW7_p9KeUAEU95FuqRn8A1HLVRShBkIZ0/edit?usp=sharing

