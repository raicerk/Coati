const botgram = require("botgram")
const bot = botgram("InserteTokenTelegramAqui")
const fetch = require("node-fetch");
const patron = /^\d*$/;
var estadoAnalisis = true;

bot.command("Start", (msg, reply) => {
  try {
    reply.text(
`Bienvenido a Coati un bot que te avisa cuando el valor de la Chaucha sube o baja de x monto con sistema de revision por segundos por ejemplo:
    
/Mayor <valor> <segundos> Ejemplo:
  /Mayor 500 30

/Menor <valor> <segundos> Ejemplo:
  /Menor 500 40

/Avisa <valor1> <valor2> <segundos> Ejemplo:
  /Avisa 400 500 20

/Precio <segundos>
  /Precio 60

Para todas las opciones si no colocas los segundos se asumira 30 segundos por defecto

Si quieres detener el bot para que no lleguen mas notificaciones solo escribe 
  /Parar 
`
    )
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

    if (datos.length > 1) {

      if (patron.test((datos[0]) && patron.test(datos[1])) && parseInt(datos[0]) < parseInt(datos[1])) {

        var ValorCriptoMoneda = 0;
        var Valor1 = parseInt(datos[0]);
        var Valor2 = parseInt(datos[1]);
        var TiempoSegundos = patron.test(datos[2]) ? isNaN(parseInt(datos[2])) ? 30 : parseInt(datos[2]) : 30;

        console.log(`El valor 1 ingresado es: $${Valor1}`);
        console.log(`El valor 2 ingresado es: $${Valor2}`);
        console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

        setInterval(function () {

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

        reply.text(`Te avisare cuando la chaucha este entre $${Valor1} y $${Valor2}, revisare cada ${TiempoSegundos} segundos`)
      } else {
        reply.text(`Debes ingresar los parametros correctos, intenta nuevamente por favor`)
      }
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

    if (datos != "") {

      if (patron.test(datos[0])) {

        var Valor = parseInt(datos[0]);
        var TiempoSegundos = patron.test(datos[1]) ? isNaN(parseInt(datos[1])) ? 30 : parseInt(datos[1]) : 30;
        var ValorCriptoMoneda = 0;

        console.log(`El valor ingresado es: $${Valor}`);
        console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

        setInterval(function () {

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
        reply.text(`Te avisare cuando el valor de la chaucha sea mayor a $${Valor}, revisare cada ${TiempoSegundos} segundos`);
      } else {
        reply.text(`Debes ingresar los parametros correctos, intenta nuevamente por favor`)
      }
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

    if (datos != "") {

      if (patron.test(datos[0])) {

        var Valor = parseInt(datos[0]);
        var TiempoSegundos = patron.test(datos[1]) ? isNaN(parseInt(datos[1])) ? 30 : parseInt(datos[1]) : 30;
        var ValorCriptoMoneda = 0;

        console.log(`El valor ingresado es: $${Valor}`);
        console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

        setInterval(function () {

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
        reply.text(`Te avisare cuando el valor de la chaucha sea menor a $${Valor}, revisare cada ${TiempoSegundos} segundos`);
      } else {
        reply.text(`Debes ingresar los parametros correctos, intenta nuevamente por favor`)
      }
    } else {
      reply.text(`Debes ingresar los parametros al comando /menor <valor> <segundos>.  Ejemplo: /menor 500 30`)
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

bot.command("Precio", (msg, reply) => {
  try {

    if (msg) {
      estadoAnalisis = true;
    }

    var datos = msg.args(1)[0].toString();

    var TiempoSegundos = patron.test(datos) ? parseInt(datos): 0 ;
    var ValorCriptoMoneda = 0;

    console.log(`El tiempo de actualizacion ingresado es: ${TiempoSegundos} segundos`);

    if (TiempoSegundos != 0) {
      setInterval(function () {

        if (estadoAnalisis) {

          const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";

          fetch(url).then(response => {
            response.json().then(json => {
              ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);
              reply.text(`El precio de la chaucha es de $${ValorCriptoMoneda}`)
            });
          })
            .catch(error => {
              console.log(error);
            });
        }
      }, (TiempoSegundos * 1000));
    } else {

      if (estadoAnalisis) {

        const url = "https://api.orionx.io/graphql?query={marketOrderBook(marketCode:%22CHACLP%22){mid}}";

        fetch(url).then(response => {
          response.json().then(json => {
            ValorCriptoMoneda = parseInt(json.data.marketOrderBook.mid);
            reply.text(`El precio de la chaucha es de $${ValorCriptoMoneda}`)
          });
        })
          .catch(error => {
            console.log(error);
          });
      }
    }

  } catch (Exception) {
    console.log(Exception.message)
  }
})

bot.command((msg, reply) => {
  reply.text("Comando invalido, ingresa solo los que estan en la lista :)")
})