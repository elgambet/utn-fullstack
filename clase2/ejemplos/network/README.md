## Docker network

### Listar redes

__Comando__

```bash
docker network ls
```

### Crear una red

__Comando__

```bash
docker network create --driver bridge utn-fullstack
```
### Eliminar una red

__Comando__

```bash
docker network rm utn-fullstack
```

### Eliminar todas las redes no usadas

__Comando__

```bash
docker network prune
```
