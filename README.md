# soft

## Registro en thunder:

post http://localhost:3000/usuarios

{
  "email": "prueba1@correo.com",
  "password": "123456AB",
  "rol": "Frontend Developer",
  "lenguage": "JavaScript"
}

En terminal entrega post /usuarios + fecha (o cualquier solicitud)
+Esto proviene del middleware.js, en logRequests. 


## En sql (pgAdmin) en tabla usuarios:

select * from usaurios 
confirmar password con bcrypt funcional.
+Esto proviene del controllers.js en registerUser en el cual bcrypt hace hash (cifrado)


## Obtener token en thunder:

post http://localhost:3000/login

{
  "email": "prueba1@correo.com",
  "password": "123456AB"
}

response = token

- token tiene duración de 1 hora
Esto proviene de controllers.js en loginUser, en const token.
Se puede dejar sin expiracion con:
const token = jwt.sign({ email: user.email }, SECRET);

## Test de token en thunder:

get http://localhost:3000/usuarios

headers
Authorization Value ( "bearer "+token) 
también se puede utilizar
Auth>bearer, en campo "enter token"=token
responde=200 OK

desmarcar authorization, response=token no proporcionado
marcar authorization pero modificar token, response=token no valido
+Esta verificación proviene de middlewares.js en verifyToken.
