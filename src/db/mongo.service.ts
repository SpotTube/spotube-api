import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import MongoosePaginate from '~/shared/plugins/mongoose-paginate';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const {
      HOST,
      PORT,
      USER,
      PASSWORD,
      NAME: DB,
    } = this.configService.get('DATABASE');
    const isDev = this.configService.get('IS_DEV');
    let uri = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB}?retryWrites=true&w=majority`;
    if (isDev) {
      uri = `mongodb://${USER}:${PASSWORD}@${HOST}:27017/${DB}?authSource=admin`;
    }

    console.log(uri);

    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 2000,
      connectionFactory: (connection: Connection) => {
        connection.plugin(MongoosePaginate);
        return connection;
      },
    };
  }
}
