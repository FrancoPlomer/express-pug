const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set('views','./views');
app.use(express.urlencoded({
    extended: true
    }))
app.use('/static', express.static('public'));


const PORT = 8080 || process.env.PORT;

let idSumador = 0;
class contenedorProductos {
    constructor(
        productos,
        id,
    ){
        this.productos = productos;
        this.id = id;
    }
    getAll()
    {
        
        app.get('/productos',  ( req,res )=>{
            if (this.productos)
            {
                res.render('datos.pug',{productos: this.productos})
            }
            else{
                res.send({error: "producto no encontrado"});
            }
        } )
    }

    addProduct()
    {
        app.post('/productos', async ( req,res )=>{
            const producto = req.body.producto;
            const precio = req.body.precio;
            const url = req.body.url;
            idSumador += 1;
            await this.productos.push({
                title: producto,
                price: precio,
                ID: idSumador,
                url: url,
            })
            res.render('datos.pug',{productos: this.productos})
        })
    }

}

const contenedor = new contenedorProductos(
    [{
        title: "coca",
        price: "$220",
        ID: 0,
        url: "https://media.istockphoto.com/photos/bottle-of-sweet-carbonated-drink-with-cover-isolated-on-white-picture-id1225027110?s=612x612"
    }],
    1
)

contenedor.getAll();
contenedor.addProduct();

app.listen(PORT)
