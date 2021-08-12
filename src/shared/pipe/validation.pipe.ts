import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { IErrorMessage } from 'src/types/Error';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors: ValidationError[] = await validate(object);

    if (errors.length > 0) {
      const errorMessage = errors.reduce((messages, error) => {
        return {
          ...messages,
          [error.property]: Object.values(error.constraints),
        };
      }, {} as IErrorMessage);
      // const sources = from(errors).pipe(
      //   map((data: ValidationError) => {
      //     return {
      //       [data.property]: Object.values(data.constraints),
      //     };
      //   }),
      // );

      // const messages = [];
      // sources.subscribe((error) => messages.push(error));
      // console.log(messages);

      throw new BadRequestException({ invalid_fields: errorMessage });
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
