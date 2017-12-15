const botgram = require("botgram")
const bot = botgram("373431078:AAHxomGOXe6dLJW5WcFtQD-SrEQFwhB67zI")
const fetch = require("node-fetch");

bot.command("Start", (msg, reply) => {
    reply.text("Bienvenido a Avisa Chaucha :) usa el comando /AvisaChaucha Valor Mayor/Menor")
})

bot.command("AvisaChaucha", (msg, reply) => {

    var datos = msg.args(1)[0].toString().split(" ");

    var Estado = datos[0];
    var Valor = parseInt(datos[1]);
    var ValorCriptoMoneda;

    console.log(`El valor ingresado es: ${Valor}`);
    console.log(`El estado ingresado es: ${Estado}`);

    setInterval(function () {

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

    

    
    }, 2000);

})


bot.command((msg, reply) => {
    reply.text("Invalid command.")
})