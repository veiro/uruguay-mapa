# EN DESARROLLO !!


# Uruguay Mapa

## Como usar?

1. En el module de componente hacer el import
```
import { UruguayMapaComponent } from 'uruguay-mapa';
```

2. Agregar el componente en declarations del module.
```
declarations: [
    UruguayMapaComponent,
    ModalCapas,
    ....
]

```

3. En el module tambien en la seccion 
```
entryComponents: [
    ModalCapas,
    ......
  ],
```

4. En el html del componente que usa el mapa agregar la version sencilla:
```
<app-mapa-openlayers style="width: 100%; height: 100%;"></app-mapa-openlayers> 
```

5. Se puede agregar parametros de configuracion:
```
<app-mapa-openlayers

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
        
></app-mapa-openlayers> 
```

## Repositorio de codigo
https://github.com/veiro/uruguay-mapa

## Tareas a futuro
https://trello.com/b/ybtDfbPd/uruguay-mapa

## Deploy npm
https://medium.com/@insomniocode/creando-una-librería-angular-y-subiéndola-a-npm-f78d212e8e71