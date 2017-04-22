## Manejos de archivos en NodeJS

La API de NodeJS nos ofrece métodos para acceso a archivos. 

[Documentación](https://nodejs.org/api/fs.html)

## Métodos que utilizaremos en clase

### fs.writeFile

```
fs.writeFile(file, data[, options], callback)
	file <string> | <Buffer> | <integer> filename or file descriptor
	data <string> | <Buffer> | <Uint8Array>
	options <Object> | <string>
		encoding <string> | <null> default = 'utf8'
		mode <integer> default = 0o666
		flag <string> default = 'w'
	callback <Function>
```

Como vemos en la documentación, el método recibe el path del archivo, el string a esscribir, un objeto de opciones y un callback.

Como el objecto de opciones es opcional sólo le pasamos file, data, y callback;

#### Ejemplo

```javascript
// Escribir en el archivo 'hello.txt'
fs.readFile('hello.txt', 'Hello World!!!', err => {
  if (err) {
    return console.log('No se pudo abrir el archivo hello.txt');
  }
	console.log('Se guardo el archivo Hello World!!!');
});
```

### fs.readFile

```
fs.readFile(file[, options], callback)
	file <string> | <Buffer> | <integer> filename or file descriptor
	options <Object> | <string>
		encoding <string> | <null> default = null
		flag <string> default = 'r'
	callback <Function>
```
Como vemos en la documentación, el método recibe el path del archivo, un objeto de opciones y un callback.

Como el objecto de opciones es opcional sólo le pasamos file, data, y callback;

#### Ejemplo

```javascript
// Leer el archivo de people.json
fs.readFile('../data/people.json', 'utf-8', (err, data) => {
  if (err) {
    return console.log('No se pudo leer el archivo ../data/people.json');
  }
});
```