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
              "raw": "http://localhost:2403/api/usuario",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "usuario"]
            }
          }
        },
        {
          "name": "Obtener usuario por Email",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:2403/api/usuario/email?email=test@test.com",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "usuario", "email"],
              "query": [
                {
                  "key": "email",
                  "value": "test@test.com"
                }
              ]
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
              "raw": "{\n  \"nombre\": \"Diego\",\n  \"edad\": 22,\n  \"fechanacimiento\": \"2001-07-14\",\n  \"email\": \"test@test.com\"\n}"
            },
            "url": {
              "raw": "http://localhost:2403/api/usuario",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "usuario"]
            }
          }
        },
        {
          "name": "Activar usuario",
          "request": {
            "method": "PUT",
            "header": [],
            "url": {
              "raw": "http://localhost:2403/api/usuario/activar/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "usuario", "activar", "63f2f1d1a2b3c4d5e6f7890a"]
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
              "raw": "http://localhost:2403/api/pago",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "pago"]
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
              "raw": "{\n  \"usuarioId\": \"63f2f1d1a2b3c4d5e6f7890a\",\n  \"monto\": 50000,\n  \"descripcion\": \"Mensualidad\"\n}"
            },
            "url": {
              "raw": "http://localhost:2403/api/pago",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "pago"]
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
              "raw": "http://localhost:2403/api/lectura/principal/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "lectura", "principal", "63f2f1d1a2b3c4d5e6f7890a"]
            }
          }
        },
        {
          "name": "Obtener lecturas usuario",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:2403/api/lectura/usuario/63f2f1d1a2b3c4d5e6f7890a",
              "protocol": "http",
              "host": ["localhost"],
              "port": "2403",
              "path": ["api", "lectura", "usuario", "63f2f1d1a2b3c4d5e6f7890a"]
            }
          }
        }
      ]
    }
  ]
}
