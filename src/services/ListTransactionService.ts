import TransactionsRepository, {
  Balance,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ResponseTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  execute(): ResponseTransactions {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const response: ResponseTransactions = {
      transactions,
      balance,
    };

    return response;
  }
}

export default ListTransactionService;
