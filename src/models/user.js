export class User{
    constructor(id,username,email,password,state,image,id_rol_fk){
        this.id=id;
        this.username=username;
        this.email=email;
        this.password=password;
        this.state = state;
        this.image = image;
        this.id_rol_fk = id_rol_fk;
    }
}