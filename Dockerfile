FROM node:20

WORKDIR /app

# Install Playwright dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

# Install Playwright browsers
RUN npx playwright install chromium

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
