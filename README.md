# Node.js Data Generator and Processor
This project consists of a Node.js script that generates random data and another script that processes the generated data into a JSON format. Docker is used to containerize the project for easy execution.

## Setup
Clone this repository to your local machine.

```
git clone https://github.com/EhabLama/object-generator.git
```

Change your current directory to the root of the cloned repository.
```
cd object-generator
```

## Running with Docker
Build the Docker image using the provided Dockerfile.

```
docker build -t node-object-generator .
```

Execute the Docker container to generate and process data.

```
docker run -v $(pwd)/output:/app/output node-object-generator
```

This command mounts the local output directory to the /app/output directory inside the container, ensuring that the generated data is saved to your local machine.

## Check Output 
After the execution completes, you will find the processed data in the output directory of your local machine.
