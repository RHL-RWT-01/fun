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
// This code connects to a Kafka consumer, subscribes to the "test-topic" topic, and starts consuming messages.
// It logs each received message along with its topic and partition.
// The consumer is set to run indefinitely, allowing it to continuously process incoming messages.
// The code uses the KafkaJS library to interact with Kafka, and it logs the status of the connection and message consumption process.
// The consumer is part of the "test-group" consumer group, which allows for load balancing and fault tolerance.
// The consumer will start consuming messages from the beginning of the topic, ensuring it processes all existing messages.