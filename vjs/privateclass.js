class ClassPrivateField {
    #privateField
}

class ClassPrivateMethod {
    #privateMethod(){
        return 'hi'
    }
}

class ClasswithStaticPrivateField {
    static #private_static_field
}


class User {
    constructor(name,password,email) {
        let claveAcceso = "dsds";
        this.name =name;
        this.password = password;
        this.email = email;

    }
       
}