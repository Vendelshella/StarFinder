//cuando la página se cargue genere unas coordenadas aleatorias
$(document).ready(()=>{
    
    //guardo en una variable el elemento imagen sobre el que vamos a utilizar como tablero de juego
    var $image = $("#image");

    const imgSizeX = 400;
    const imgSizeY = 400;

    //creo un objeto para generar las coordenadas aleatorias sobre la imagen
    var coordRandom ={
        x : Math.floor(Math.random() * imgSizeX),
        y : Math.floor(Math.random() * imgSizeY)
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

        //muevo el contenedor de la estrella para que aparezca cuando el jugador acierte
        var $goal = $("#goal");
        //mediante propiedades css le doy al div de la estrella las coordenadas
        $goal.css({"top": (coordClick.y-70) , "left": (coordClick.x-15)});

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
    //guardo la imagen de la estrella en una variable
    var $star = $("#star");
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
        //muestro la estrella cuando el jugador la encuentra
        $star.fadeIn(3000);
        return "¡Encontraste la estrella!";
    }
}