export class CreateUserBankingProductRequestDto {
  constructor(
    public readonly userId: string,
    public readonly bankBankingProductId: number,
    public readonly referenceNumber: string,
    public readonly label: string,
    public readonly currencyId: number
  ) {}
}

export class UpdateUserBankingProductRequestDto {
  constructor(
    public readonly referenceNumber?: string,
    public readonly label?: string,
    public readonly currencyId?: number
  ) {}
}
