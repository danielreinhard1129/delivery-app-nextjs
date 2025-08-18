"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Pengiriman reguler biasanya memakan waktu 1-3 hari kerja tergantung jarak dan lokasi. Untuk kebutuhan mendesak, Anda bisa memilih layanan Express dengan estimasi sampai dalam hitungan jam.",
    },
    {
      id: "item-2",
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami mendukung berbagai metode pembayaran seperti GoPay, OVO, DANA, ShopeePay, kartu kredit/debit (Visa, Mastercard), serta transfer bank.",
    },
    {
      id: "item-3",
      question: "Apakah saya bisa melacak posisi kurir?",
      answer:
        "Ya, Anda bisa melacak paket secara real-time melalui aplikasi FastDelivery. Notifikasi status pengiriman juga akan dikirim langsung ke ponsel Anda.",
    },
    {
      id: "item-4",
      question: "Bisakah saya mengganti alamat tujuan setelah order dibuat?",
      answer:
        "Alamat tujuan hanya bisa diubah sebelum kurir mengambil paket. Jika paket sudah diambil, silakan hubungi customer support kami untuk bantuan lebih lanjut.",
    },
    {
      id: "item-5",
      question: "Apakah ada asuransi untuk barang yang dikirim?",
      answer:
        "FastDelivery menyediakan opsi asuransi untuk barang berharga. Dengan tambahan biaya kecil, barang Anda akan terlindungi jika terjadi kerusakan atau kehilangan.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-0">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
            <p className="text-muted-foreground mt-4 text-lg text-balance">
              Pertanyaan seputar layanan FastDelivery
            </p>
            <p className="text-muted-foreground mt-6 hidden md:block">
              Tidak menemukan jawaban? Hubungi{" "}
              <Link
                href="#"
                className="text-primary font-medium hover:underline"
              >
                tim customer support kami
              </Link>
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible>
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground mt-6 md:hidden">
            Tidak menemukan jawaban? Hubungi{" "}
            <Link href="#" className="text-primary font-medium hover:underline">
              tim customer support kami
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
