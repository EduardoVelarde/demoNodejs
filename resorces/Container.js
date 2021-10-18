const fs = require("fs");

const writeFileAsync = async (arr) => {
    try{
    await fs.promises.writeFile(
        "/Users/eduardolopezvelarde/Documents/GitHub/demoNodejs/resorces/productos.txt",
        JSON.stringify(arr, null, 2),
        "utf-8"
    );}catch(err){
        console.log(err)
    }
};

const readFileAsync = async (arr) => {
    try{
    let file = await fs.promises.readFile('/Users/eduardolopezvelarde/Documents/GitHub/demoNodejs/resorces/productos.txt', "utf-8");
    return file;
}catch(err){
        console.log(err)
    }
};
const verifyExistence= file=> file&&file.length>=0? true:false
module.exports = class Contenedor {
    constructor() {
        this.pr = [];
    }

    async save(product) {
        let fileExits = await readFileAsync(); //String
        //fileExits && fileExits.length >= 0
        if (verifyExistence(fileExits)) {
            let dataFile = JSON.parse(fileExits);
            product.id = dataFile.length + 1;
            dataFile.push(product);
            this.pr = dataFile;
            writeFileAsync(this.pr);
            return console.log(product.id)
        } 
            product.id = 1;
            this.pr.push(product);
            writeFileAsync(this.pr);
            console.log(product.id)
        
    }
    async getById(id) {
        let fileExits = await readFileAsync(); // tipo de dato string
        if (fileExits && fileExits.length >= 0) {
            let dataFile = JSON.parse(fileExits);
            for (let d of dataFile) {
                if (d.id === id) {
                    return d
                }
            }
        }
        return null

    }
    async getAll() {
        let fileExits = await readFileAsync(); // tipo de dato string
        
        if (fileExits && fileExits.length >= 0) {
            let dataFile = JSON.parse(fileExits);
            return dataFile
        }
        throw " get-All No se encontro archivo" 
    }

    async deleteByID(id) {
        let fileExits = await readFileAsync(); // tipo de dato string
        if (verifyExistence(fileExits)) {
            let dataFile = JSON.parse(fileExits); // objecto
            let idExist=dataFile.filter(d => d.id == id) // Devuelve un Array/ si no existe devuelve un array vacio
            let newElements= dataFile.filter(d => d.id !== id)
            if (idExist.length>0) {
                writeFileAsync(newElements)
                return console.log(`This the new list of product´s
                ${JSON.stringify(newElements,null,2)}`)
            }
            throw `theres no such id in the repo, but you can see all the products below:
            ${JSON.stringify(dataFile,null,2)}`
        }
        throw "delete-by-id No se encontro archivo"
    }

    async deleteAll() {
        let fileExits = await readFileAsync(); // tipo de dato string
        if (fileExits && fileExits.length >= 0) {
            let dataFile = JSON.parse(fileExits);
            this.pr=[]
            writeFileAsync(this.pr)
            return console.log(`The Elements has been deleted`)
        }
        throw "No se encontro archivo"
    }
}
