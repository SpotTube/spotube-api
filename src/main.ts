declare const module: any;
import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

// import { RedisIoAdapter } from './adapter/socket-redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.enableCors({ allowedHeaders: '*', exposedHeaders: '*' });
  // app.useWebSocketAdapter(new SocketIoAdapter(app, true));

  const configService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT'));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
