import { COLOR_TRANSACTION_TYPE_CLASSIFICATION } from '../constants';

export const getTransactionTypeColor = (transactionClassification: string) => {
    switch (transactionClassification.toUpperCase()) {
        case 'EXPENSE':
            return COLOR_TRANSACTION_TYPE_CLASSIFICATION.EXPENSE;
        case 'SAVING':
            return COLOR_TRANSACTION_TYPE_CLASSIFICATION.SAVING;
        default:
            return COLOR_TRANSACTION_TYPE_CLASSIFICATION.DEFAULT;
    }
}