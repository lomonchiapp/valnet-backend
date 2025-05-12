# Documentación de la API de MikroWisp

## Endpoint de Facturas

### GET /api/v1/GetInvoices

Este endpoint permite obtener una lista de facturas con filtros opcionales.

#### Parámetros de consulta:

- `page` (número): Página a mostrar. Por defecto: 1.
- `limit` (número): Límite de facturas a mostrar. Por defecto: 15.
- `cliente` (string): Filtrar por nombre de cliente.
- `estado` (número): Filtrar por estado de la factura.
  - 0 = Pagadas
  - 1 = No pagadas
  - 2 = Anuladas
  - 3 = Otro estado
  - vacío = Cualquier estado
- `fechaInicio` (string): Fecha de inicio en formato YYYY-MM-DD.
- `fechaFin` (string): Fecha de fin en formato YYYY-MM-DD.

#### Ejemplo de uso:

```
GET /api/v1/GetInvoices?limit=25&estado=1
```

### POST /api/v1/GetInvoices

Este endpoint permite obtener una lista de facturas con filtros más específicos enviados en el cuerpo de la solicitud.

#### Parámetros del cuerpo (JSON):

- `token` (string, opcional): Token de acceso a la API. Si no se proporciona, se usará el configurado en el servidor.
- `limit` (número): Límite de facturas a mostrar. Por defecto: 25.
- `estado` (número): Filtrar por estado de la factura.
  - 0 = Pagadas
  - 1 = No pagadas
  - 2 = Anuladas
  - 3 = Otro estado
- `idcliente` (número): Filtrar por ID de cliente.
- `fechapago` (string): Fecha cuando fue pagada la factura en formato YYYY-MM-DD.
- `formapago` (string): Forma de pago/pasarela de pago.

#### Ejemplo de uso:

```json
POST /api/v1/GetInvoices
Content-Type: application/json

{
  "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
  "limit": 25,
  "estado": 3,
  "idcliente": 6,
  "fechapago": "2021-08-09",
  "formapago": "Efectivo Oficina/Sucursal"
}
```

#### Respuesta exitosa:

```json
{
  "success": true,
  "data": {
    "estado": "exito",
    "facturas": [
      {
        "id": 210,
        "legal": 0,
        "idcliente": 6,
        "emitido": "2019-05-04",
        "vencimiento": "2019-05-10",
        "total": "343.75",
        "estado": "vencido",
        "cobrado": "0.00",
        "impuesto": "52.61",
        "barcode_cobro_digital": "73852040377595616051900361438",
        "fechapago": "0000-00-00",
        "subtotal": "291.14",
        "subtotal2": "S/. 291.14",
        "total2": "S/. 343.75",
        "impuesto2": "S/. 52.61",
        "formapago": ""
      },
      // ... más facturas
    ]
  }
}
```

## Endpoint de Tickets

### POST /api/v1/NewTicket

Este endpoint permite crear un nuevo ticket de soporte en MikroWisp.

#### Parámetros del cuerpo (JSON):

> **Importante**: Todos los campos marcados como requeridos DEBEN estar presentes en la solicitud, sin valores por defecto, para que la API acepte la solicitud correctamente.

- `token` (string, opcional): Token de acceso a la API. Si no se proporciona, se usará el configurado en el servidor.
- `idcliente` (número, requerido): ID del cliente que crea el ticket.
- `asunto` (string, requerido): Asunto o título del ticket.
- `contenido` (string, requerido): Contenido o descripción del ticket.
- `dp` (número, requerido): ID del departamento al que se asigna el ticket. Por defecto: 1 (Soporte Técnico).
- `prioridad` (número, opcional): Nivel de prioridad del ticket.
  - 1 = Baja
  - 2 = Media
  - 3 = Alta
- `fechavisita` (string, requerido): Fecha de visita en formato YYYY-MM-DD.
- `turno` (string, requerido): Turno de visita. Valores aceptados: "MAÑANA", "TARDE".
- `agendado` (string, requerido): Medio por el que se agendó el ticket. Valores aceptados: "PAGINA WEB", "TELEFONO", "PRESENCIAL", "OFICINA", "CLIENTE", "RED SOCIAL".
- `solicitante` (string, opcional): Nombre de la persona que solicita el ticket si no es el mismo cliente.
- `adjunto` (objeto, opcional): Archivo adjunto al ticket.
  - `nombre` (string): Nombre del archivo.
  - `file` (string): Contenido del archivo codificado en Base64.

#### Ejemplo de uso:

```json
POST /api/v1/NewTicket
Content-Type: application/json

{
  "token": "Smx2SVdkbUZIdjlCUlkxdFo1cUNMQT09",
  "idcliente": 33,
  "dp": 1,
  "asunto": "Problema con la conexión",
  "contenido": "Desde ayer no tengo conexión a internet. Por favor, ayúdenme a resolver este problema.",
  "fechavisita": "2023-05-20",
  "turno": "TARDE",
  "agendado": "PAGINA WEB",
  "solicitante": "Juan Pérez"
}
```

#### Respuesta exitosa:

```json
{
  "estado": "exito",
  "idticket": 100,
  "mensaje": "Ticket Registrado correctamente."
}
```

#### Errores comunes:

- **400 Bad Request**: Falta algún campo requerido.
  ```json
  {
    "estado": "error",
    "mensaje": "Falta un campo requerido (asunto,fechavisita,turno,agendado ó contenido)."
  }
  ```

- **500 Internal Server Error**: Error interno del servidor MikroWisp.

### Notas de implementación

1. **Campos requeridos**: La API de MikroWisp requiere que todos los campos marcados como requeridos estén presentes en la solicitud. No proporciona valores por defecto para estos campos.

2. **Formato de fecha**: El formato correcto para `fechavisita` es YYYY-MM-DD.

3. **Valores para turno**: Usar "MAÑANA" o "TARDE" (con tilde en la Ñ).

4. **Valores para agendado**: Usar alguno de los valores aceptados: "PAGINA WEB", "TELEFONO", "PRESENCIAL", etc.

## Notas importantes

1. El token de acceso debe configurarse en las variables de entorno como `MIKROWISP_TOKEN`.
2. La URL base de la API debe configurarse en las variables de entorno como `MIKROWISP_API_URL`.
3. Todos los endpoints requieren autenticación mediante el token.
4. Los errores devuelven un código de estado HTTP apropiado y un mensaje descriptivo. 