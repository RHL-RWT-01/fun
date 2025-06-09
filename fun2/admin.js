import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "admin",
    brokers: ["http://localhost:9092"],
})

async function init(params) {
    const admin = kafka.admin();
    console.log("Connecting to Kafka admin...");
    await admin.connect();
    console.log("Connected to Kafka admin");
}