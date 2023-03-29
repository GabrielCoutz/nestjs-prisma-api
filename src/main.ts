import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('E-commerce RESTfull API')
    .setDescription(
      'Essa API foi desenvolvida com a intenção de providenciar um maior conhecimento e domínio das tecnologias utilizadas. <br><br> É possível realizar o cadastro de usuários, alterar seus dados, cadastrar produtos e alterá-los. Tudo conforme os verbos do CRUD. <br><br> Este projeto foi desenvolvido por mim, <a href="https://www.linkedin.com/in/gabrielcoutz/" target="_blank">Gabriel Coutinho</a>, e este é o repositório do mesmo: <a href="https://github.com/GabrielCoutz/nestjs-prisma-api" target="_blank">https://github.com/gabrielcoutz<a>',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('products')
    .addTag('login')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
