#!/bin/bash

# Cargar variables de entorno desde .env si existe
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Verificar que las variables necesarias estén definidas
if [ -z "$MIKROWISP_API_URL" ] || [ -z "$MIKROWISP_TOKEN" ]; then
  echo "Error: MIKROWISP_API_URL y MIKROWISP_TOKEN deben estar definidas en el archivo .env"
  exit 1
fi

# Fecha actual en formato YYYY-MM-DD
TODAY=$(date +"%Y-%m-%d")

echo "Probando creación de ticket directamente con curl a $MIKROWISP_API_URL"

# Datos para el ticket
JSON_DATA=$(cat <<EOF
{
  "token": "$MIKROWISP_TOKEN",
  "idcliente": 2,
  "asunto": "Ticket de prueba desde curl",
  "contenido": "Este es un ticket de prueba creado desde curl",
  "dp": 1,
  "prioridad": 2,
  "fechavisita": "$TODAY",
  "turno": "TARDE",
  "agendado": "PAGINA WEB",
  "solicitante": "Test User"
}
EOF
)

echo "Datos a enviar:"
echo "$JSON_DATA"

# Realizar la solicitud con curl
curl -v -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON_DATA" \
  "$MIKROWISP_API_URL/api/v1/NewTicket"

echo -e "\n\nPrueba completada." 