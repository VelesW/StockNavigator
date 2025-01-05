# Wybieramy obraz Node.js dla trybu deweloperskiego
FROM node:18-alpine

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki zależności i instalujemy pakiety
COPY package.json package-lock.json ./
RUN npm install

# Kopiujemy resztę kodu źródłowego
COPY . .

# Start serwera deweloperskiego
CMD ["npm", "start"]

# Otwieramy port 3000
EXPOSE 3000
