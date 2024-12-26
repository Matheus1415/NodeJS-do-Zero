import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DataBasePostgres {
    #videos = new Map();

    async list(search) {
        let video;
        search? video = await sql`SELECT * FROM videos WHERE title iLike ${'%'+search+'%'}`: video = await sql`SELECT * FROM videos`;
        return video;
    }

    async create(video) {
        const videoId = randomUUID();
        const {title, description, duration} = video
        await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title} ,${description}, ${duration})`;
    }

    async update(id, video) {
        const {title, description, duration} = video
        await sql`UPDATE videos SET title=${title}, description=${description}, duration=${duration} WHERE id = ${id}`;
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`;
    }

}