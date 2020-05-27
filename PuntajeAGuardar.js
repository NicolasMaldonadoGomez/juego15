class PuntajeAGuardar {
  constructor(nivel)
            {
              localStorage.removeItem("maximoNivelDeEsteJUEGO15")
              localStorage.removeItem("mejorTiempoDeEsteJUEGO15")

              this.maximoPuntajeArchivo = "maximoNivelDeEsteJUEGO15-" + nivel
              this.mejorTiempoArchivo   = "mejorTiempoDeEsteJUEGO15-" + nivel

              if ((this.noSoportaStorage() ||
                   localStorage.getItem(this.maximoPuntajeArchivo) == null||
                   localStorage.getItem(this.mejorTiempoArchivo)   == null))
                    {
                      this.maximoPuntaje = 0
                      this.mejorTiempo   = 0
                    }
                    else
                      {
                        this.maximoPuntaje = (localStorage.getItem(this.maximoPuntajeArchivo))
                        this.mejorTiempo   = (localStorage.getItem(this.mejorTiempoArchivo  ))
                      }
            }
  noSoportaStorage()
            {
              try
                {
                  const llavedePrueba = "prueba_con_una_llave_aleatoria_que_no_se_vaya_a_usar_nunca_2"
                  localStorage.setItem(llavedePrueba,llavedePrueba)
                  localStorage.removeItem(llavedePrueba)
                  return false;
                }
              catch (error)
                {
                  return true
                }
            }
  comparayGuardaPuntaje(puntaje)
            {
              if (puntaje<this.maximoPuntaje||this.maximoPuntaje==0)
                {
                  this.maximoPuntaje = puntaje
                  if (!this.noSoportaStorage())
                      localStorage.setItem(this.maximoPuntajeArchivo, this.maximoPuntaje)
                  return true
                }
              else return false
            }
  comparayGuardaTiempo(tiempoJuego)
            {
              if (tiempoJuego<this.mejorTiempo||this.mejorTiempo==0)
                {
                  this.mejorTiempo = tiempoJuego
                  if (!this.noSoportaStorage())
                      localStorage.setItem(this.mejorTiempoArchivo, this.mejorTiempo)
                  return true
                }
              else return false
            }
}

/*
if ((Puntaje>=this.maximoPuntaje)
  {
    this.maximoPuntaje = this.nivel-1
    storageAuxiliar = this.maximoPuntaje
    if (!(this.noSoportaStorage())) localStorage.setItem("maximoNivelLlegadoDeSimonDice", this.maximoPuntaje)
    avisaConMenu( '¡¡Ganaste y superaste el máximo nivel. Muy bien!!',
                  'Llegaste hasta ' + (this.nivel - 1),
                  'imagenes/gokuDios.png' )
  }
else  avisaConMenu( "¡¡Ganaste!!",
                    "Llegaste hasta " + (this.nivel-1) + ". Muy bien hecho,¡¡felicitaciones!! Aunque todavia te falta para alcanzar al mejor que ha sido de " + this.maximoPuntaje,
                    "imagenes/gokuSS3.png")
this.eliminaEventosClic()
}*/
