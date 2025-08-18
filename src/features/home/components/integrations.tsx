import { Card } from "@/components/ui/card";
import * as React from "react";
import { Banknote } from "lucide-react";

export default function Integrations() {
  return (
    <section>
      <div className="py-16">
        <div className="container max-w-7xl mx-auto px-4 md:px-0">
          <div>
            <h2 className="text-3xl font-semibold text-balance md:text-4xl">
              Mudah Bayar dengan Integrasi Lengkap
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              FastDelivery mendukung berbagai metode pembayaran populer untuk
              memudahkan Anda dalam bertransaksi. Pilih cara bayar sesuai
              kebutuhan Anda.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              title="GoPay"
              description="Bayar ongkir langsung dari saldo GoPay Anda dengan cepat dan aman."
            >
              <Banknote />
            </IntegrationCard>

            <IntegrationCard
              title="OVO"
              description="Gunakan saldo OVO untuk transaksi instan tanpa ribet."
            >
              <Banknote />
            </IntegrationCard>

            <IntegrationCard
              title="DANA"
              description="Nikmati kemudahan membayar dengan aplikasi DANA, praktis dan fleksibel."
            >
              <Banknote />
            </IntegrationCard>

            <IntegrationCard
              title="ShopeePay"
              description="Bayar pesanan dengan ShopeePay untuk pengalaman seamless."
            >
              <Banknote />
            </IntegrationCard>

            <IntegrationCard
              title="Kartu Kredit / Debit"
              description="Dukungan untuk semua kartu utama seperti Visa dan Mastercard."
            >
              <Banknote />
            </IntegrationCard>

            <IntegrationCard
              title="Transfer Bank"
              description="Pembayaran melalui transfer bank dari berbagai bank di Indonesia."
            >
              <Banknote />
            </IntegrationCard>
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-secondary p-6">
      <div className="relative">
        <div className="*:size-10">{children}</div>

        <div className="mt-6 space-y-1.5">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};
