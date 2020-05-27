/*avisaConMenu( '¡¡Ganaste y superaste el máximo nivel. Muy bien!!',
              'Llegaste hasta ' + (this.nivel - 1),
              'imagenes/gokuDios.png' )
}
else  avisaConMenu( "¡¡Ganaste!!",
                    "Llegaste hasta " + (this.nivel-1) + ". Muy bien hecho,¡¡felicitaciones!! Aunque todavia te falta para alcanzar al mejor que ha sido de " + this.maximoPuntaje,
                    "imagenes/gokuSS3.png")*/

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
                                                  case "acerca" : acercaDe()
                                                                  break
                                                  case "ayuda" :  ayuda()
                                                                  break
                                                  case "mejores": mejores()
                                                                  break
                                                 }
                                })
    }
function ayuda()
  {
    //clearTimeout(cronoAyuda);
    avisaConMenu("¿Ayuda?", "Puedes usar las flechas o el mouse para mover las fichas.\nEl boton pequeño desliza para escoger el nivel. y el boton grande baraja (tambien la letra B).\nLa tecla A para llamar esta ayuda.\nEl tiempo comienza una vez se barajen las fichas, el objetivo es hacerlo en la menor cantidad de movimientos y en el menor tiempo.","imagenes/gokuPequeno.jpg")
  }
function acercaDe(){
  avisaConMenu('Juego 15, pero tambien 3, 8, 24, 35...', 'Código por Nicolás Maldonado Gómez.\nnico.m@gmx.es\nCronos Ingenieria\nhttps://techzigurat.000webhostapp.com/.','imagenes/logoBlanco44.png')
}
function mejores() {
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
