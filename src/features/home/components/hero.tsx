import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <div
        className="flex h-[320px] flex-col items-start justify-center gap-6 bg-cover bg-center bg-no-repeat px-4 md:h-[480px] md:justify-end md:rounded-xl md:px-16 md:pb-16"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("/hero2.png")',
        }}
      >
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-3xl leading-tight font-black tracking-[-0.033em] text-white md:text-5xl">
            FastDelivery: Kirim Paket Cepat & Aman
          </h1>
          <h2 className="text-sm leading-normal font-normal text-white md:text-lg">
            Layanan pengiriman terpercaya dengan harga terjangkau ke seluruh
            Indonesia.
          </h2>
        </div>

        <Button className="animate-bounce font-bold" size="lg">
          Buat Pesanan
        </Button>
      </div>
    </div>
  );
};

export default Hero;
