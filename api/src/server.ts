import { createServer, Server } from 'http';
import app from './app';
import config from './config';

async function bootstrap() {
  const server: Server = createServer(app);
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
}

bootstrap();