import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpSuccessInterceptor } from './common/http-success.interceptor';
import { LoggingInterceptor } from './common/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局拦截器
  app.useGlobalInterceptors(new HttpSuccessInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  const options = new DocumentBuilder()
    .setTitle('高考桥')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document);
  await app.listen(3000);
}
bootstrap();
