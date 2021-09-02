import cors from 'cors';

const corsOptions = {
  origin(_origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow from all origins
    callback(null, true);
  },
  methods: ['PUT', 'GET', 'POST', 'HEAD', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};

export default cors(corsOptions);
