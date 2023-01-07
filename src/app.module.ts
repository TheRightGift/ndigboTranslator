import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as connectionOptions from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/Exception-Filters/http-exception.filter';
import { ModelExceptionFilter } from './common/Exception-Filters/model-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TranslateModule } from './translate/translate.module';
import { OgimageModule } from './ogimage/ogimage.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '.well-known/pki-validation'),
			serveRoot: '/.well-known/pki-validation'
		}),
		// ServeStaticModule.forRoot({rootPath: '/media/avatar', serveRoot: '/avatar'}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RouterModule.forRoutes(routes),
		ScheduleModule.forRoot(),
		// TypeOrmModule.forRoot(connectionOptions),
		EventEmitterModule.forRoot({
			wildcard: true,
			delimiter: '.',
		}),
		TranslateModule,
		OgimageModule,
	],
	providers: [
		{
		provide: APP_FILTER,
		useClass: HttpExceptionFilter,
		},
		{
		provide: APP_FILTER,
		useClass: ModelExceptionFilter,
		},
	],
})
export class AppModule {}
