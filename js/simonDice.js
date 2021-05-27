export default function simonDice(botones, botonesMostrados) {
    const $botones = document.querySelectorAll(botones);
    const $botonesMostrados = document.querySelectorAll(botonesMostrados);
    let contadorPatron = 0,
        posActual = 0,
        arregloSeleccionado = [],
        arregloMostrado = [];
    const generarAleatorio = () => {
        return parseInt(Math.random() * 9);
    }
    const desactivarBotones = () =>{
        $botones.forEach(boton => boton.disabled = true);
    }
    const activarBotones = () =>
        $botones.forEach(boton => boton.disabled = false);
    
    const compararArreglos = (arr1,arr2) =>{
        let iguales = true;
        if(arr1.length !== arr2.length ){
            iguales = false;
            return iguales;
        }
        arr1.forEach((el,i)=>{
            if(el != arr2[i]){
                iguales = false;
            }
        });
        return iguales;
    }
    const errorPatron =()=>{
        $botonesMostrados.forEach((div)=>{
            div.style.backgroundColor = "#42a6fc";
            div.style.border = "3px solid black";
            div.style.borderRadius = "8px";
            let timer = setTimeout(() => {
                div.style.backgroundColor = "#000";
                div.style.borderRadius = "3px";
            }, 700);
        });
    }
    const mostrarPatron = (arregloMostr) => {
        desactivarBotones();
        posActual = generarAleatorio();
        arregloMostr.push(posActual);
        arregloMostr.forEach((pos,i)=>{
            let $btn_mostrado = $botonesMostrados[pos];
            let timing = setTimeout(() => {
                $btn_mostrado.style.backgroundColor = "#42a6fc";
                // console.log("se ejecuta el primer timing");
                clearTimeout(timing);
            }, (i+1)*1500);
            let timingGrande = setTimeout(() => {
                let timing2 = setTimeout(() => {
                    $btn_mostrado.style.backgroundColor = "#000";
                    // console.log("se ejecuta el segundo timing");
                    clearTimeout(timing2);
                }, (i+1) *1500);
                // console.log("se ejecuta el timing grande");
                clearTimeout(timingGrande);
            }, 500);
            
        });
        
    }
   mostrarPatron(arregloMostrado);
   activarBotones();
    $botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            arregloSeleccionado.push(boton.dataset.pos);
            if (compararArreglos(arregloMostrado,arregloSeleccionado)) {
                mostrarPatron(arregloMostrado);
                activarBotones();
                arregloSeleccionado = [];
            }
            if(!compararArreglos(arregloSeleccionado,arregloMostrado) && arregloSeleccionado.length === arregloMostrado.length){
                errorPatron();
                arregloMostrado = [];
                arregloSeleccionado = [];
                mostrarPatron(arregloMostrado);
                activarBotones();
            }

        });
    });
}