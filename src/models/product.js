export class Product{
    constructor(id,name,description,price,image,stock,id_category_fk){
        this.id=id;
        this.name=name;
        this.description=description;
        this.price=price;
        this.image=image;
        this.stock=stock;
        this.id_category_fk=id_category_fk;
    }
}