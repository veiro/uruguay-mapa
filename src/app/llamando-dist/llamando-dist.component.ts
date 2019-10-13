import { Component } from '@angular/core';

@Component({
    templateUrl: 'llamando-dist.component.html',
    styleUrls:  ['llamando-dist.component.css']
})

export class LlamandoDist {
    customLayers = [];

    constructor() {
        this.loadCustomLayers();
    }

    loadCustomLayers() {
        const layerUniversidades = {
            LayerName: 'Universidades',
            LayerSelectorLabel: 'Universidades',
            GeometryType: 'POINT',
            Cluster: true,
            ClusterDistance: 50,
            ClusterAnimationDuration: 700,
            IconStyle: {
                Type: 'CIRCLE',
                Size: 10,
                TextColor: '#FFF',
                ClusterTextFont: '12px Verdana',
                BackgroundColor: '#42BF16',
                BorderColor: '#FFF',
                BorderWidth: 2
            },
            LayerData: [
                {
                    latitude: -34.918221,
                    longitude: -56.166294,
                    name: 'Facultad de Ingeniería'
                },
                {
                    latitude: -34.909926,
                    longitude: -56.163918,
                    name: 'Facultad de Arquitectura'
                },
                {
                    latitude: -34.888486,
                    longitude: -56.185557,
                    name: 'Facultad de Química'
                },
                {
                    latitude: -34.896954,
                    longitude: -56.140275,
                    name: 'Facultad de Veterinaria'
                },
                {
                    latitude: -34.888239,
                    longitude: -56.186256,
                    name: 'Facultad de Medicina'
                },
                {
                    latitude: -34.836842,
                    longitude: -56.221481,
                    name: 'Facultad de Agronomía'
                },
                {
                    latitude: -34.902401,
                    longitude: -56.176658,
                    name: 'Facultad de Derecho'
                },
                {
                    latitude: -34.912236,
                    longitude: -56.173198,
                    name: 'Facultad de Ciencias Económicas'
                }
            ]
        };

        const layerTiendaInglesa = {
            LayerName: 'TiendaInglesa',
            LayerSelectorLabel: 'Sucursales Tienda Inglesa',
            GeometryType: 'POINT',
            Cluster: true,
            ClusterDistance: 50,
            ClusterAnimationDuration: 700,
            IconStyle: {
                Type: 'CIRCLE',
                Size: 10,
                TextColor: '#FFF',
                ClusterTextFont: '12px Verdana',
                BackgroundColor: '#FF0000',
                BorderColor: '#FFF',
                BorderWidth: 2
            },
            LayerData: [
                {
                    latitude: -34.857116,
                    longitude: -56.195223,
                    name: 'Tienda Inglesa Parque Posadas'
                },
                {
                    latitude: -34.865738,
                    longitude: -56.164667,
                    name: 'Tienda Inglesa Propios'
                },
                {
                    latitude: -34.870888,
                    longitude: -56.134939,
                    name: 'Tienda Inglesa Unión'
                },
                {
                    latitude: -34.883313,
                    longitude: -56.081921,
                    name: 'Tienda Inglesa Central'
                },
                {
                    latitude: -34.887939,
                    longitude: -56.058356,
                    name: 'Tienda Inglesa Arocena'
                },
                {
                    latitude: -34.902654,
                    longitude: -56.136171,
                    name: 'Tienda Inglesa Montevideo Shopping'
                },
                {
                    latitude: -34.913741,
                    longitude: -56.148933,
                    name: 'Tienda Inglesa Pocitos'
                },
                {
                    latitude: -34.899479,
                    longitude: -56.175254,
                    name: 'Tienda Inglesa Arenal Grande'
                }
            ]
        };

        this.customLayers.push(layerUniversidades);
        this.customLayers.push(layerTiendaInglesa);
    }


    alertar(event){
        alert(JSON.stringify(event));
    }
}
