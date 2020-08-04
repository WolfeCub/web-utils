import { Application, Router, send } from 'https://deno.land/x/oak/mod.ts';
import { MongoClient } from 'https://deno.land/x/mongo@v0.9.1/mod.ts';
import Schema, { string } from 'https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts';
import nanoid from 'https://raw.githubusercontent.com/ianfabs/nanoid/master/mod.ts';

import ShortenedUrl from '@shared/shortenedUrl.ts';

const mongoClient = new MongoClient();
mongoClient.connectWithUri('mongodb://localhost:27017');
const db = mongoClient.database('utils');
const urls = db.collection<ShortenedUrl>('urls');

const router = new Router();
const app = new Application();

router.get('/s/:id', async (context) => {
  const { id: slug } = context.params;

  if (!slug) throw new Error('Invalid slug');

  const response: ShortenedUrl | null = await urls.findOne({slug: slug});

  if (!response) {
    context.response.status = 404;
  } else {
    context.response.redirect(response.url);
  }
});

const shortenRequestValidator = Schema({
  url: string.trim().normalize(),
  slug: string.trim().normalize().optional()
}).destruct();

router.post('/api/shortener/new', async (context) => {
  const [err, body] = shortenRequestValidator(await context.request.body().value)

  if (err || !body) {
    console.log(err);
    return;
  }

  if (!body.slug) body.slug = nanoid();

  await urls.insertOne(body);
  context.response.body = body;
});


app.addEventListener('error', (evt) => {
  console.log(evt.error);
});

app.use(router.routes());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `../ui/dist`,
    index: 'index.html'
  });
});

const port = 8000;
console.log(`Starting server on port ${port}`);
await app.listen({ port: port });
