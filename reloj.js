
const Angulo = Math.PI / 6


function dibujaReloj(radio,contexto)
{
  dibujaCaraReloj(radio,contexto)
  dibujaNumeros(radio,contexto)
  dibujaHora(radio,contexto)
}

function dibujaHora(radio,contexto)
{
  let hora     = new Date()
  let horas    = hora.getHours(); horas %= 12
  let minutos  = hora.getMinutes()
  let segundos = hora.getSeconds()
  //var milisSi  = document.getElementById("milis").checked
  let milisegundos = hora.getMilliseconds()

  //Para la hora
  dibujaManecilla(0.5  * radio, 0.08  * radio, Angulo * (horas + minutos / 300),contexto)
  //Para los minutos
  dibujaManecilla(0.7  * radio, 0.06  * radio, Angulo *(minutos / 5 + segundos / 300),contexto)
  //Para los segundos
  dibujaManecilla(0.75 * radio, 0.035 * radio, Angulo * (segundos / 5 + milisegundos / 5000),contexto)
  //textoHora.innerHTML = horas + ":" + minutos + ":" + segundos
  //para milisegundos
  //if (milisSi)

  //dibujaManecilla(0.85 * radio, 0.015 * radio, milisegundos * Angulo * 12 / 1000,contexto)
  //textoHora.innerHTML += ":" + milisegundos
}

function dibujaManecilla(longitud, ancho, crono, lienzo)
{
  lienzo.rotate(crono)
  lienzo.beginPath()
  lienzo.moveTo(0,0)
  lienzo.lineWidth = ancho
  lienzo.lineCap = "round"
  lienzo.lineTo(0,-longitud)
  lienzo.stroke()
  lienzo.rotate(-crono)
}

function dibujaCirculo(r,lienzo)
{
  lienzo.beginPath()
  lienzo.arc(0,0,r,0,2*Math.PI)
  lienzo.fillStyle = "silver"
  lienzo.fill()
  lienzo.closePath()

  lienzo.beginPath()
  lienzo.arc(0,0,r*.097,0,2*Math.PI)
  lienzo.fillStyle = "SeaShell"
  lienzo.fill()
  lienzo.closePath()
}

function dibujaNumeros(r,lienzo)
{
  lienzo.font = 0.2 * r + "px Helvetica, sans-serif"
  lienzo.textBaseline = "middle"
  lienzo.textAlign = "center"

  for (var i = 1; i < 13; i++)
  {
    lienzo.rotate(Angulo)
    lienzo.translate (0, -0.82 * r)
    lienzo.rotate(-i*Angulo)   // para enderezar los numeros,
    lienzo.fillText(i.toString(), 0, 0)
    lienzo.rotate(i*Angulo) //  se pueden obviar para numeros concentricos
    lienzo.translate(0,0.82 * r)

  }
}

function dibujaCaraReloj(r,lienzo)
{
  var gradiente
  lienzo.beginPath()
  lienzo.arc(0,0,r,0,2*Math.PI)
  lienzo.fillStyle = "#000000"
  lienzo.fill()

  gradiente = lienzo.createRadialGradient(0,0, r  ,0,0, 1.05*r)
  gradiente.addColorStop(0.5,"silver")
  gradiente.addColorStop(1, "silver")
  lienzo.strokeStyle = gradiente
  lienzo.lineWidth = 0.03*r
  lienzo.stroke()
  dibujaCirculo(0.06*r,lienzo)
}
