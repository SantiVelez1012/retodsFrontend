export class JwtModel{

    private token:string | null;

    constructor(token:string | null){
        this.token = token;
    }

    getToken(){
        return this.token;
    }

}