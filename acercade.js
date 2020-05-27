function avisaConMenu(titulo,texto,icono)
  {
      swal(
            {
            title    : titulo,
            text     : texto,
            icon     : icono,
            buttons  :  {
                          botonMejores: {
                                          text : "Mejores",
                                          value: "mejores",
                                        },
                          botonAcerca:  {
                                          text : "Acerca de",
                                          value: "acerca",
                                        },
                          botonAyuda:  {
                                          text : "Ayuda",
                                          value: "ayuda",
                                        },
                          botonJuega :  {
                                          text : "Juega",
                                          value: "empieza",
                                        },
                        }
            }).then ((value)=> {switch (value) {
                                                case "empieza": tablerodeJuego.empiezaJuego()
                                                                break
                                                case "acerca" : muestraAcercaDe()
                                                                break
                                                case "ayuda" :  ayuda()
                                                                break
                                                case "mejores": muestraMejores()
                                                                break
                                               }
                              })
  }
function ayuda()
  {
    //clearTimeout(cronoAyuda);
    avisaConMenu("¿Ayuda?", "Puedes usar las flechas o el mouse para mover las fichas.\nEl boton pequeño desliza para escoger el nivel. y el boton grande baraja (tambien la letra B).\nLa tecla A para llamar esta ayuda.\nEl tiempo comienza una vez se barajen las fichas, el objetivo es hacerlo en la menor cantidad de movimientos y en el menor tiempo.","imagenes/gokuPequeno.jpg")
  }
function muestraAcercaDe(){
  avisaConMenu('Juego del 15, pero también del 3, 8, 24, 35, 48... ¡hasta el 899!', 'Código por Nicolás Maldonado Gómez.\nnico.m@gmx.es\nCronos Ingenieria\nhttps://techzigurat.000webhostapp.com/.','imagenes/logoBlanco44.png')
}
function muestraMejores() {
  let texto=""
  for(let i=0;i<29;i++)
  {
    mejores=new PuntajeAGuardar(i)
    if (mejores.noSoportaStorage())
      {
        texto = "Lo siento, este navegador no soporta almacenamiento local, por lo que no quedarán grabados los mejores tiempos, y se perderán para siempre."
        break
      }
    else
      {
        texto += (mejores.maximoPuntaje==0)?'':("Nivel " + (i+2) +" Jugadas: " + mejores.maximoPuntaje + ". Tiempo: " + milisegundosaHoras(mejores.mejorTiempo)+"\n")
      }
  }
  avisaConMenu("Salon de la fama",texto,'imagenes/esfera4estrella.png')
}
