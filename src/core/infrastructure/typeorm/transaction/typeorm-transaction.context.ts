import { AsyncLocalStorage } from "async_hooks";
import { EntityManager, ObjectLiteral, Repository } from "typeorm";

/**
 * Mantiene el EntityManager de la transacción en curso para el flujo asíncrono actual,
 * de modo que los repositorios lo usen sin recibirlo como parámetro.
 */
export class TypeORMTransactionContext {
    private static readonly storage = new AsyncLocalStorage<EntityManager>();

    static run<T>(manager: EntityManager, work: () => Promise<T>): Promise<T> {
        return this.storage.run(manager, work);
    }

    static get manager(): EntityManager | undefined {
        return this.storage.getStore();
    }

    /**
     * Devuelve el repositorio ligado a la transacción en curso, o el recibido si no hay transacción.
     */
    static repository<T extends ObjectLiteral>(repository: Repository<T>): Repository<T> {
        const manager = this.manager;
        return manager ? manager.getRepository(repository.target) : repository;
    }
}
