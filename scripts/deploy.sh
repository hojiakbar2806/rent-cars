#!/bin/bash

cd ~/rent_cars || exit

echo "📥 Pulling latest changes..."
git pull origin main

echo "🐳 Pulling latest Docker images..."
docker pull yourdocker/rent_cars_frontend:latest
docker pull yourdocker/rent_cars_backend:latest

echo "🚀 Restarting Docker Compose..."
docker-compose up -d