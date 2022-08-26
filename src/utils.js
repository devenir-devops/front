
import { Logger } from 'aws-amplify';

const logger = new Logger('General-Logger', 'INFO');

const listener = (data) => {
    switch (data.payload.event) {
        case 'signIn':
            logger.info('user signed in');
            break;
        case 'signUp':
            logger.info('user signed up');
            break;
        case 'signOut':
            logger.info('user signed out');
            break;
        case 'signIn_failure':
            logger.error('user sign in failed');
            break;
        case 'tokenRefresh':
            logger.info('token refresh succeeded');
            break;
        case 'tokenRefresh_failure':
            logger.error('token refresh failed');
            break;
        case 'autoSignIn':
            logger.info('Auto Sign In after Sign Up succeeded');
            break;
        case 'autoSignIn_failure':
            logger.error('Auto Sign In after Sign Up failed');
            break;
        case 'configured':
            logger.info('the Auth module is configured');
            break;
        case 'parsingCallbackUrl':
            logger.debug('parsing callback url');
            break;
        default:
            logger.info('unknown event');
            logger.info(data.payload.event);
            break;
    }
}

export { listener, logger};
