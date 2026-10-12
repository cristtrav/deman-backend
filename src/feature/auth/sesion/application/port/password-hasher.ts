export abstract class PasswordHasher {
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hash: string): Promise<boolean>;
    // Consume el mismo tiempo que compare() cuando no existe un hash contra el cual comparar
    abstract simularComparacion(password: string): Promise<void>;
}
