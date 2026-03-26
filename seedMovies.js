import 'dotenv/config';
import movies from './content.js'
import { openai, supabase } from './config.js';

async function createEmbedding(movies) {
    try {
        const data = await Promise.all(movies.map(async (movie) => {
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: movie.content
            })
            return {
                title: movie.title,
                release_year: movie.releaseYear,
                content: movie.content,
                embedding: embeddingResponse.data[0].embedding
            }
        }))
        const { error } = await supabase.from('movies').insert(data)

        if (error) {
            console.error("Supabase insert error:", error)
            throw error
        }
        console.log("Inserted rows:", data)
        console.log("SUCCESS")
    } catch (err) {
        console.error("Full error:", err)
    }

}

createEmbedding(movies)

