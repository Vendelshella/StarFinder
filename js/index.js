//cuando la página se cargue genere unas coordenadas aleatorias
$(document).ready(()=>{
    //guardo en una variable el elemento imagen sobre el que vamos a utilizar como tablero de juego
    var $image = $("#image");
    //creo un objeto para generar las coordenadas aleatorias sobre la imagen
    var coordRandom ={
        x : Math.floor(Math.random() * $image.width()),
        y : Math.floor(Math.random() * $image.height())
    }
    console.log(coordRandom);

    //contador de clics
    var clickCount = 0;

    //cuando de clic en algún lugar de la imagen que me devuelva la posición
    $image.on("click", (e)=>{
        //creo un objeto para guardar coordenadas del clic sobre la imagen
        var coordClick ={
            x : e.clientX,
            y : e.clientY
        };

        console.log(coordClick);

        //esta variable nos ayuda a conocer a qué distancia estamos de las coordenadas aleatorias
        var distance = getDistance (e, coordRandom);
        console.log(distance);

        //imprimimos las pistas en pantalla para el jugador
        var hints = getHints (distance);
        var $printHint = $("#print-hint");
        $printHint.text(hints);

        //hacemos un contador con la cantidad del clics del jugador
        clickCount++;
        console.log(clickCount);
        var $click = $("#click-count");
        $click.text(clickCount);
    });
    
    //cuando termina el juego lo reseteamos con el botón Reiniciar Juego
    var reset = $("#reset-button");
    reset.on("click", (e)=>{
        location.reload();
    });
});
//función para hallar la distancia desde el clic hasta las coordenadas aleatorias mediante el teorema de Pitágoras
function getDistance (e, coordRandom){
    var diffX = e.clientX - coordRandom.x;
    var diffY = e.clientY - coordRandom.y;
    return Math.sqrt(diffX * diffX + diffY * diffY);
}
//función para dar pistas
function getHints (distance){
    if(distance > 500){
        return "Estás perdido XD";
    }else if (distance > 300){
        return "Estás muy lejos";
    }else if(distance > 200){
        return "Estás lejos";
    }else if(distance > 100){
        return "Estás cerca";
    }else if(distance > 50){
        return "Estás muy cerca";
    }else if(distance > 20){
        return "Casi casi!!!";
    }else{
        alert("¡Encontraste la estrella!");
    }
}