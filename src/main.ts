import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';

const port = process.env.PORT || 8000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
            .setTitle('NestyBlog')
            .setDescription('Yeah nah don\'t be silly description is a foolish thing')
            .setBasePath('/')
            .addBearerAuth('Authorization', 'header')
            .setVersion('∞')
            .addTag('#nesty')
            .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
