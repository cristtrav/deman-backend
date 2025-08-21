export abstract class BaseUseCase<Q, R>{
   abstract execute(input: Q): Promise<R>;
}