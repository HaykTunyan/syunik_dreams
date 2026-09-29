import "server-only";
import type {
  PaymentProvider,
  PaymentIntent,
  CreatePaymentOptions,
  VerifyWebhookOptions,
} from "./PaymentProvider";

/**
 * MockPaymentAdapter — always succeeds instantly.
 * Used in development and for testing without a real gateway.
 * Replace with IdramAdapter or AmeriabankAdapter for production.
 */
export class MockPaymentAdapter implements PaymentProvider {
  readonly name = "MOCK";

  async createPayment(opts: CreatePaymentOptions): Promise<PaymentIntent> {
    return {
      externalId:  `mock_${opts.orderId}_${Date.now()}`,
      status:      "succeeded",
      amount:      opts.amount,
      currency:    opts.currency,
      redirectUrl: opts.returnUrl + "?payment=success",
      metadata:    { orderId: opts.orderId, mock: true },
    };
  }

  async verifyWebhook(opts: VerifyWebhookOptions): Promise<{
    externalId: string;
    status:     "succeeded" | "failed" | "pending";
    orderId:    string;
  }> {
    // In mock mode, parse the body directly — no signature verification
    const body = JSON.parse(opts.rawBody) as {
      externalId: string;
      orderId:    string;
      status:     "succeeded" | "failed" | "pending";
    };
    return {
      externalId: body.externalId,
      status:     body.status ?? "succeeded",
      orderId:    body.orderId,
    };
  }
}

/**
 * TODO: IdramAdapter — Armenian Idram gateway
 * Implement when Idram credentials are available:
 * - EDP_MERCHANT_ID, EDP_SECRET_KEY env vars
 * - createPayment: build form-post redirect URL
 * - verifyWebhook: verify HMAC-MD5 of response
 */

/**
 * TODO: AmeriabankVposAdapter — AmeriaBank vPOS
 * Implement when AmeriaBank credentials are available:
 * - AMERIABANK_CLIENT_ID, AMERIABANK_USERNAME, AMERIABANK_PASSWORD env vars
 * - createPayment: call RegisterPayment SOAP/REST endpoint
 * - verifyWebhook: verify callback with ActivatePayment check
 */

// ─── Active adapter selection ─────────────────────────────────────────────────

export function getPaymentProvider(): PaymentProvider {
  // Switch on env to select the real gateway when ready:
  // if (env.PAYMENT_PROVIDER === "IDRAM") return new IdramAdapter();
  return new MockPaymentAdapter();
}
