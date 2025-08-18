import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Pengusaha Online Shop",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content:
      "FastDelivery benar-benar membantu bisnis saya. Paket selalu sampai tepat waktu dan ongkirnya sangat terjangkau.",
  },
  {
    name: "Siti Rahma",
    role: "Mahasiswi",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    content:
      "Layanan tracking real-time membuat saya merasa tenang. Saya bisa tahu posisi paket setiap saat.",
  },
  {
    name: "Budi Santoso",
    role: "Freelancer",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    content:
      "Pilihan kendaraan dan layanan sangat fleksibel. Bisa pilih hemat untuk barang kecil, atau express kalau butuh cepat.",
  },
  {
    name: "Rina Marlina",
    role: "Karyawan Kantoran",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    content:
      "Customer service FastDelivery sangat responsif. Setiap pertanyaan saya selalu dijawab dengan cepat dan ramah.",
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto max-w-7xl px-4 md:px-0">
      <div className="py-16">
        <div className="@container">
          <div className="mb-12">
            <h2 className="text-foreground text-4xl font-semibold">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-muted-foreground my-4 text-lg text-balance">
              Ribuan pelanggan sudah merasakan kemudahan kirim paket bersama
              FastDelivery. Inilah cerita mereka tentang pengalaman menggunakan
              layanan kami.
            </p>
          </div>
          <div className="grid gap-6 @lg:grid-cols-2 @3xl:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <div className="bg-background ring-foreground/10 rounded-2xl rounded-bl border border-transparent px-4 py-3 ring-1">
                  <p className="text-foreground">{testimonial.content}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Avatar className="ring-foreground/10 size-6 border border-transparent shadow ring-1">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-foreground text-sm font-medium">
                    {testimonial.name}
                  </div>
                  <span
                    aria-hidden
                    className="bg-foreground/25 size-1 rounded-full"
                  ></span>
                  <span className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
