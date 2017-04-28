# Docker

[Docker](https://www.docker.com/) es una plataforma abierta que sirve tanto para desarrolladores como para sysadmins. La misma permite construir, subir y ejecutar aplicaciones distribuidas.

## ¿Qué nos ofrece?

#### Dejar de pensar en las dependencias

Si alguna vez tuviste que decir "en mi maquina anda" vas a entender fácilmente el problema de las dependencias. Las mismas pueden ser propias de la tecnología que estemos usando (por ejemplo NodeJS) o del sistema operativo (alguna librería de Linux). Sea cual fuese el caso nos podemos encontrar ante una situación donde la aplicación desarrollada ande en nuestra máquina pero no en el servidor.

Este problema es eliminado al utilizar [Docker](https://www.docker.com/) ya que nos permite correr nuestra aplicación de forma aislada sin tener que preocuparnos por las dependencias.

#### Trabajar con cualquier "Stack"

Al igual que el punto anterior el aislamiento de nuestra aplicación nos permite trabajar con cualquier stack de tecnología sin tener que preocuparnos por el entorno de ejecución.

#### Mejorar la colaboración entre el equipo

Al liberar al programador del entorno de ejecución y al ofrecer una única forma de manejar las dependencias y el entorno de trabajo, [Docker](https://www.docker.com/) facilita la integración del mundo de los programadores con el mundo de los sysadmin.

## Operating-system-level virtualization

Antes de poder entender cómo funciona Docker debemos entender qué es una virtualización a nivel del sistema operativo.
[Operating-system-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) es un método de virtualización en donde el kernel de un sistema operativo permite la existencia de múltiples instancias aisladas de espacios de usuarios. Estas instancias (llamadas generalmente "contenedores") pueden sentirse como servidores reales desde el punto de vista de un usuario.

#### Diferencia entre una VM y un contenedor

<img src="./data/containers-versus-virtual-machines-docker-inc-rightscale.jpg" width="250px" style="width: 500px;"/>

Como pueden ver en la imagen, la principal diferencia entre una VM y un contenedor es que una VM no sólo necesita una copia entera de un sistema operativo, sino que también necesita una copia virtual del hardware y eso conlleva mucho procesamiento y espacio.

Por el contrario, en [Docker](https://www.docker.com/) los contenedores comparten el sistema operativo, y cuando es posible librerías y binarios, haciendo que virtualizar el hardware y el sistema operativo no sea necesario. 

#### Linux container (LXC)

Los contenedores de linux o [LXC](https://en.wikipedia.org/wiki/LXC) son una implementación de [Operating-system-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) y en ellos se basa [Docker](https://www.docker.com/) para construir todo su ecosistema.

## Beneficios de utilizar Docker

[Docker](https://www.docker.com/) es una implementación de [Operating-system-level virtualization](https://en.wikipedia.org/wiki/Operating-system-level_virtualization), aunque no es la única opción ([OpenVZ](https://en.wikipedia.org/wiki/OpenVZ), [Linux-VServer](https://en.wikipedia.org/wiki/Linux-VServer)), posee algunos beneficios por sobre las otras opciones.

[Docker](https://www.docker.com/) ofrece una capa de abstracción la cual hace que administrar distintos contenedores, sus permisos y sus redes no sea algo tan complejo. Por otro lado, la popularización del mismo hizo que su comunidad crezca, permitiéndonos encontrar documentación y ejemplos de forma fácil. También hay que destacar que existen varias empresas ([Docker](https://cloud.docker.com/), [Amazon](https://aws.amazon.com/es/docker), [Google](https://cloud.google.com/compute/docs/instance-groups/deploying-docker-containers)) que poseen servicios de hosting y deploy de contenedores. 

## Union file system

[Union file system](https://docs.docker.com/glossary/?term=Union%20file%20system) es un implementación de [Union mount](https://en.wikipedia.org/wiki/Union_mount) y es utilizado por 
[Docker](https://www.docker.com/) para generar un sistema de archivos aislado del resto de los contenedores y del host.

## Elementos de Docker

1. Host 
2. Imagen (image)
3. Red (network)
4. Contenedor (container)
5. Puerto (port)
6. Volumen (volume)

#### Host

Es el sistema operativo en el cual se montan los contenedores, puede ser nuestra máquina, el servidor productivo o hasta una máquina virtual.

#### Imagen

Las imágenes de docker pueden entenderse como una receta o si sos un programador orientado a objetos (como una clase). En sí, las imágenes son referencias a una lista de capas que representan los cambios del sistema de archivos. Estas capas pueden ser apiladas una arriba de otra partiendo siempre de un sistema de archivos principal.

<img src="./data/image-layers.jpg" width="250px" style="width: 500px;"/>

En este ejemplo, la imagen de docker está basada en un sistema de archivos (ubuntu 15.04) a partir de ahí se fueron realizando cambios (que podrían ser):

1. Instalar nodejs 6.10 (lo cual se guardó como una capa intermedia que recibió el ID *d3a1f33e8a5a*).
2. Instalar webpack de forma global (lo cual se guardó como una capa intermedia que recibió el ID *c22013c84729*).
3. Mover los archivos de mi aplicación desde el host a mi contenedor (lo cual se guardó como una capa intermedia que recibió el ID *d74508fb6632*).
4. Realizar npm install en mi proyecto (lo cual se guardó como una capa intermedia que recibió el ID *91e54dfb1179*).

Una vez construida mi imagen, puedo generar tantos contenedores como necesite y cada uno de ellos se construirán respetando los cuatro pasos del ejemplo anterior.

*Otro aspecto interesante de las imágenes es que una vez construidas pueden ser el sistema de archivos principal del cual se basan otras imágenes.*

[Ejemplo de imagen](../ejemplos/image/README.md)

#### Red

Para poder generarnos un aislamiento real, [Docker](https://www.docker.com/) debe facilitarnos una forma de controlar el acceso a los contenedores. Es por este motivo que nos permite generar redes para aislar a nuestros contenedores. Dentro de esas redes los contenedores pueden verse entre ellos pero no pueden ser accedidos desde el host.

Las buenas prácticas nos alientan a generar una red por cada proyecto que realicemos pero si estamos probando algún ejemplo o si simplemente poseemos un único proyecto, [Docker](https://www.docker.com/) nos ofrece una red genérica a la cual se asignan por default todos los contenedores que no posean una red propia.

[Ejemplo de red](../ejemplos/network/README.md)

#### Volumen

Un [volumen](https://docs.docker.com/engine/tutorials/dockervolumes/) es un directorio especialmente designado a uno o mas contenedores que anula el [Union file system](https://docs.docker.com/glossary/?term=Union%20file%20system). Estos volúmenes proveen una forma útil de persistir o compartir datos.

Los volúmenes son inicializados cuando un contenedor es creado y si el contenedor tiene datos en el punto de montaje, los mismos son copiados al volumen.

__El ejemplo se verá directamente en container__

#### Contenedor

El contenedor puede ser pensado como la instancia de la imagen, los mismos ejecutan una pieza de software y poseen todo lo necesario para correr de forma aislada (código, herramientas de sistema, librerías, configuraciones, etc). Estos podrán ser ejecutados sin importar el ambiente permitiéndonos mantener un mismo entorno de ejecución en las terminales de desarrollo y en los servidores.

Para [Docker](https://www.docker.com/) un contenedor representa la ejecución de un único servicio (por ejemplo nuestra aplicación nodejs), ese servicio es ejecutado en la inicialización del contenedor. Es por este motivo que si por alguna razón el servicio en cuestión deja de funcionar también lo hará el contenedor que lo aloja.

[Ejemplo de contenedor](../ejemplos/container/README.md)

#### Puerto

Como mencionamos anteriormente los contenedores se encuentran aislados en su propia red, lo que hace necesario poseer un sistema de acceso a los mismos desde el host.

Gracias a la apertura de puertos que nos ofrece [Docker](https://www.docker.com/), podemos definir a través de que puertos se puede acceder a un contenedor en particular.

[Ejemplo de puerto](../ejemplos/port/README.md)

__Beneficios:__

1. Los volúmenes puedes compartir datos y ser reusados entre contenedores
2. Los cambios a los datos dentro de un volumen son realizados inmediatamente
3. Los cambios a los datos dentro de un volumen no son actualizados en la imagen
4. Los datos de un volumen persisten por mas que se elimine el contenedor

## Entornos

[Docker](https://www.docker.com/) funciona en algunos aspectos como lo hace [Git](https://git-scm.com/) ya que nos permite mantener un repositorio local de imágenes o acceder a un [repositorio externo](https://hub.docker.com/) (que puede ser privado o público). También podemos realizar cambios en nuestras imágenes y realizar commit de los mismos.

