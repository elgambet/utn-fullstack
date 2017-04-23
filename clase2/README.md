# Docker

[Docker](https://www.docker.com/) es una plataforma abierta que sirve tanto para desarrolladores como para sysadmins. La misma permite construir, subir y ejecutar aplicaciones distribuidas.

## ¿Qué nos ofrece?

#### Dejar de pensar en las dependencias

Si alguna vez haz tenido que decir "en mi máquina anda" van a enteder fácilmente el problema de las depenedencias. Las mismas pueden ser propias de la tecnología que estemos usando (por ejemplo NodeJS) o del sistema operativo (alguna librería de Linux). Sea cual fuese el caso nos podemos encontrar ante una situación donde la aplicación desarrollada ande en nuestra máquina pero no en el servidor.

Esto es eliminado al utilizar [Docker](https://www.docker.com/) ya que nos permite correr nuestra aplicación de forma aislada sin tener que preocuparnos por las dependencias.

#### Trabajar con cualquier "Stack"

Al igual que el punto anterior el aislamiento de nuestra aplicación nos permite trabajar con cualquier stack de tecnología sin tener que preocuparnos por el entorno de ejecución.

#### Mejorar la colaboración entre el equipo

Al liberar al programador del entorno de ejecución y al ofrecer una única forma de manejar las dependencias y el entorno de trabajo, [Docker](https://www.docker.com/) también mejora la integración del mundo de los programadores con el mundo de los sysadmin.

## Operating-system-level virtualization

Antes de poder entender como funciona Docker debemos entender qué es una virtualización a nivel del sistema operativo.
[Operating-system-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) es un método de virtualización en donde el kernel de un sistema operativo permite la existencia de múltiples instancias aisladas de espacios de usuarios. Estas instancias (llamadas generalmente "contenedores") pueden sentirse como servidores reales desde el punto de vista de un usuario.

#### Diferencia entre una VM y un contenedor

<img src="./data/containers-versus-virtual-machines-docker-inc-rightscale.jpg" width="250px" style="width: 250px;"/>

Como pueden ver en la imágen la principal diferencia entre una VM y un contenedor es que una VM no sólo necesita una copia entera de un sistema operativo, sino que también necesita una copia virtual del hardware y eso conlleva mucho procesamiento y espacio.

#### Linux Containers (LXC)

Los contenedores de linux o [LXC](https://en.wikipedia.org/wiki/LXC) son una implementación de [Operating-system-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) y en ellos está basado [Docker](https://www.docker.com/)

## Comandos
