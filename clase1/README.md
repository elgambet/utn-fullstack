## Manejos de archivos y asincronismo en NodeJS

### Manejo de archivos (ejercicios)

Obtener los datos a partir de los archivos 

data/films.json

data/people.json

data/planets.json

#### Ejercicio 1 (ej1)

En un archivo ej1.json, guardar todas los nombres de las peliculas en las que aparece el personaje Luke Skywalker. 

``` 
1) Obtener los ids de las peliculas leyendo el json del archivo people.json buscando por id=1 

2) Obtener las peliculas del archivo people.json

3) Escribir el resultado en un nuevo archivo (ej1.json) con el siguiente formato:
 
["pelicula1", "pelicula2", ...]
```

#### Ejercicio 2 (ej2)

Refactor ej1.

``` 
1) Crear una funcione (readJSON) para leer y parsear los archivos JSON.

2) Crear una función (writeJSON) para convenrtir objeto a JSON y grabarlo en un archivo.
```

#### Ejercicio 3 (ej3)

Refactor ej2. 

``` 
1) Cambiar la API de readJSON y writeJSON para retornar promises.

2) Modificar el flow principal del programa usando promises en lugar de callbacks anidados
```

#### Ejercicio 4 (ej4)

Refactor ej3. 

``` 
1) Modificar el flow principal del programa usando Promise.All para evitar el uso de variables globales
```