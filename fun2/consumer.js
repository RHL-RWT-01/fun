import kafka from "./client.js";

async function consume() {
    const consumer = kafka.consumer({ groupId: "test-group" });
    console.log("Connecting to Kafka consumer...");
    await consumer.connect();
    console.log("Connected to Kafka consumer");

    console.log("Subscribing to topic 'test-topic'...");
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

    console.log("Starting message consumption...");
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()} from topic: ${topic}, partition: ${partition}`);
        },
    });

    // Keep the consumer running
    console.log("Consumer is running. Press Ctrl+C to exit.");
}
consume().then(() => {
    console.log("Consumer operation complete");
}).catch((error) => {
    console.error("Error during consumer operation:", error);
});