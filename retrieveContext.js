import 'dotenv/config';
import { openai, supabase } from './config.js';

const query = "Movie about indian agent"
main(query)

async function main(input) {
  const embedding = await createEmbedding(input);
  const match = await findNearestMatch(embedding);
  console.log(match)
//   await getChatCompletion(match, input);
}


async function createEmbedding(input){
    console.log("Creating embedding")
    const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: input
    })
    return embeddingResponse.data[0].embedding
}

async function findNearestMatch(embedding){
    console.log("Finding match")
    const { data, error } = await supabase.rpc('match_movies', {
      query_embedding: embedding,
      match_threshold: 0.10,
      match_count: 5,
    })

    console.log("data:", data)
    console.error("error:", error)
    return data
}


