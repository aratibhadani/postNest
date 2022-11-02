import { DocumentBuilder } from '@nestjs/swagger';

const swaggerTags = {
  user: 'user',
  root: '',
  auth: 'auth',
  post: 'post',
  artical: 'artical',
};
const swaggerConfig = new DocumentBuilder()
  .setTitle('post artical example')
  .setDescription('The Post API...')
  .addBearerAuth(
    {
      description: `Please enter token in following`,
      name: 'Authorization',
      bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
      scheme: 'Bearer',
      type: 'http', // I`ve attempted type: 'apiKey' too
      in: 'Header',
    },
    'authorization',
  )
  .setVersion('1.0')
  .addTag(swaggerTags.user)
  .build();

export { swaggerConfig, swaggerTags };
