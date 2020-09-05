import { APP_DEFAULT_COLORS } from '../constants';

export const getTransactionTypeColor = (transactionClassification: string) => {
    switch (transactionClassification.toUpperCase()) {
        case 'EXPENSE':
            return APP_DEFAULT_COLORS.EXPENSE;
        case 'SAVING':
            return APP_DEFAULT_COLORS.SAVING;
        default:
            return APP_DEFAULT_COLORS.DEFAULT;
    }
}