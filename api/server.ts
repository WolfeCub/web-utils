import express, { Application, Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import { IMonkManager, ICollection } from 'monk';
import { nanoid } from 'nanoid';
import ShortenedUrl from '@shared/shortenedUrl'

const db = require('monk')('localhost/utils')
const urls: ICollection = db.get('urls')

const app: Application = express();

app.use(express.static('../ui/dist/'))
app.use(express.json());

const urlSchema = Joi.object({
    url: Joi.string().uri().required(),
    slug: Joi.string()
});

app.get('/s/:id', async (req: Request, res: Response) => {
    const { id: slug } = req.params;

    if (!slug) throw new Error('Invalid slug');

    const response: ShortenedUrl = await urls.findOne({slug: slug});

    return res.redirect(response.url);
});

app.post('/api/shortener/new', async (req: Request, res: Response, next: NextFunction) => {
    try {
        var body: ShortenedUrl = await urlSchema.validateAsync(req.body);
    } catch (err) {
        return next(err);
    }

    if (!body.slug) body.slug = nanoid();

    await urls.insert(body)
    return res.json(body);
});

app.listen(process.env.PORT, () => console.log(`Server starting on port ${process.env.PORT}`));

