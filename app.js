import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'));
app.use((req, res, next) => {
  const locals = {
    title: 'New title',
  };

  ssrHandler(req, res, next, locals);
});

console.log("Server Listen ...")
app.listen(process.env.PORT || 80);