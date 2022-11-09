import { createParamDecorator } from '@nestjs/common';

//help to get request user of the data
export const GetUser = createParamDecorator((data, req) => {
  return req.user;
});
