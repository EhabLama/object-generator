FROM node:14

WORKDIR /app

COPY generator.js .
COPY consumer.js .

# Create the output directory
RUN mkdir -p /app/output/raw

# Command to run both programs sequentially
CMD ["sh", "-c", "node generator.js && node consumer.js"]