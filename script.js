//-------Carta--------//
var tamaño = 34;
var lineas = 20;
var columnas = 26;
var carta;
var contexto;
//--------------------//


//-------Snake-------//
var snakeX = tamaño * 5;
var snakeY = tamaño * 5;
//--------------------//


//------Velocidad--------//
var velocidadX = 0;
var velocidadY = 0;
//-----------------------//


//------Cuerpo--------//
var snakecuerpo = [];
//--------------------//


//------Comida--------//
var comidaX;
var comidaY;
//--------------------//


var gameOver;


window.onload = function() 
{
    carta = document.getElementById("carta")
    carta.height = lineas * tamaño;
    carta.width = columnas * tamaño;
    contexto = carta.getContext("2d"); 

    Lugarcomida();
    document.addEventListener("keyup", CambioDireccion);
    setInterval(update, 1000/10); //100ms
}

function update()
{

    if(gameOver)
    {   
        contexto.fillStyle = "green"
        contexto.font = "50px Verdana"
        return;
    }

    contexto.fillStyle = "#825494";
    contexto.fillRect(0,0, carta.width, carta.height);


    contexto.fillStyle = "#F9ED10";
    contexto.fillRect(comidaX,comidaY, tamaño, tamaño);

    if(snakeX === comidaX && snakeY === comidaY)
    {   snakecuerpo.push([comidaX, comidaY])
        Lugarcomida();
    }

    for(let i = snakecuerpo.length - 1; i > 0; i--)
    {
        snakecuerpo[i] = snakecuerpo [i-1];
    }

    if (snakecuerpo.length)
    {
        snakecuerpo[0] = [snakeX, snakeY]
    }


    contexto.fillStyle = "#1ADC39";
    snakeX += velocidadX * tamaño;
    snakeY += velocidadY * tamaño;
    contexto.fillRect(snakeX,snakeY, tamaño, tamaño);

    for(let i = 0; i < snakecuerpo.length; i++)
    {
    contexto.fillRect(snakecuerpo[i][0], snakecuerpo[i][1], tamaño, tamaño);
    }

    //gameover

    if (snakeX < 0 || snakeX > columnas*tamaño || snakeY < 0 || snakeY > lineas*tamaño)
    {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakecuerpo.length; i++)
    {
        if(snakeX == snakecuerpo[i][0] && snakeY == snakecuerpo[i][1])
        {
            gameOver = true;
            alert("Game Over");
        }
    }

}

function CambioDireccion(e)
{
    if(e.code == "ArrowUp" && velocidadY != 1) 
    {
        velocidadX = 0;
        velocidadY = -1;
    }

    else if(e.code == "ArrowDown" && velocidadY != -1) 
    {
        velocidadX = 0;
        velocidadY = 1;
    }

    else if(e.code == "ArrowLeft" && velocidadX != 1) 
    {
        velocidadX = -1;
        velocidadY = 0;
    }

    else if(e.code == "ArrowRight" && velocidadX != -1) 
    {
        velocidadX = 1;
        velocidadY = 0;
    }
}

function Lugarcomida()
{
    comidaX = Math.floor(Math.random()*columnas) * tamaño
    comidaY = Math.floor(Math.random()*lineas) * tamaño
}
