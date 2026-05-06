# MovieAI — Retrieval-Augmented Generation

A movie recommendation system that uses RAG to answer natural language queries about films. Instead of relying on the LLM's training data alone, it retrieves relevant movie data from a vector database and feeds it as context to generate grounded responses.

Ask something like "recommend a sci-fi film with a twist" and the system finds the closest matching movies from its database before generating an answer.

## How it works

1. **Seeding** — movie descriptions from `content.js` are converted into vector embeddings using OpenAI's `text-embedding-ada-002` model and stored in Supabase (pgvector)
2. **Query** — when a user asks a question, their input is embedded using the same model
3. **Retrieval** — Supabase's `match_movies` RPC function performs cosine similarity search against stored embeddings to find the most relevant movies
4. **Generation** — the matched movie data is passed as context to OpenAI's chat completion API, which generates a natural response grounded in actual movie info

## Files

```
├── config.js            # OpenAI + Supabase client setup
├── content.js           # movie dataset (titles, descriptions, ratings)
├── seedMovies.js        # generates embeddings and inserts into Supabase
├── retrieveContext.js    # embedding + similarity search logic
├── index.html           # frontend
├── index.css            # styling
├── movies.txt           # raw movie data
├── package.json
└── .gitignore
```

## Setup

```bash
npm install
```

Create a `.env` file:

```
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-anon-key
```

You'll need a Supabase project with pgvector enabled and a `movies` table with an `embedding` column. Create a `match_movies` SQL function for similarity search.

Seed the database:

```bash
node seedMovies.js
```

Run the app:

```bash
npm run dev
```

## Dataset

9 movies including Avatar: The Way of Water, Everything Everywhere All at Once, Oppenheimer, Barbie, Spider-Verse, and others. Each entry has title, release year, runtime, plot summary, director, cast, and IMDB rating — all embedded as a single content string.

## Tech

JavaScript, OpenAI API (embeddings + chat), Supabase (pgvector), Vite
