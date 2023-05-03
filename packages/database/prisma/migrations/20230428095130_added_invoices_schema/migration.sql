-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "stripe_invoice_id" TEXT NOT NULL,
    "billing_customer_id" TEXT NOT NULL,
    "invoice_status" TEXT NOT NULL,
    "due_date" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "plan_name" TEXT,
    "period_end_date" TEXT NOT NULL,
    "period_start_date" TEXT,
    "total_amount" TEXT,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);
