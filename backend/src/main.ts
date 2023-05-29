import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //prefix 는 static파일앞에 /media를 붙여준다.
  // app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
  //   prefix: '/media',
  // });

  // CORS 설정
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
