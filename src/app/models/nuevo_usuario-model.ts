export class Nuevo_usuario{
    

    private nombreUsuario:string;
    private password: string;
    private nombreCompleto:string;
    private ciudad:string;
    private pais:string;
    public roles:string[];

    constructor(nombreUsuario:string, password:string,
        nombreCompleto:string, ciudad:string,
        pais:string, roles:string[]){
            this.nombreUsuario = nombreUsuario;
            this.password = password;
            this.nombreCompleto = nombreCompleto;
            this.ciudad = ciudad;
            this.pais = pais;
            this.roles = roles; 
        }

    getNombreUsuario(){
        return this.nombreUsuario;
    }
    
    getPassword(){
        return this.password;
    }

    getNombreCompleto(){
        return this.nombreCompleto;
    }
    getCiudad(){
        return this.ciudad;
    }
    getPais(){
        return this.pais;
    }
    getRoles(){
        return this.roles;
    }
    setRoles(roles: string[]) {
        this.roles = roles;
      }

}