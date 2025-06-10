import kafka from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function produce() {
    const producer = kafka.producer();
    console.log("Connecting to Kafka producer...");
    await producer.connect();
    console.log("Connected to Kafka producer");
    console.log("Type anything to send a message to topic 'test-topic'. Type 'exit' to quit.");

    rl.setPrompt(">");
    rl.prompt();

    rl.on("line", async (line) => {
        if (line.trim().toLowerCase() === "exit") {
            rl.close();
            await producer.disconnect();
            console.log("Disconnected from Kafka producer");
            process.exit(0);
        }

        const message = {
            name: "test",
            age: 20,
            city: "Indore",
            country: "India",
            input: line,
            timestamp: new Date().toISOString(),
        };

        try {
            await producer.send({
                topic: "test-topic",
                messages: [
                    {
                        key: "topic-1",
                        value: JSON.stringify(message),
                    },
                ],
            });
            console.log("Message sent:", message);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        rl.prompt();
    });
}

produce().catch((error) => {
    console.error("Error during producer operation:", error);
    process.exit(1);
});
