export interface JwtStrategyInterface {
    validate(payload: Record<string, string>): Promise<Record<string, string>>;
}