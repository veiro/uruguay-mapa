
# Uruguay Mapa

## Origen del proyecto

El paquete es resultado de la implementación del proyecto del curso de Sistemas de Información Geograficos Empresariales dicatado en UDELAR - CPAP el año 2019.

El siguiente link es el informe que se genero para la entraga del trabajo final del curso, en cual se documenta mas del paquete. 
https://docs.google.com/document/d/1KpvKCahrResW7_p9KeUAEU95FuqRn8A1HLVRShBkIZ0/edit?usp=sharing

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

## Insights

Se siguio la guia https://medium.com/dailyjs/insights-for-npm-packages-1b81a8309a3a

Se puede ver el reporte en https://npm-insights-app.now.sh/uruguay-mapa

## Repositorio de codigo
https://github.com/veiro/uruguay-mapa

## Tareas a futuro
https://trello.com/b/ybtDfbPd/uruguay-mapa

## Deploy npm
https://medium.com/@insomniocode/creando-una-librería-angular-y-subiéndola-a-npm-f78d212e8e71
https://angular.io/guide/creating-libraries#using-your-own-library-in-apps