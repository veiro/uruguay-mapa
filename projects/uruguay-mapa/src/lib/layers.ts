import { OSM, Vector } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import TileLayer from 'ol/layer/Tile';
import TileWms from 'ol/source/TileWMS';
import XYZ from 'ol/source/XYZ';

const layerDeviceLocation = new VectorLayer({
    source: new Vector({
        features: []
    })
});

const LayerIDEUY = new TileLayer({
    source: new TileWms({
        url: 'https://mapas.ide.uy/geoserver-raster/ortofotos/ows',
        params: {
            layers: 'ortofotos:ORTOFOTOS_2019',
            format: 'image/png'
        }
    })
});

const LayerMapaElCorreo = new TileLayer({
    source: new TileWms({
        url: 'http://geo.correo.com.uy/geoserver/wms',
        params: {
            // tslint:disable-next-line:max-line-length
            layers: 'visualizador:paises_puntos,visualizador:paises_sudamerica,visualizador:mb2_paises_sudamerica,visualizador:mb2_oceanos_sudamerica,visualizador:provincias_sudamerica,visualizador:mb2_uy_departamentos,visualizador:mb2_uy_localidades_ine,visualizador:rios_sudamerica,visualizador:mb2_waterways,visualizador:mb2_hidro_sin_rp,visualizador:mb2_hidro_ln,visualizador:mb2_lim_adm,visualizador:mojones_uy,visualizador:mb2_landuse,visualizador:mb2_natural,visualizador:mb2_buildings,visualizador:mb2_roads,visualizador:mb2_railways,visualizador:mb2_places',
            format: 'image/png',
            SRS: 'EPSG:900913'
        }
    })
});

const LayerMapaGoogleMaps = new TileLayer({
    source: new XYZ({
        url: 'http://maps.googleapis.com/maps/vt/lyrs=r&x={x}&y={y}&z={z}'
    })
});

const LayerOSM = new TileLayer({
    source:  new OSM()
});

const LayerPadrones = new TileLayer({
    source: new TileWms({
        url: 'http://geoservicios.mtop.gub.uy/geoserver/planos_uy/wms',
        params: {
            layers: 'parcelario_urbano,parcelario_rural',
            format: 'image/png'
        }
    }),
    opacity: 0.5
});

const LayerRoutes = new TileLayer({
    source: new TileWms({
        url: 'https://geoservicios.mtop.gub.uy/geoserver/inf_tte_ttelog_terrestre/v_camineria_nacional/wms',
        params: {
            layers: 'v_camineria_nacional',
            format: 'image/png'
        }
    })
});

export {
    layerDeviceLocation,
    LayerMapaElCorreo,
    LayerMapaGoogleMaps,
    LayerOSM,
    LayerPadrones,
    LayerIDEUY,
    LayerRoutes
};
