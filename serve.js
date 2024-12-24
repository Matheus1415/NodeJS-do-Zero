import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";

const server = fastify();
const dataBase = new DataBaseMemory();

server.get("/", () => {
  return { message: "Hello, World!" };
});

server.get("/videos", (request, reply) => {
  const video = dataBase.list();
  reply
    .status(200)
    .send({ message: "Vídeo listados com sucesso!", video: video });
});

server.post("/videos", (request, reply) => {
  const body = request.body;
  dataBase.create(body);
  return reply
    .status(201)
    .send({ message: "Vídeo criado com sucesso!", video: body });
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const body = request.body;
  dataBase.update(videoId, body);
  return reply.status(200).send({
    message: "Vídeo atualizado com sucesso!",
    video: body,
  });
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  dataBase.delete(videoId);
  return reply.status(200).send({
    message: "Vídeo deletado com sucesso!",
  });
});

server.listen({
  port: 3333,
  host: "localhost",
});
