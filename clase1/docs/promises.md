# Promises

Utilizar callbacks nos puede llevar a una situación donde la anidación de los mismos puede empezar a ser dificil de entender. Este antipatrón es conocido como [callback hell](https://en.wiktionary.org/wiki/callback_hell) y una de las formas de resolverlo es a través del uso de promises.

[docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Definición

```
The Promise object is used for asynchronous computations. A Promise represents a value which may be available now, or in the future, or never.
```

Como podemos ver en la definición, una promesa es utilizada para realizar operaciones asincrónicas. La misma representa un valor que podrá estar disponible ahora, en el futuro o nunca. Es por este motivo que una promesa nos debe ofrecer una forma de iniciar una operación asincrónica la cual una vez finalizada pueda devolver el valor de la operación realizada.

La forma ofrecida por una Promise se denomina __executor__

## Sintaxis

```javascript
new Promise( /* executor */ function(resolve, reject) { ... } );
```

## Executor

Un executor es una función que recibe dos parámetros resolve y reject. La función executor es ejecutada inmediatamente por la implementación de una Promesa (el *executor* hasta es ejecutado antes que el cosntructor de la promesa retorne el objeto creado).

Las funciones __resolve__ y __reject__, resuelven y rechazan la promesa respectivamente. Y si se lanza un error dentro del executor la promesa también es rechazada.

## Estados de una promesa

1. Pendiente: es el estado inicial, no finalizó ni se rechazó.
2. Finalizada: se completó la operación sin errores.
3. Rechazada: la operación falló.

## Promise.prototype.then()

Anteriormente mencionamos que un *executor* devolverá el valor de su ejecución una vez finalizado o devolverá el error en caso de haber fallado. La forma de obtener el valor o el error de una promesa es a través de .then()

El método __then( )__ devuelve una promesa y recibe dos funciones, la primera recibirá el valor esperado y la segunda nos devolverá el error en caso de que haya fallado.

```javascript
p.then( value => {
  // La promesa devolvió un valor
}, error => {
  // Hubo un error
});
```

## Promise.prototype.catch()

El método __catch()__ al igual que __then()__ retorna una promesa pero a diferencia del anterior sólo maneja los casos de error.

Su funcionamiento es el mismo que llamar a __.then(undefined, onRejected)__

```javascript
p.catch( error => {
  // Hubo un error
});
```

### Ejemplo .then() y .catch()
```javascript

// funcion que simula una obtención asincrónica de usuarios 
const getUsers = () => {
  return new Promise( (resolve, reject) => {
    asyncmethod( (err, result) => {
      if(err) return reject(err);
      return resolve(result);
    });
  });
};

// Ejemplo
getUsers()
 .then( users => {
    console.log(users);
 })
 .catch( error => {
    console.error(error);
 });
```

## Promise.prototype.all()

El método __all()__ retorna una única promesa que finalizará una vez que finalicen todas las promesas del argumento recibido, or fallará cuando una de las promesas recibidas fallé.

```javascript
const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  resolve(10);
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, 10] 
});
```

## Encadenamiento de promises

Como se mencionó anteriormente __.then()__ y __.catch()__ devuelven por default promesas, esto hace posible que las mismas sean encadenadas.

```javascript
p
  .then( value => {
    // La promesa devolvió un valor
    // quiero seguir pasando el valor a las siguientes promesas
    return value;
  })
  .then( value => {
    // Valor devuelto por 1° then()
    // then() por default devuelve una promesa
  })
  .then( value => {
    // value es undefined
  })
  .catch( error => {
    // Hubo un error en cualquier parte de la cadena
  });
```