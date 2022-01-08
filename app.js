
const http = require('http')
const axios = require('axios')
const chalk = require('chalk')
const {v4: uuidv4} = require('uuid')
const _ = require('lodash')
let citas = []
const moment = require('moment')

http.createServer( async (req, res) => {
    console.log(req.url);
    if(req.url.includes("/citas")){
        res.writeHead(200, {'Content-Type': 'text/html'})
        const {data} = await axios.get('https://randomuser.me/api')
        const fechaRegistro = moment().format('MMM Do YYYY, h:mm:ss a');
        const id = uuidv4().slice(30)

        citas.push({
            nombre: data.data.results[0].name.first,
            apellido: data.data.results[0].name.last,
            id,
            time: fechaRegistro
        })
        res.write('<ol>')

        citas.forEach((cita) => {
            res.write(`<li>Nombre: ${cita.nombre} - Apellido: ${cita.apellido} - ID: ${cita.id} - Timestamp: ${cita.time}`)
        })

        res.end()

        })
        
}).listen(5000, () => {
    console.log('Servidor arriba');
})



   //Consulta datos API con axios:
    //const axios = require('axios').default;
/*
    axios.get('https://randomuser.me/api')
    .then((data) => {
        const nombre = data.data.results[0].name.first;
        const apellido = data.data.results[0].name.last; 
        //console.log(data.data.results[0].name.first);
        console.log(`Nombre: ${nombre} - Apellido: ${apellido}`);
    })
*/
