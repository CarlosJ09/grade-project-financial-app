class PaymentMethod {
  constructor(
    public readonly id: string,
    public readonly paymentMethod: string, // Enum for payment method types
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { PaymentMethod };
