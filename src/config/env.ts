import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    DATABASE_URL: string;
    // PRODUCTS_HOST_MICROSERVICE: string;
    // PRODUCTS_PORT_MICROSERVICE: number;
    NATS_SERVERS: string[]
}


const envSchema = joi.object({
  
     PORT: joi.number().required(),
    //  PRODUCTS_HOST_MICROSERVICE:  joi.string().required(),
    //  PRODUCTS_PORT_MICROSERVICE:  joi.number().required()
     NATS_SERVERS: joi.array().items( joi.string() ).required(),
    //  DATABASE_URL: joi.string().required()
})
.unknown(true);

const { error, value } = envSchema.validate({ 
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if ( error ) {
     throw new Error(`config validation error ${ error.message }`)
}


const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS,
    // hostMicroservice:  envVars.PRODUCTS_HOST_MICROSERVICE,
    // portMicroservice:  envVars.PRODUCTS_PORT_MICROSERVICE
    // databaseUrl: envVars.DATABASE_URL
}





