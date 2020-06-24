import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionRequest): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid Transaction type');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total - value < 0) {
        throw new Error('Insuficient money');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
