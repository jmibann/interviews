#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Por favor indique la ruta del proyecto interviews"
  exit 1
fi

echo "Copiando el proyecto interviews..."

cp -R $1 .

#echo "bajando containers(falla sino están levantados)..."

docker-compose down

echo "Buildeando imágenes y levantando containers..."

docker-compose up --build


exit 0
