const botgram = require("botgram")
const bot = botgram("Token")
const fetch = require("node-fetch");
var estadoAnalisis = true;

bot.command("Start", (msg, reply) => {
    reply.text("Bienvenido a Avisa Chaucha :) usa el comando /AvisaChaucha (Mayor/Menor) Valor cada X (Segundos) como por ejemplo: ")
    reply.text("/AvisaChaucha Mayor 500 cada 5 segundos")
    reply.text("Si quieres detener el bot para que no lleguen mas notificaciones solo escribe /stop como por ejemplo: ")
    reply.text("/stop")
})

bot.command("AvisaChaucha", (msg, reply) => {

    if(msg){
        estadoAnalisis = true;
    }

    var datos = msg.args(1)[0].toString().split(" ");

    var Estado = datos[0];
    var Valor = parseInt(datos[1]);
    var TiempoSegundos = parseInt(datos[3]);
    var ValorCriptoMoneda = 0;

    console.log(`El valor ingresado es: ${Valor}`);
    console.log(`El estado ingresado es: ${Estado}`);
    console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos}`);

    setInterval(function () {

        if (estadoAnalisis) {

            const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";
            fetch(url)
                .then(response => {

                    response.json().then(json => {
                        ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);
                        console.log(`El valor de la criptomoneda actualmente es ${ValorCriptoMoneda}`);
                        switch (Estado) {
                            case "Mayor":
                                if (ValorCriptoMoneda > Valor) {
                                    reply.text(`Vende Chauchas, su valor actual es de ${ValorCriptoMoneda}`)
                                }
                                break;

                            case "Menor":
                                if (ValorCriptoMoneda < Valor) {
                                    reply.text(`Compra Chauchas, su valor actual es de ${ValorCriptoMoneda}`)
                                }
                                break;

                            default:
                                break;
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, (TiempoSegundos * 1000));

})

bot.command("Stop", (msg, reply) => {
    estadoAnalisis = false;
    reply.text("Se ha detenido en analisis de las Chauchas")

})

bot.command((msg, reply) => {
    reply.text("Invalid command.")
})