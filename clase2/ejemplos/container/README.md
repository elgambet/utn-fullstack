## Docker container

### Listar contenedores

__Comando__

```
docker ps [-a]
```

### Parar un contenedor

__Comando__

```
docker stop container-name
```

### Eliminar un contenedor

__Comando__

```
docker rm [-v] container-name
```

### Crear un contenedor

__Comando__

```
docker run [OPTIONS] IMAGE[:TAG] [COMMAND] [ARG...]
```

__Parámetros importantes__

1. __-d__ (detached) Si este parámetro es usado, el contenedor sólo existirá mientras el proceso que corre el mismo se encuentre activo. __Tener en cuenta que si el proceso inicializado retorna en vez de quedarse abierto (como por ejemplo *nginx start*) el contenedor va a pararse (stop) encuanto el proceso haya retornado.__
2. __-it__ Usado cuando queremos utilizar la shell del contenedor de forma interactiva.
3. __--name__ es el nombre del contenedor.

__Ejemplo con servicio activo__

```bash
docker build -t fullstackutn/starwars https://github.com/cilium/starwars-docker

docker run -d --name fullstackutn-starwars -p 3005:80 fullstackutn/starwars

docker ps

# API listen at http://localhost:3005/v1
```

__Ejemplo con shell__

```bash
docker run -it --name fullstackutn-ejemplo3 utnfullstack/example1:0.0.1
```
