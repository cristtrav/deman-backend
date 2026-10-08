import { Global, Module } from "@nestjs/common";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { TypeORMTransactionManager } from "./typeorm-transaction.manager";

@Global()
@Module({
    providers: [
        {
            provide: TransactionManager,
            useClass: TypeORMTransactionManager
        }
    ],
    exports: [TransactionManager]
})
export class TransactionModule {}
