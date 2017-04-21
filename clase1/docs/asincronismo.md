## Programación asincronica en Node.js

Uno de los primeros conceptos que debemos incorporar cuando empezamos a programar en Node.js es la idea de asincronismo. En Node.js todas las operaciones de entrada/salida (IO) se ejecutan de manera asincrónica y no bloquente. Esto tiene muchas ventajas en cuanto a la optimización de los recursos (permite majenar muchas operaciones IO en un mismo thread de forma eficiente), pero al mismo tiempo nos obliga a adoptar algunos patrones de programación diferentes a otras plataformas mas tradicionales que usan IO bloqueante (como Java o PHP).

[Event Loop](https://en.wikipedia.org/wiki/Event_loop)
[Asynchronous I/O](https://en.wikipedia.org/wiki/Asynchronous_I/O)

### Continuation Passing Style

En el estilo de programacion tradicional, el flujo de datos de un programa es directo. Cada funcion al ser invocada recibe ciertos parametros y realiza cierto procesamiento. El resultado del mismo se comunica al flow principal mediante el valor de retorno. Por ejemplo:

```
// Declaracion de la función
function add(a, b) {
  return a + b;
}

// Invocación
const result = add(1, 2);

// Uso del resultado
console.log(result);
```

Si se utiliza este estilo de programación para operaciones IO, la función deberia "esperar" a que la operacion IO termine antes de retornar, bloqueando la ejecucion del programa hasta este punto. Como vimos, node no trabaja de este modo, por lo que el estilo directo no sirve para expresar operaciones IO y necesitamos de otro tipo de semanticas. Continuation Passing Style (CPS) es el patron de ejecucion que se ultiliza en todo el ecosistema de Node.js para manejar el flujo de datos en operaciones asincronicas.

En CPS, cada función recibe un parámetro adicional, que representa la Continuación de la función. En lugar de retornar, la función invocará la continuación recibida pasando el valor de retorno.

```
// Declaracion de la función
function add(a, b, callback) {
  return a + b;
}

// Invocación
add(1, 2, function (result) {
    // Uso del resultado
    console.log(result);
});
```

El CPS puede ser asincroónico o sincrónico. En el ejemplo anterior, al no realizarse nunguna opercion de IO, el callback es llamado inmediatamente, por lo tanto su ejecución es secuencial al resto del código. Sin embargo lo mas comun es usar este estilo solo para la API de una funcion que realiza algun tipo de operacion IO. Podemos simpular una operacion IO, usando la funcion setTimeout y retrasando la ejecucion del callback por 3000 milisegundos.

```
function addCPSAsync(x, y, callback) {
  setTimeout(
    function() {
      callback(x + y);
    },
    3000
  );
}
```

[Continuation Passing Style](https://en.wikipedia.org/wiki/Continuation-passing_style)