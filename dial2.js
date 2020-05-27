var controlX1=500,controlY1=100,controlX2=100,controlY2=500
var  MILISEGUNDOS_REFRESCO = 250
var valorInicial=2,valorFinal=15,xUbicaGrado=100,yUbicaGrado=100,tamañoLetra=20,colorGraduacion="GhostWhite"
//lienzo = document.getElementById("canvas")

class Dial  {
  constructor (x1,y1,apertura,x2,y2,color,lienzo,radio/*,refresco*/)
            {
                 //posición y del canvas al borde de la pagina (arriba)
              this.posicionX        = 0
              this.prendeGraduacion = this.prendeGraduacion.bind(this)
              this.actualizaDial    = this.actualizaDial.bind(this)
              this.mueveDial        = this.mueveDial.bind(this)
              this.limpia           = this.limpia.bind(this)
              if (x1>x2){
                var aux=x1,auy=y1
                x1=x2; y1=y2
                x2=aux; y2=auy
              }

              this.graduacion = false
              this.grado      = 4
              this.radio      = radio
              this.x1         = x1
              this.y1         = y1
              this.apertura   = apertura
              this.x2         = x2
              this.y2         = y2
              this.color      = color
              this.angulo     = Math.atan((y2-y1)/(x2-x1))


              //this.intervalo  = setInterval(this.actualizaDial, refresco) //para usar esta clase en otro javascript quitamos el refresco,que lo haga el otro programa,
                                                                      //en teoria solo debería ser llamar la funcion actualizaDial
              window.addEventListener('mousemove', this.mueveDial)
              window.addEventListener('mousedown', this.mueveDial)
            }
  actualizaDial(lienzo)
            {
              this.tamanoCanvas = lienzo.getBoundingClientRect()   //trae los limites y tamaño del canvas
              this.contexto     = lienzo.getContext("2d")
              this.alaX         = this.tamanoCanvas.left           //posición x del canvas al borde de la pagina (izquierda)
              this.alaY         = this.tamanoCanvas.top
              this.limpia()
              this.mueveCanvas()
              this.giraCanvas()
              this.dibujaRecorrido()
              this.dibujaNivel()
              this.desgiraCanvas()
              this.desmueveCanvas()
              if (this.graduacion) this.muestraGraduacion()
            }
  mueveCanvas()
            {
              this.contexto.translate(this.x1,this.y1)
            }
  giraCanvas()
            {
              this.contexto.rotate(this.angulo)
            }
  desmueveCanvas()
            {
              this.contexto.translate(-this.x1,-this.y1)
            }
  desgiraCanvas()
            {
              this.contexto.rotate(-this.angulo)
            }
  limpia()
            {
              //this.contexto.clearRect(0, 0, this.tamanoCanvas.width, this.tamanoCanvas.height)
            }
  mueveDial (raton)
            {
              if (raton.buttons == 1)
                {
                  var yDos=(raton.clientY - this.alaY)
                  var xDos=(raton.clientX - this.alaX)

                  this.yPrima=(yDos-this.y1)*Math.cos(this.angulo)-(xDos-this.x1)*Math.sin(this.angulo) //convierte las coordenadas tomadas del canvas a las coordenadas del plano girado
                  this.xPrima=(xDos-this.x1)*Math.cos(this.angulo)+(yDos-this.y1)*Math.sin(this.angulo)

                }
                  if (Math.abs(this.yPrima)<(1.4*this.apertura))
                    if ((this.xPrima<this.distancia)&&(this.xPrima>0))
                      this.posicionX = this.xPrima
            }
  dibujaNivel()
            {
              dibujaBola(this.color,this.posicionX,0,this.radio,1,this.contexto)
            }
  dibujaRecorrido()
            {
              dibujaCuadrado(0,-this.apertura/2,this.distancia,this.apertura,0.6,this.contexto,"silver")
            }
  prendeGraduacion(valorInicial,valorFinal,xUbicaGrado,yUbicaGrado,tamañoLetra,colorGraduacion)
            {
              this.graduacion  = true
              this.distancia   = distancia(this.x1,this.y1,this.x2,this.y2)
              this.deltaX      = this.distancia/(valorFinal-valorInicial)
              this.gradoIncial = valorInicial
              this.gradoFinal  = valorFinal
              this.gradoX      = xUbicaGrado
              this.gradoY      = yUbicaGrado
              this.gradoLetra  = tamañoLetra
              this.gradoColor  = colorGraduacion
              this.posicionX   = 2*this.deltaX
            }
  muestraGraduacion()
            {
              this.grado                 = Math.floor(this.posicionX/this.deltaX) + this.gradoIncial
              this.contexto.font         = this.gradoLetra + "px Helvetica, sans-serif"
              this.contexto.textBaseline = "middle"
              this.contexto.textAlign    = "center"
              this.contexto.fillStyle    = this.gradoColor
              //this.contexto.fillText(this.grado.toString(), this.gradoX,this.gradoY)
            }
}

//dialdeBola = new Dial(controlX1,controlY1,20,controlX2,controlY2,"red",lienzo,MILISEGUNDOS_REFRESCO)
//dialdeBola.prendeGraduacion(valorInicial,valorFinal,xUbicaGrado,yUbicaGrado,tamañoLetra,colorGraduacion)

function dibujaLinea    (color, xIni, yIni, xFin, yFin, ancho, lienzo)
  {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.strokeStyle = "solid";
    lienzo.lineWidth = ancho;
    lienzo.moveTo (xIni, yIni);
    lienzo.lineTo (xFin, yFin);
    lienzo.stroke();
    lienzo.closePath();
  }
function dibujaCirculo  (color, x, y, r, ancho, lienzo)
  {
  lienzo.beginPath()
  lienzo.strokeStyle = color
  lienzo.strokeStyle = "solid"
  lienzo.lineWidth = ancho
  lienzo.arc(x, y, r, 0, 2 * Math.PI)
  lienzo.stroke();
  lienzo.closePath();
  }
function dibujaBola     (color, x, y, r, ancho, lienzo)
  {
    var gradiente=lienzo.createRadialGradient(x+0.2*r,y-0.3*r,0.4*r, x,y,r)
    lienzo.strokeStyle='black'
    gradiente.addColorStop(0, color);
    gradiente.addColorStop(1,'black')
    lienzo.fillStyle=gradiente
    lienzo.beginPath()
    lienzo.arc(x, y, r, 0, 2 * Math.PI)
    lienzo.fill()
    lienzo.stroke();
    lienzo.closePath();
  }
function dibujaCuadrado (x,y,ancho,alto,grueso,canvas,silver)
  {
      dibujaLinea(silver,x,y,x+ancho,y, grueso,canvas);
      dibujaLinea(silver,x+ancho,y,x+ancho,y+alto, grueso,canvas);
      dibujaLinea(silver,x+ancho,y+alto,x,y+alto, grueso,canvas);
      dibujaLinea(silver,x,y+alto,x,y, grueso,canvas);
  }
function distancia      (x1,y1,x2,y2)
  {
    if(!x2) x2=0;
    if(!y2) y2=0;
    return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
  }
  function milisegundosaHoras(milis)
  {
    let horas           = Math.floor((milis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutos         = Math.floor((milis % (1000 * 60 * 60))      / (1000 * 60))
    let segundos        = Math.floor((milis % (1000 * 60))           / 1000)
    let milisegundos    = Math.floor((milis % (1000 * 60))           / 100)

    horas    = (horas < 10)    ? "0" + horas    : horas
    minutos  = (minutos < 10)  ? "0" + minutos  : minutos
    segundos = (segundos < 10) ? "0" + segundos : segundos
    milisegundos = (milisegundos < 100) ? (milisegundos < 10) ? "00" + milisegundos : "0" + milisegundos : milisegundos
    return(`${horas}h:${minutos}min:${segundos}s:${milisegundos}ms`)
  }
