import express from 'express';
import Schema from './graphql/schema';
import Resolvers from './graphql/Resolvers';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { getAuthRouter } from './routes/authRouter';
import { ApolloServer, BaseContext } from '@apollo/server';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerJsDoc from './swagger_output.json';
import swaggerUi from 'swagger-ui-express';
import router from './routes/router';
import { PORT, baseUrl, logger, db } from './config/config';
import { configurePassportMiddlewares } from './config/passportConfig';
import { verifyAccount } from './controller/authControllers';


async function expressApp() {

    const app = express();

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests' // message to send
    });

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            return callback(null, true);
        }
    }));
    app.use(helmet());
    app.use(limiter);
    app.use(express.json({ limit: '10kb' }));
    configurePassportMiddlewares();


    app.use("/api/auth", getAuthRouter());
    app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
    // app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDocs))

    app.use('/api/v1', router);

    const server = new ApolloServer<BaseContext>({
        typeDefs: Schema,
        resolvers: Resolvers,
        includeStacktraceInErrorResponses:false
       
    });
    await server.start()
    app.use('/api/v1/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
        context: async ({ req, res }) => {
            const user = verifyAccount(req, res);
            return {user} 
        },
    }));
    app.listen(PORT, () => console.log('Server is running @ ' + baseUrl));

}

expressApp()