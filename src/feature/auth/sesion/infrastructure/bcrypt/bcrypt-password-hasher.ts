import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PasswordHasher } from '@feature/auth/sesion/application/port/password-hasher';

// Debe coincidir con el costo usado al crear usuarios para que simularComparacion() tarde lo mismo
const SALT_ROUNDS = 10;

export class BcryptPasswordHasher implements PasswordHasher {
    private hashFicticio?: Promise<string>

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

    async simularComparacion(password: string): Promise<void> {
        this.hashFicticio ??= bcrypt.hash(randomBytes(16).toString('hex'), SALT_ROUNDS)
        await bcrypt.compare(password, await this.hashFicticio)
    }
}
