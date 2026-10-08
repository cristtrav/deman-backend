import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TransactionManager } from "@core/application/transaction/transaction-manager";
import { TypeORMTransactionContext } from "./typeorm-transaction.context";

@Injectable()
export class TypeORMTransactionManager extends TransactionManager {

    constructor(private readonly dataSource: DataSource) { super(); }

    run<T>(work: () => Promise<T>): Promise<T> {
        if(TypeORMTransactionContext.manager) return work();
        return this.dataSource.transaction(manager => TypeORMTransactionContext.run(manager, work));
    }
}
