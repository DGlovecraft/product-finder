import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="ancient-book w-full max-w-4xl rounded-[30px] p-6 md:p-10">
        <div className="ancient-header rounded-[22px] p-8 md:p-10">
          <span className="ancient-badge inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.28em]">
            The Scriptorium
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#2c1b10] md:text-6xl">
            Product Finder
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#4f3424] md:text-xl">
            ค้นหาสินค้าได้อย่างรวดเร็วแบบเรียบง่าย พร้อมตัวกรองราคา หมวดหมู่ และการเรียงลำดับที่ตรงกับความต้องการของคุณ
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="ancient-button inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-bold"
            >
              ไปที่หน้าสินค้า
            </Link>
            <Link
              href="/products?q=office"
              className="ancient-button-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-bold"
            >
              ดูสินค้าหมวด Office
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
