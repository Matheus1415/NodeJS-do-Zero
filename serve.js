import { fastify } from "fastify";
// import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
// const dataBase = new DataBaseMemory();
const dataBase = new DataBasePostgres();

server.get("/", () => {
  return { message: "Hello, World!" };
});

server.get("/videos", async (request, reply) => {
  const search = request.query.search;
  const video = await dataBase.list(search);

  reply
    .status(200)
    .send({ message: "Vídeo listados com sucesso!", video: video });
});

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;
  await dataBase.create({
    title,
    description,
    duration,
  });
  return reply
    .status(201)
    .send({
      message: "Vídeo criado com sucesso!",
      video: { title: title, description: description, duration: duration },
    });
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
  host:'0.0.0.0',
  port: process.env.PORT ?? 3333,
});
