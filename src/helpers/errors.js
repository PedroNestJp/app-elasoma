import * as Sentry from '@sentry/react-native';

export const catchError = (error, path) => {
  Sentry.captureException(error);
};
