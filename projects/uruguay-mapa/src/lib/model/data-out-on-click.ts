import { Coords } from "./coords";
import { Padron } from "./padron";

export class DataOutOnClick {
    constructor() {
           
        this.clusterFeatureSelected = [];
    }
    coordinates: Coords;
    padron : Padron;
    featureSelected: any;
    clusterFeatureSelected: any[];

}