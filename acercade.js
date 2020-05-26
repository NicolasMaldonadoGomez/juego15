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
                            botonCancela: {
                                            text : "OK",
                                            value: "cancela",
                                          },
                            botonAcerca:  {
                                            text : "Acerca",
                                            value: "acerca",
                                          },
                          /*  botonConfig:  {
                                            text : "Configura",
                                            value: "config",
                                          },*/
                            botonJuega :  {
                                            text : "A jugar otra vez...",
                                            value: "empieza",
                                          },
                          }
              }).then ((value)=> {switch (value) {
                                                  case "empieza": tablerodeJuego.empiezaJuego()
                                                                  break
                                                  case "acerca" : acercaDe()
                                                                  break
                                                  case "config" : //configurar()
                                                                  break
                                                  case "cancela":
                                                                  break
                                                 }
                                })
    }
function ayuda()
  {
    //clearTimeout(cronoAyuda);
    avisaConMenu("¿Ayuda?", "Para empezar presiona el botón de encendido en toda la mitad, aunque primero deberías configurar el tipo de juego y el sonido con el boton [Configura] abajo. \nAtajos: J y ENTER para jugar, C para configurar, Q es acerca de y A es esta ayuda.\nEl objetivo del juego es repetir una secuencia de colores cada vez mas larga, primero el computador, luego tú. ¡¡Trata de hacer la mayor cantidad de turnos sin equivocarte!!","imagenes/KarinDB.png")
  }
function acercaDe(){
  avisaConMenu("Juego 15, pero tambien 3, 8, 24, 35...", "Código por Nicolás Maldonado Gómez.\nemail: nico.m@gmx.es\nCronos Ingenieria\nweb: https://techzigurat.000webhostapp.com/.","imagenes/logoBlanco44.png")
}
