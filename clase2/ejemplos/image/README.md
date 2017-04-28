## Docker image

### Crear un archivo Dockerfile

```bash
# Crear una imagen a partir de un filesystem node 6.10

## Crear un Dockerfile
vim Dockerfile
```

__Ejemplo de un archivo Dockerfile__

```docker
FROM node:6.10

# Exponer un puerto (lo vamos a ver mas adelante)
EXPOSE 3000

# Ejecutar el comando principal del contenedor
CMD ["/bin/bash"] 
```

### Generar imagen

__Comando__

```
docker build [OPTIONS] [PATH | URL | .]

docker build -t (hub_username)/(proyect):(tag) .
```

__Ejemplo__
```bash
docker build -t utnfullstack/example1:0.0.1 .
```
### Listar imágenes

__Comando__

```bash
docker images
```

### Eliminar imágenes

__Comando__

```bash
docker rmi [imageid]
```