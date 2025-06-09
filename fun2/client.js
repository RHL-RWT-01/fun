import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "admin",
    brokers: ["172.23.208.1:9092"],
})

export default kafka;