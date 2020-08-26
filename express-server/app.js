var express = require("express"), cors = require('cors');
//Iniciamos el servidor web
var app = express();

//Usaremos JSON
app.use(express.json());
app.use(cors());
app.listen(3000, () => console.log("Server running on port 3000"));

//RUTAS
var cities = ["Paris","Barcelona","Madrid","Barranquilla","Bogota","Santiago de chile","Mexico DF","Nueva York"];
app.get("/cities", (req, res, next) => res.json(cities.filter((c) => c.toLowerCase()
    //q del query javascript "cities?q=, si cambiamos la q, aquí debe cambiar."
    .indexOf(req.query.q.toString().toLowerCase()) > -1)));

var myDestinations = [];
app.get("/my", (req, res, next) => res.json(myDestinations));
app.post("/my", (req, res, next) => {
    console.log(req.body);

    //new lo tenemos en DestinoApiClient
    myDestinations.push(req.body.new);
    res.json(myDestinations);
});

app.get("/api/translation",(req, res, next) => res.json([
    {lang: req.query.lang, key: 'TRADUCIR', value: 'TRADUCIR ' + req.query.lang}
]));
