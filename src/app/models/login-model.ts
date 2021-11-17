export class LoginModel{

    private nombreUsuario:string;
    private password:string;

    constructor(nombreUsuario:string, password:string){
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }

    getNombreUsuario(){
        return this.nombreUsuario;
    }
    getPassword(){
        return this.password;
    }


}