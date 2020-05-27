var lienzo1  = document.getElementById("canvas")
var contexto = lienzo1.getContext("2d")
var ladoLienzoPixeles, ladoFicha, empezo=false
var modoVertical=1, modoHorizontal=1
var ficha = []
var  MILISEGUNDOS_REFRESCO = 20, CUADROS_PARA_MOVER = 3

class PaneldeControl
  {
    constructor()
              {
                this.muestraNivel()
                /*this.muestraEscudo()
                this.cargaEscudo=this.cargaEscudo.bind(this)
                this.actualizaPanel=this.actualizaPanel.bind(this)
                //this.muestraCrono=this.muestraCrono.bind(this)*/
              }
    muestraPuntaje()
              {
                contexto.strokeStyle = "GhostWhite"
                //tablerodeJuego.contexto.strokeStyle = "solid"
                contexto.lineWidth = 1
                contexto.strokeRect(0, 0, ladoLienzoPixeles,ladoLienzoPixeles);
                contexto.strokeStyle = "white"

                //tablerodeJuego.contexto.strokeRect(ladoLienzoPixeles,0,0.2*ladoLienzoPixeles,ladoLienzoPixeles);

                contexto.fillStyle = "black";
                contexto.fillRect(ladoLienzoPixeles,0,1.2*ladoLienzoPixeles,ladoLienzoPixeles );
                contexto.font = ladoLienzoPixeles*.03 + "px Helvetica, sans-serif"
                contexto.textBaseline = "middle"
                contexto.fillStyle = "GhostWhite"
                contexto.textAlign = "center"
                //contexto.fillText("Movimientos", 1.1*ladoLienzoPixeles,0.01*ladoLienzoPixeles )

                //dialdeFichas = new Dial(1.15*ladoLienzoPixeles,0.5*ladoLienzoPixeles,0.20*ladoLienzoPixeles,1.15*ladoLienzoPixeles,0.8*ladoLienzoPixeles,"red",tablerodeJuego.lienzo1,200)

                contexto.strokeStyle = "black"// DEBE QUEDAR AL FINAL
                contexto.lineWidth = 1
              }
    muestraCrono()
              {
                let   xx3 = 1.10 * ladoLienzoPixeles,     yy3 = 0.08  * ladoLienzoPixeles
                let radio = 0.07 * ladoLienzoPixeles
                contexto.translate(xx3,yy3)
                dibujaReloj(radio,contexto,empezo)
                contexto.translate(-xx3,-yy3)

              }
    muestraNivel()
              {
                let   xx1 = 1.03 * ladoLienzoPixeles,     yy1 = 0.75 * ladoLienzoPixeles
                let   xx2 = 1.17 * ladoLienzoPixeles,     yy2 = 0.5  * ladoLienzoPixeles
                let radio = 0.03 * ladoLienzoPixeles, espesor = 0.02 * ladoLienzoPixeles
                this.niveldeBola = new Dial(xx1, yy1, espesor,xx2, yy2, "GhostWhite", lienzo1,radio)
                this.niveldeBola.prendeGraduacion(2,31,xx1,yy2,20,"GhostWhite")

              }
  /*  muestraEscudo()
              {
                this.escudo                = { url : "escudoMaldonado.png", }
                this.escudo.imagen         = new Image()
                this.escudo.imagen.src     = this.escudo.url
                this.escudo.imagen.cargaOK = false
                this.escudo.imagen.addEventListener ("load", this.cargaEscudo)
              }
    cargaEscudo ()
              {
                this.cargaOK = true
              }
    pintaEscudo()
                  {
                    if (this.escudo.imagen.cargaOK) {
                      contexto.drawImage(this.escudo.imagen, 1.02*ladoLienzoPixeles,0.8*ladoLienzoPixeles-1, 0.157*ladoLienzoPixeles,0.2*ladoLienzoPixeles)
                    }
                }*/
    actualizaPanel()
              {
                if(!empezo) this.muestraPuntaje()
                if(!empezo) this.muestraBotonBaraja()
                if(!empezo) this.niveldeBola.actualizaDial(lienzo1)
                //this.pintaEscudo()
                this.muestraCrono()
                if(empezo) this.muestraJugadas()
              }
    muestraJugadas()
              {
                contexto.font = ladoLienzoPixeles*.08 + "px Helvetica, sans-serif"
                contexto.textBaseline = "middle"
                contexto.fillStyle = "GhostWhite"
                contexto.textAlign = "center"
                contexto.fillText(tablerodeJuego.jugadas, 1.1*ladoLienzoPixeles,0.4*ladoLienzoPixeles )
              }
    muestraBotonBaraja()
              {
                let   xx3 = 1.10 * ladoLienzoPixeles,     yy3 = 0.88  * ladoLienzoPixeles
                let radio = 0.07 * ladoLienzoPixeles
                dibujaBola("GhostWhite",xx3,yy3,radio,1,contexto)
              }
  }

class Juego15
{
  constructor()
            {

              this.apagaRefrescoJuego = this.apagaRefrescoJuego.bind(this)
              this.actualizaCanvas    = this.actualizaCanvas.bind(this)
              this.ganaJuego15        = this.ganaJuego15.bind(this)
              this.queque             = this.queque.bind(this)
              //this.ganaJuego15=this.ganaJuego15.bind(this)
              //this.empiezaJuego()
              this.lado         = 4
              //this.cuadros = this.lado**2
              //this.tamanoFuente=0.75

            }
  empiezaJuego()
            {
              this.ultimaFilaOrdenada=0
              this.ultimaFichaOrdenada=0
              empezo=false
              this.cuadros = this.lado**2
              this.tamanoFuente=0.75
              if (this.lado>10) this.tamanoFuente = 0.5
              this.jugadas = 0
              ficha = []
              let color
              for(let i=0;i<this.lado;i++)
              for(let j=0;j<this.lado;j++)
              {
                let k=this.lado*j+i+1
                if (k%2==0) color = "SeaShell"
                else color = "GhostWhite"
                ficha [k] = new componente(ladoFicha, ladoFicha , color, ladoFicha*i, ladoFicha*j, k, i, j)
              }
              ficha [this.cuadros].color = "black"
              this.empiezaCanvas();
            }
  empiezaCanvas()
    {
      empezo=false
      lienzo1.width = ladoLienzoPixeles*modoHorizontal;
      lienzo1.height = ladoLienzoPixeles*modoVertical;
      if (modoVertical>1) contexto.translate(0,(modoVertical-1)*ladoLienzoPixeles)
      this.interval = setInterval(this.actualizaCanvas, MILISEGUNDOS_REFRESCO)
    }
  limpiaCanvas()
    {
      contexto.clearRect(0, 0, lienzo1.width, lienzo1.height);
    }
  actualizaCanvas()
    {
      this.limpiaCanvas()
      panel.actualizaPanel()
      for (let i=1;i<this.cuadros;i++) ficha[i].actualizaComponente()

      if (this.key)
        switch (this.key)
          {
            case 37: this.lentoIzquierda();      this.key=false;  break  //flecha izquierda
            case 38: this.lentoArriba();         this.key=false;  break  //flecha arriba
            case 39: this.lentoDerecha();        this.key=false;  break  //flecha derecha
            case 40: this.lentoAbajo();          this.key=false;  break  //flecha abajo
            case 65: ayuda();                    this.key=false;  break  //A
            case 66: if (!empezo) this.baraja(); this.key=false;  break  //B
            default:                             this.key=false
          }
      if (this.clic)
        {
          this.mueveporClic()
          this.clic=false
        }
      if(this.lado!=panel.niveldeBola.grado) //Verifica si se movio la bola quu cuadra el nivel
        {
          this.apagaRefrescoJuego()
          this.lado=panel.niveldeBola.grado
          tamanoCanvas()
          this.empiezaJuego()
        }

    }
  baraja()
            {
              this.apagaRefrescoJuego()
              empezo = true
              do{
                for (var i = 0; i < this.cuadros*this.lado*6; i++)
                  {
                    var azar=Math.floor(Math.random() * 4)
                    switch (azar) {
                        case 0: this.palaIzquierda();this.key = false;  break;  //flecha izquierda
                        case 1: this.paArriba();     this.key = false;  break;  //flecha arriba
                        case 2: this.palaDerecha();  this.key = false;  break;  //flecha derecha
                        case 3: this.paAbajo();      this.key = false;  break;
                        default: console.log("Uuuuyyyy!!")
                      }
                  }
                } while (this.ultimaFichaOrdenada==this.cuadros)
              this.interval = setInterval(this.actualizaCanvas, MILISEGUNDOS_REFRESCO);
              this.encuentraFichasOrdenadas()
              panel.cronometro = new Date()
            }
  encuentraFicha (col,fil)
            {
              for (var i = 1; !(ficha[i].columna==col&&ficha[i].fila==fil); i++)
                {}
              return i
            }
  lentoDerecha()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (col!=0)
                {
                  ficha[this.encuentraFicha(col-1,fil)].mueveLento(col,fil)
                  ficha[this.cuadros].mueve(col-1,fil)
                  this.jugadas++
                }
              if (empezo)
                {
                  this.encuentraFichasOrdenadas()
                  if (this.ultimaFichaOrdenada ==  this.cuadros) this.ganaJuego15()
                }
            }
  lentoIzquierda()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (col!=(this.lado-1))
                {
                  ficha[this.encuentraFicha(col+1,fil)].mueveLento(col,fil)
                  ficha[this.cuadros].mueve(col+1,fil)
                  this.jugadas++
                }
                if (empezo)
                  {
                    this.encuentraFichasOrdenadas()
                    if (this.ultimaFichaOrdenada ==  this.cuadros) this.ganaJuego15()
                  }
            }
  lentoAbajo()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (fil!=0)
                {
                  ficha[this.encuentraFicha(col,fil-1)].mueveLento(col,fil)
                  ficha[this.cuadros].mueve(col,fil-1)
                  this.jugadas++
                }
                if (empezo)
                  {
                    this.encuentraFichasOrdenadas()
                    if (this.ultimaFichaOrdenada ==  this.cuadros) this.ganaJuego15()
                  }
            }
  lentoArriba()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (fil!=(this.lado-1))
                {
                  ficha[this.encuentraFicha(col,fil+1)].mueveLento(col,fil)
                  ficha[this.cuadros].mueve(col,fil+1)
                  this.jugadas++
                }
                if (empezo)
                  {
                    this.encuentraFichasOrdenadas()
                    if (this.ultimaFichaOrdenada ==  this.cuadros) this.ganaJuego15()
                  }
            }
  palaDerecha()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (col!=0)
                {
                  ficha[this.encuentraFicha(col-1,fil)].mueve(col,fil)
                  ficha[this.cuadros].mueve(col-1,fil)
                }
            }
  palaIzquierda()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (col!=(this.lado-1))
                {
                  ficha[this.encuentraFicha(col+1,fil)].mueve(col,fil)
                  ficha[this.cuadros].mueve(col+1,fil)
                }
            }
  paAbajo()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (fil!=0)
                {
                  ficha[this.encuentraFicha(col,fil-1)].mueve(col,fil)
                  ficha[this.cuadros].mueve(col,fil-1)
                }
            }
  paArriba()
            {
              let col=ficha[this.cuadros].columna
              let fil=ficha[this.cuadros].fila
              if (fil!=(this.lado-1))
                {
                  ficha[this.encuentraFicha(col,fil+1)].mueve(col,fil)
                  ficha[this.cuadros].mueve(col,fil+1)
                }
            }
  queMover(numeroFicha)
            {
              if (numeroFicha==this.cuadros) return (0)
              else if(ficha[numeroFicha].columna==ficha[this.cuadros].columna) return("porcolumna")
                else if (ficha[numeroFicha].fila==ficha[this.cuadros].fila) return("porfila")
                  else return(0)
            }
  mueveporClic()
            {
              let numeroFicha = this.cuadroClic
              let col = ficha [numeroFicha].columna
              let fil = ficha [numeroFicha].fila
              let movimientos

              if (this.queMover(numeroFicha)=="porfila")
                {
                  movimientos=ficha[this.cuadros].columna - col
                  if (movimientos>0)
                    for (var i = 0; i < movimientos; i++)
                    {
                      this.lentoDerecha()//*********************************palaDerecha o lentoDerecha de acuerdo a si se quiere animacion
                      if (i>0) this.jugadas--
                    }
                    else
                    {
                      movimientos*=-1
                      for (var i = 0; i < movimientos; i++)
                      {
                        this.lentoIzquierda()//*********************************palaDerecha o lentoDerecha de acuerdo a si se quiere animacion
                        if (i>0) this.jugadas--
                      }
                    }
                }
                else if(this.queMover(numeroFicha)=="porcolumna")
                {
                  movimientos=ficha[this.cuadros].fila - fil
                  if (movimientos>0)
                    for (var i = 0; i < movimientos; i++)
                    {
                      this.lentoAbajo()//*********************************palaDerecha o lentoDerecha de acuerdo a si se quiere animacion
                      if (i>0) this.jugadas--
                    }
                    else
                    {
                      movimientos*=-1
                      for (var i = 0; i < movimientos; i++)
                      {
                        this.lentoArriba()
                        if (i>0) this.jugadas--
                      }
                    }
                }

            }
  queque(puntero)
            {
              var posicion = lienzo1.getBoundingClientRect(); //trae los limites y tamaño del lienzo1
              var alaX = posicion.left;//posición x del lienzo1 al borde de la pagina (izquierda)
              var alaY = posicion.top;//posición y del lienzo1 al borde de la pagina (arriba)
              var posX = puntero.pageX-alaX
              var posY = puntero.pageY-alaY

              if (posX<=ladoLienzoPixeles)
                {
                  let col=Math.floor((puntero.pageX-alaX)/ladoFicha)
                  let fil=Math.floor((posY-(modoVertical-1)*ladoLienzoPixeles)/ladoFicha) //se debe ajustar la distancia que se corrio el tablero por la inclusion de la zona de controles

                   this.clic=true
                   this.cuadroClic = this.encuentraFicha(col,fil)
               }
                else
                  {
                    if ((posX>(1.03 * ladoLienzoPixeles))&&(posX<(1.17*ladoLienzoPixeles))&&(posY>0.81* ladoLienzoPixeles)&&(posY<0.96* ladoLienzoPixeles))
                      this.baraja()
                  }
            }
  apagaRefrescoJuego()
            {
              clearInterval(this.interval)
            }
  encuentraFichasOrdenadas()
            {

              let k=0,fil=0
              bucle: for(fil=0;fil<this.lado;fil++)
                for(let col=0;col<this.lado;col++)
                  {
                    k = this.lado*fil+col+1
                    if (this.encuentraFicha(col,fil) != k) break bucle
                  }
              this.ultimaFilaOrdenada=fil
              this.ultimaFichaOrdenada=k

            }
  ganaJuego15()
            {
              let horaFinal       = new Date().getTime()
              let jugadasyTiempos = new PuntajeAGuardar(this.lado-2)
              this.tiempoms       = horaFinal - panel.cronometro.getTime()
              let horas           = Math.floor((this.tiempoms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
              let minutos         = Math.floor((this.tiempoms % (1000 * 60 * 60))      / (1000 * 60))
              let segundos        = Math.floor((this.tiempoms % (1000 * 60))           / 1000)
              let milisegundos    = Math.floor((this.tiempoms % (1000 * 60))           / 100)

              horas    = (horas < 10)    ? "0" + horas    : horas
              minutos  = (minutos < 10)  ? "0" + minutos  : minutos
              segundos = (segundos < 10) ? "0" + segundos : segundos
              milisegundos = (milisegundos < 100) ? (milisegundos < 10) ? "00" + milisegundos : "0" + milisegundos : milisegundos

              let ultimoMovimiento = setTimeout(this.apagaRefrescoJuego, MILISEGUNDOS_REFRESCO*(CUADROS_PARA_MOVER+2)) //Da tiempo para que la última ficha se acomode

              if(jugadasyTiempos.comparayGuardaPuntaje(this.jugadas))
                {

                  if(jugadasyTiempos.comparayGuardaTiempo(this.tiempoms,this.lado-2))
                    {
                      avisaConMenu('¡¡Excelente!! ¡¡Superaste todos los límites!!',`Ganaste el nivel ${this.lado}. ¡¡Rompiste el record de menor número de jugadas y de menor tiempo!!\nLo hiciste en ${this.jugadas} jugadas.\nY te demoraste ${horas}h:${minutos}min:${segundos}s:${milisegundos}ms!!`,'imagenes/gokuGana.jpg')
                    }
                    else
                      {
                        avisaConMenu('¡¡Excelente!! ¡¡Superaste el límite!!',`Ganaste el nivel ${this.lado}. Rompiste el record de menor número de jugadas\nLo hiciste en ${this.jugadas} jugadas.\nY te demoraste ${horas}h:${minutos}min:${segundos}s:${milisegundos}ms!!`,'imagenes/gokuAzul.png')
                      }
                }
                  else
                    {
                      if(jugadasyTiempos.comparayGuardaTiempo(this.tiempoms,this.lado))
                        {
                          avisaConMenu('¡¡Excelente!! ¡¡Superaste el límite!!',`Ganaste el nivel ${this.lado}. También rompiste record de velocidad\nTereminaste en ${horas}h:${minutos}min:${segundos}s:${milisegundos}ms!!\nY lo hiciste en ${this.jugadas} jugadas.\n`,'imagenes/gokuGanaTiempo.png')
                        }
                        else
                          {
                            avisaConMenu('¡¡Muy bien!! ¡¡Ganaste!!',`Superaste el nivel ${this.lado}.\n Lo hiciste en ${this.jugadas} jugadas.\nY te demoraste ${horas}h:${minutos}min:${segundos}s:${milisegundos}ms!!`,'imagenes/gokuDios.png')
                          }
                    }
            }
}

function componente(elAncho, elAlto, elcolor, xPosicion, yPosicion, elnumero, lacolumna, lafila)
  {
    this.ancho   =    elAncho
    this.alto    =     elAlto
    this.x       =  xPosicion
    this.y       =  yPosicion
    this.numero  =   elnumero
    this.color   =    elcolor
    this.columna =  lacolumna
    this.fila    =     lafila
    this.velX    =          0
    this.velY    =          0
    this.actualizaComponente = function()
      {
        if(this.velX!=0)
          {
            this.x+=this.velX
            if (Math.abs(Math.abs(this.x) - Math.abs(this.columna * ladoFicha))<0.2) this.velX = 0
          }

        if(this.velY!=0)
          {
            this.y+=this.velY
            if (Math.abs(Math.abs(this.y) - Math.abs(this.fila    * ladoFicha))<0.2) this.velY = 0
          }

        contexto.fillStyle = this.color;
        contexto.fillRect(this.x, this.y, this.ancho, this.alto);
        contexto.font = tablerodeJuego.tamanoFuente * this.alto + "px Helvetica, sans-serif"
        contexto.textBaseline = "middle"
        contexto.fillStyle = "black"
        contexto.textAlign = "center"
        contexto.lineWidth = 0.5
        contexto.strokeStyle = "grey"
        contexto.strokeRect(this.x, this.y, this.ancho, this.alto);
        contexto.strokeStyle = "black"
        contexto.lineWidth = 1
        if (empezo)
          {
            if (this.numero<tablerodeJuego.ultimaFichaOrdenada)
              {
                if (this.fila<tablerodeJuego.ultimaFilaOrdenada)
                  dibujaCuadrado(this.x,this.y,ladoFicha,ladoFicha,1,contexto,"mediumseagreen")
                else dibujaCuadrado(this.x,this.y,ladoFicha,ladoFicha,2,contexto,"mediumseagreen")
              }
            if(this.numero==(tablerodeJuego.ultimaFichaOrdenada))
              dibujaCuadrado(this.x,this.y,ladoFicha,ladoFicha,2,contexto,"orangered")
            if(this.numero==(tablerodeJuego.ultimaFichaOrdenada+1))
              dibujaCuadrado(this.x,this.y,ladoFicha,ladoFicha,1,contexto,"orangered")

          }
        contexto.strokeText(this.numero, this.x+this.ancho/2,this.y+this.alto/2 )
    }
    this.mueve = function(nuevaColumna,nuevaFila)
      {
        var ubicacionX = nuevaColumna * ladoFicha
        var ubicacionY = nuevaFila *ladoFicha

        this.x = ubicacionX
        this.y = ubicacionY

        this.columna=nuevaColumna
        this.fila=nuevaFila
      }
    this.mueveLento = function(nuevaColumna,nuevaFila)
      {
        if      (nuevaColumna>this.columna)  this.velX =   ladoFicha /CUADROS_PARA_MOVER
        else if (nuevaColumna<this.columna) this.velX = - ladoFicha /CUADROS_PARA_MOVER
        else if (nuevaFila>this.fila)      this.velY =   ladoFicha /CUADROS_PARA_MOVER
        else if (nuevaFila<this.fila)     this.velY = - ladoFicha /CUADROS_PARA_MOVER
        this.columna=nuevaColumna
        this.fila=nuevaFila
    }
  }

function tamanoCanvas()
  {
    var w = window.innerWidth
    var h = window.innerHeight
    //if (w>h)    { solo se hace horizontal por ahora, ya que no está funcionando en celular.
      ladoLienzoPixeles = h - 20
      modoHorizontal=1.2 //20% adicional para el panel de control
      if ((ladoLienzoPixeles*modoHorizontal)>w) ladoLienzoPixeles=Math.floor(w/1.2)-10
    /*}
    else
    {
      modoVertical=1.2 //20% adicional para el panel de control
      ladoLienzoPixeles = w - 20
      if ((ladoLienzoPixeles*modoVertical)>h) ladoLienzoPixeles=Math.floor(h/1.2)-10
    }*/
    ladoFicha = (ladoLienzoPixeles)/tablerodeJuego.lado
  }


tablerodeJuego = new Juego15
tamanoCanvas()
panel= new PaneldeControl
window.addEventListener('keydown', function (e){tablerodeJuego.key = e.keyCode})
window.addEventListener('click', tablerodeJuego.queque)

//AHORA POR EL MOUSE

//var puntero

// Y PARA TERMINAR POR EL TOUCHSCREEN NO HUBO NECESIDAD, FUNCIONO CON EL CLIC DEL MOUSE
/*window.addEventListener('touchend',toco)
function toco(toque)
{
  var posicion = tablerodeJuego.lienzo1.getBoundingClientRect(); //trae los limites y tamaño del lienzo1
  var alaX = posicion.left;//posición x del lienzo1 al borde de la pagina (izquierda)
  var alaY = posicion.top;//posición y del lienzo1 al borde de la pagina (arriba)

    let col=Math.floor((toque.pageX-alaX)/ladoFicha)
    let fil=Math.floor((toque.pageY-alaY)/ladoFicha)

    console.log("X "+ toque.pageX +" y dividio ladoFicha " + col)
    console.log("Y "+ toque.pageY +" y dividio ladoFicha " + fil)
}*/
