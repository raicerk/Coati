const botgram = require("botgram")
const bot = botgram("InserteTokenAqui")
const fetch = require("node-fetch");
var estadoAnalisis = true;

bot.command("Start", (msg, reply) => {
  try {
    reply.text("Bienvenido a Coati un bot que te avisa cuando el valor de la Chaucha sube o baja de x monto con sistema de revision por segundos por ejemplo: ")
    reply.text("/Mayor 500 30")
    reply.text("/Menor 500 40")
    reply.text("/Avisa 400 500 20")
    reply.text("Si quieres detener el bot para que no lleguen mas notificaciones solo escribe /Parar ")
  } catch (Exception) {
    console.log(Exception.message);
  }
})

bot.command("Avisa", (msg, reply) => {

  try {

    if (msg) {
      estadoAnalisis = true;
    }

    var datos = msg.args(1)[0].toString().split(" ");

    if (datos.lengh < 1) {

      var Valor1 = parseInt(datos[0]);
      var Valor2 = parseInt(datos[1]);
      var TiempoSegundos = isNaN(parseInt(datos[2])) ? 30 : parseInt(datos[2]);
      var ValorCriptoMoneda = 0;

      console.log(`El valor 1 ingresado es: $${Valor1}`);
      console.log(`El valor 2 ingresado es: $${Valor2}`);
      console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

      setInterval(function() {

        if (estadoAnalisis) {

          const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";

          fetch(url)
            .then(response => {

              response.json().then(json => {

                ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);

                if (ValorCriptoMoneda > Valor1 && ValorCriptoMoneda < Valor2) {
                  reply.text(`La chaucha esta a $${ValorCriptoMoneda}`)
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, (TiempoSegundos * 1000));

      reply.text(`Te avisare cuando la chaucha este entre $${Valor1} y $${Valor2}`)

    } else {
      reply.text(`Debes ingresar los parametros al comando /avisa <valor1> <valor2> <segundos>.  Ejemplo: /avisa 400 500 10`)
    }
  } catch (Exception) {
    console.log(Exception.message)
  }
})

bot.command("Mayor", (msg, reply) => {

  try {

    if (msg) {
      estadoAnalisis = true;
    }

    var datos = msg.args(1)[0].toString().split(" ");

    if (datos.lenght < 1) {

      var Valor = parseInt(datos[0]);
      var TiempoSegundos = isNaN(parseInt(datos[1])) ? 30 : parseInt(datos[1]);
      var ValorCriptoMoneda = 0;

      console.log(`El valor ingresado es: $${Valor}`);
      console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

      setInterval(function() {

        if (estadoAnalisis) {

          const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";

          fetch(url).then(response => {
              response.json().then(json => {
                ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);
                if (ValorCriptoMoneda > Valor) {
                  reply.text(`Vende Chauchas, su valor actual es de $${ValorCriptoMoneda}`)
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, (TiempoSegundos * 1000));
      reply.text(`Te avisare cuando el valor de la chaucha sea mayor a $${Valor}`);
    } else {
      reply.text(`Debes ingresar los parametros al comando /mayor <valor> <segundos>.  Ejemplo: /mayor 500 30`)
    }
  } catch (Exception) {
    console.log(Exception.message)
  }
})

bot.command("Menor", (msg, reply) => {

  try {

    if (msg) {
      estadoAnalisis = true;
    }

    var datos = msg.args(1)[0].toString().split(" ");

    if (datos.lenght < 1) {

      var Valor = parseInt(datos[0]);
      var TiempoSegundos = isNaN(parseInt(datos[1])) ? 30 : parseInt(datos[1]);
      var ValorCriptoMoneda = 0;

      console.log(`El valor ingresado es: $${Valor}`);
      console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

      setInterval(function() {

        if (estadoAnalisis) {

          const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";

          fetch(url).then(response => {
              response.json().then(json => {
                ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);
                if (ValorCriptoMoneda < Valor) {
                  reply.text(`Compra Chauchas, su valor actual es de $${ValorCriptoMoneda}`)
                }
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, (TiempoSegundos * 1000));
      reply.text(`Te avisare cuando el valor de la chaucha sea menor a $${Valor}`);
    } else {
      reply.text(`Debes ingresar los parametros al comando /menor <valor> <segundos>.  Ejemplo: /menor 500 20`)
    }
  } catch (Exception) {
    console.log(Exception.message)
  }

})

bot.command("Parar", (msg, reply) => {

  try {
    estadoAnalisis = false;
    reply.text("Se ha detenido en analisis de las Chauchas")
  } catch (Exception) {
    console.log(Exception.message);
  }

})

bot.command((msg, reply) => {
  reply.text("Invalid command.")
})
