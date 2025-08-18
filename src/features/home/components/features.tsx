import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Features() {
  return (
    <section>
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-0">
          <div>
            <h2 className="text-foreground text-4xl font-semibold">
              Fitur Unggulan FastDelivery
            </h2>
            <p className="text-muted-foreground mt-4 mb-12 text-lg text-balance">
              Nikmati pengalaman pengiriman yang cepat, aman, dan transparan.
              Dari cek ongkir hingga tracking real-time, FastDelivery siap
              membantu setiap kebutuhan logistik Anda.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden pt-0">
                <div className="relative aspect-video">
                  <Image
                    src="/form.png"
                    alt="image"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Cek Ongkir Instan
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Masukkan alamat penjemputan dan tujuan untuk mengetahui biaya
                  pengiriman secara langsung.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden pt-0">
                <div className="relative aspect-video">
                  <Image
                    src="/time.png"
                    alt="image"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Tracking Real-Time
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Pantau lokasi paket Anda secara langsung melalui aplikasi
                  hingga paket tiba dengan aman.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <Card className="aspect-video overflow-hidden pt-0">
                <div className="relative aspect-video">
                  <Image
                    src="/motor.png"
                    alt="image"
                    fill
                    className="object-cover"
                  />
                </div>
              </Card>
              <div className="sm:max-w-sm">
                <h3 className="text-foreground text-xl font-semibold">
                  Pilihan Layanan & Kendaraan
                </h3>
                <p className="text-muted-foreground my-4 text-lg">
                  Sesuaikan pengiriman dengan layanan Hemat atau Cepat serta
                  berbagai pilihan kendaraan sesuai kebutuhan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
