window.addEventListener('DOMContentLoaded', () => {
    const btnOrientacionVertical = document.querySelector('#orientacion_v')
    const btnOrientacionHorizontal = document.querySelector('#orientacion_h')
    const btnReset = document.querySelector('#reset')

    btnOrientacionVertical.addEventListener('click', () => {
        
        const canvas = document.querySelector('#canvas')
        const papelAncho = parseFloat(document.querySelector('#papel_ancho').value)
        const papelLargo = parseFloat(document.querySelector('#papel_largo').value)
        const corteAncho = parseFloat(document.querySelector('#corte_ancho').value)
        const corteLargo = parseFloat(document.querySelector('#corte_largo').value)
        
        const b = Math.max(papelAncho, papelLargo)
        const h = Math.min(papelAncho, papelLargo)
        const cb = corteAncho
        const ch = corteLargo
        const escala = 250/b
        let cortes = 0
        let sobrante = 0
        let totalCortes = 0
        let cortesV = 0
        let cortesH = 0

        clearCanvas()

        canvas.width = h*escala
        canvas.height = b*escala
        canvas.style = "background-color: #ff0;"

        cortes = acomoda(b,h,"N","Vertical")
        totalCortes = cortes.cortesT

        dibujaCuadricula(cortes.cortesB, cortes.cortesH, cb, ch, 0,0, escala)

        if (cortes.sobranteB >= ch) {
            sobrante = acomoda(cortes.sobranteB, b, "Horizontal", "Horizontal");
            totalCortes += sobrante.cortesT;
            dibujaCuadricula(sobrante.cortesH, sobrante.cortesB, ch, cb, cortes.cortesB * cb * escala, 0, escala, "Rojo");
        } else if (cortes.sobranteH >= cb) {
            sobrante = acomoda(cortes.sobranteH, h, "Horizontal", "Horizontal");
            totalCortes += sobrante.cortesT;
            dibujaCuadricula(sobrante.cortesB, sobrante.cortesH, ch, cb, 0, cortes.cortesH * ch * escala, escala, "Rojo");
        } else {
            sobrante = {
                cortesT: 0,
                cortesB: 0,
                cortesH: 0,
                sobranteB: 0,
                sobranteH: 0,
                areaUtilizada: 0
            };
        }

        if (parseInt(cb) < parseInt(ch)) {
            cortesV = cortes.cortesT;
            cortesH = sobrante.cortesT;
        } else {
            cortesV = sobrante.cortesT;
            cortesH = cortes.cortesT;
        }

        const porcentaje_area_utilizada = ((totalCortes * cb * ch * 100) / b * h).toFixed(2);
        const porcentaje_area_inutilizada = (100 - porcentaje_area_utilizada).toFixed(2);

        document.querySelector("#area_utilizada").textContent = porcentaje_area_utilizada
        document.querySelector("#area_inutilizada").textContent = porcentaje_area_inutilizada
        calcular(cortesV, cortesH, totalCortes, cortes.cortesT, "Vertical");

    })
    btnOrientacionHorizontal.addEventListener('click', () => {
        const canvas = document.querySelector('#canvas')

        const papelAncho = parseFloat(document.querySelector('#papel_ancho').value)
        const papelLargo = parseFloat(document.querySelector('#papel_largo').value)
        const corteAncho = parseFloat(document.querySelector('#corte_ancho').value)
        const corteLargo = parseFloat(document.querySelector('#corte_largo').value)
        
        const b = Math.max(papelAncho, papelLargo)
        const h = Math.min(papelAncho, papelLargo)
        const cb = corteAncho
        const ch = corteLargo
        const escala = 250/b
        let cortes = 0
        let sobrante = 0
        let totalCortes = 0
        let cortesV = 0
        let cortesH = 0

        clearCanvas()

        canvas.width = b*escala
        canvas.height = h*escala
        canvas.style = "background-color: #ff0;"

        cortes = acomoda(b,h,"N","Horizontal")
        totalCortes = cortes.cortesT

        dibujaCuadricula(cortes.cortesB, cortes.cortesH, cb, ch, 0,0, escala)

        if (cortes.sobranteB >= ch) {
            sobrante = acomoda(cortes.sobranteB, h, "Horizontal", "Horizontal");
            totalCortes += sobrante.cortesT;
            dibujaCuadricula(sobrante.cortesH, sobrante.cortesB, ch, cb, cortes.cortesB * cb * escala, 0, escala, "Rojo");
        } else if (cortes.sobranteH >= cb) {
            sobrante = acomoda(cortes.sobranteH, b, "Horizontal", "Horizontal");
            totalCortes += sobrante.cortesT;
            dibujaCuadricula(sobrante.cortesB, sobrante.cortesH, ch, cb, 0, cortes.cortesH * ch * escala, escala, "Rojo");
        } else {
            sobrante = {
                cortesT: 0,
                cortesB: 0,
                cortesH: 0,
                sobranteB: 0,
                sobranteH: 0,
                areaUtilizada: 0
            };
        }

        if (parseInt(cb) < parseInt(ch)) {
            cortesV = cortes.cortesT;
            cortesH = sobrante.cortesT;
        } else {
            cortesV = sobrante.cortesT;
            cortesH = cortes.cortesT;
        }

        const porcentaje_area_utilizada = ((totalCortes * cb * ch * 100) / b * h).toFixed(2);
        const porcentaje_area_inutilizada = (100 - porcentaje_area_utilizada).toFixed(2);

        document.querySelector("#area_utilizada").textContent = porcentaje_area_utilizada
        document.querySelector("#area_inutilizada").textContent = porcentaje_area_inutilizada
        calcular(cortesV, cortesH, totalCortes, cortes.cortesT, "Horizontal");
    })

    btnReset.addEventListener('click', reset)

})

function calcular(cortesV, cortesH, totalCortes, utilizables, orientacion) {
    const cortesDeseados = document.querySelector("#cortes_deseados").value
    let pliegos = 0
    
    if (orientacion === "Horizontal") {
        pliegos = Math.ceil(cortesDeseados / utilizables);
    } else if (orientacion === "Vertical") {
        pliegos = Math.ceil(cortesDeseados / utilizables);
    } else {
        pliegos = Math.ceil(cortesDeseados / totalCortes);
    }

    if(pliegos !== 0 && !isNaN(pliegos)) {
        pliegosP = pliegos;
    } else if (isNaN(pliegos)) {
        pliegos = 0;
    }
    
    document.querySelector("#cortes_pliego").textContent = totalCortes
    document.querySelector("#pliegos").textContent = pliegos
    document.querySelector("#numero_cortes").textContent = totalCortes * pliegos
    document.querySelector("#numero_cortes_horizontal").textContent = cortesH
    document.querySelector("#numero_cortes_vertical").textContent = cortesV
}

function dibujaCuadricula(cortesX, cortesY, width, height, coorX, coorY, escala, color) {

    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')

    const coorY1 = coorY
    const coorX1 = coorX

    for (let x = 1; x <= cortesX; x++) {
        coorY = coorY1;
        for (let y = 1; y <=cortesY; y++) {
            context.beginPath();
            context.fillStyle = color === "Rojo" ? '#d9534f' : '#286090'
            context.rect(coorX, coorY, escala*width, escala*height);
            context.fill();
            context.lineWidth = .5;
            context.strokeStyle = 'white';                      
            context.stroke();
            coorY = (escala*height * y) + coorY1;
        }
        coorX = (escala*width * x) + coorX1;
    }
}


function acomoda(d1,d2, orientacionCorte, orientacionPliego) {
    const corteAncho = parseFloat(document.querySelector('#corte_ancho').value)
    const corteLargo = parseFloat(document.querySelector('#corte_largo').value)

    let cb = 0
    let ch = 0
    let b=0
    let h=0

    if (orientacionPliego === "Vertical") {
        b = Math.min(d1,d2)
        h = Math.max(d1,d2)
    } else if (orientacionPliego === "Horizontal") {
        b = Math.max(d1,d2)
        h = Math.min(d1,d2)
    } else {
        b=d1
        h=d2
    }

    if(orientacionCorte === 'Horizontal'){
        cb = Math.max(corteAncho, corteLargo)
        ch = Math.min(corteAncho, corteLargo)
    } else if (orientacionCorte === 'Vertical') {
        cb = Math.min(corteAncho, corteLargo)
        ch = Math.max(corteAncho, corteLargo)
    } else {
        cb = corteAncho
        ch = corteLargo
    }

    const cortesT = Math.floor(b/cb) * Math.floor(h/ch)
    const cortesB = Math.floor(b/cb)
    const cortesH = Math.floor(h/ch)
    const sobranteB = b - (cortesB*cb)
    const sobranteH = h-(cortesH*ch)
    const areaUtilizada = cb*ch*(Math.floor(b/cb)*Math.floor(h/ch))

    return {
        cortesT,
        cortesB,
        cortesH,
        sobranteB,
        sobranteH,
        areaUtilizada
    }
}

function clearCanvas(){
    const canvas = document.querySelector('#canvas')
    const context = canvas.getContext('2d')
    context.clearRect(0,0,canvas.clientWidth, canvas.height)
}

function reset() {
   document.querySelector('#papel_ancho').value = ''
   document.querySelector('#papel_largo').value = ''
   document.querySelector('#corte_ancho').value = ''
   document.querySelector('#corte_largo').value = ''
}


