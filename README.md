uruguay-mapa
---------
## Como ejecutar?
Comandos:
1. Instalar paquetes
```
npm install
```
2. Hay un componente que usa el dist de la liberia, hay que generarlo con el comando:
```
ng build uruguay-mapa

```
2. Iniciar
```
npm start
```

Acceder a la url http://localhost:4200/

## Llamar a la libreria desde un componente local
1. Hay un componente que usa el dist de la liberia, hay que generarlo con el comando:
```
ng build uruguay-mapa
```

2. En el modulo de componbente hacer el import
```
import { UruguayMapaComponent } from 'uruguay-mapa';
```

3. Agregar el componente en declarations del modulo.
```
declarations: [
    UruguayMapaComponent,
....]
```

##  Tareas
https://trello.com/b/ybtDfbPd/uruguay-mapa

## Deploy npm
https://medium.com/@insomniocode/creando-una-librer%C3%ADa-angular-y-subi%C3%A9ndola-a-npm-f78d212e8e71
