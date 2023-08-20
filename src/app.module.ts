import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
}),

MongooseModule.forRootAsync({
  imports: [ConfigModule], 
  useFactory: (config: ConfigService) => { 
    const username = config.get("DB_USER");
    const password = config.get("DB_PASSWORD");
    const host = config.get("DB_HOST");
    const port = config.get("DB_PORT");
    const db = config.get("DB_NAME");

    const isLocal = config.get("NODE_ENV") === "LOCAL";

    const uri = isLocal
      ? `mongodb://localhost:${port}/${db}`
      : `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

    return {
      uri,
    };
  },
  inject: [ConfigService],
}),
    UserModule,
    AuthModule,
    PaymentModule,
    
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
