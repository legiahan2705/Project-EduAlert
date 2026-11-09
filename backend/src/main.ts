import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS cho phép Next.js Frontend truy cập
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`🚀 [EduAlert NestJS Backend] is running on: http://localhost:${PORT}`);
  console.log(`📁 [Database] Persistence JSON file at: data/db.json`);
}
bootstrap();
