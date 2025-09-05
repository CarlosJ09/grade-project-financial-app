class PaymentMethod {
  constructor(
    public readonly id: number,
    public readonly paymentMethod: string, // Enum for payment method types
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { PaymentMethod };
