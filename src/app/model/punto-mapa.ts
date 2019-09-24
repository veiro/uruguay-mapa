export class PuntoMapa {
    constructor(
        latitud: string,
        longitud: string,
        tipoPunto: string,
        nroObra: string,
        denominacion: string,
        aportacion: string,
        empresa: string,
        contribuyente: string,
        local: string,
        identificador: string) {

        this.latitud = latitud;
        this.longitud = longitud;
        this.tipoPunto = tipoPunto;
        this.nroObra = nroObra;
        this.denominacion = denominacion;
        this.aportacion = aportacion;
        this.empresa = empresa;
        this.contribuyente = contribuyente;
        this.local = local;
        this.identificador = identificador;
    }




    public latitud: string;
    public longitud: string;

    public tipoPunto: string; //construccion, industria, sin-registro

    // para obra
    public nroObra: string;

    //para industria
    public denominacion: string;
    public aportacion: string;
    public empresa: string;
    public contribuyente: string;
    public local: string;

    //sin-registro
    public identificador: string;

}