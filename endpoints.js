{
  "info": {
    "_postman_id": "a7b1e5b0-2348-4e61-bfd9-832b59f70b50",
    "name": "API NodeJS MongoDB",
    "description": "Colección de endpoints para Usuarios, Pagos y Lecturas (Node.js + MongoDB)",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Usuarios",
      "item": [
        {
          "name": "Listar usuarios",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/usuarios",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "usuarios"]
            }
          }
        },
        {
          "name": "Obtener usuario por ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/usuarios/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "usuarios", "63f2f1d1a2b3c4d5e6f7890a"]
            }
          }
        },
        {
          "name": "Crear usuario",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombre\": \"Diego\",\n  \"edad\": 22,\n  \"fechanacimiento\": \"2001-07-14\",\n  \"email\": \"dapariciocastro13@gmail.com\"\n}"
            },
            "url": {
              "raw": "http://localhost:5040/api/usuarios",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "usuarios"]
            }
          }
        }
      ]
    },
    {
      "name": "Pagos",
      "item": [
        {
          "name": "Listar pagos",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/pagos",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "pagos"]
            }
          }
        },
        {
          "name": "Obtener pago por usuario",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/pagos/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "pagos", "63f2f1d1a2b3c4d5e6f7890a"]
            }
          }
        },
        {
          "name": "Crear nuevo pago",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"usuarioId\": 1,\n  \"monto\": 100,\n  \"fechaPago\": \"2026-01-29T12:00:00Z\"\n}"
            },
            "url": {
              "raw": "http://localhost:5040/api/pagos",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "pagos"]
            }
          }
        }
      ]
    },
    {
      "name": "Lecturas",
      "item": [
        {
          "name": "Generar lectura principal",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/lecturas/principal/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "lecturas", "principal", "1"]
            }
          }
        },
        {
          "name": "Generar lectura diaria",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/lecturas/diaria/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "lecturas", "diaria", "1"]
            }
          }
        },
        {
          "name": "Obtener lecturas de un usuario",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/lecturas/usuario/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "lecturas", "usuario", "1"]
            }
          }
        },
        {
          "name": "Obtener lectura por ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5040/api/lecturas/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5040",
              "path": ["api", "lecturas", "63f2f1d1a2b3c4d5e6f7890a"]
            }
          }
        }
      ]
    }
  ]
}
