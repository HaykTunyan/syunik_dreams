import "server-only";

/**
 * PaymentProvider — the interface every payment adapter must implement.
 * Design target: Stripe, Idram, AmeriaBank vPOS, and any future gateway.
 */
export interface PaymentIntent {
  externalId:  string;
  status:      "pending" | "succeeded" | "failed";
  amount:      number;
  currency:    string;
  redirectUrl?: string;
  metadata:    Record<string, unknown>;
}

export interface CreatePaymentOptions {
  orderId:     string;
  orderNumber: string;
  amount:      number; // in AMD
  currency:    string;
  description: string;
  returnUrl:   string; // where to redirect after payment
  customerEmail: string;
}

export interface VerifyWebhookOptions {
  rawBody:   string;
  signature: string;
  secret:    string;
}

export interface PaymentProvider {
  readonly name: string;

  /**
   * Create a payment intent / initiate a checkout session.
   * Returns a PaymentIntent with an optional redirectUrl for hosted-page flows.
   */
  createPayment(opts: CreatePaymentOptions): Promise<PaymentIntent>;

  /**
   * Verify an incoming webhook and return the resolved payment status.
   * Throws if signature is invalid.
   */
  verifyWebhook(opts: VerifyWebhookOptions): Promise<{
    externalId: string;
    status:     "succeeded" | "failed" | "pending";
    orderId:    string;
  }>;
}
