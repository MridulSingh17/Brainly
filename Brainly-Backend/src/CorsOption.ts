import cors from 'cors';

const allowedOrigins = ['http://localhost:5173', 'https://brainly-teal.vercel.app/'];

export const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
