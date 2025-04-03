import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-semibold">Mashinalar</span>
            </Link>
          </div>
          <p className="text-gray-600 mt-4">
            Bizning maqsadimiz qulaylik yaratish va savdo biznesingizni
            oshirishga yordam berishdir.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">Biz haqimizda</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Bu qanday ishlaydi</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Tanlangan</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Hamkorlik</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Ishbilarmonlik aloqasi</Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">Bizning jamoa</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Tadbirlar</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Blog</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Podcast</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Do'stingizni taklif qiling</Link>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">
            Ijtimoiy tarmoqlar
          </h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Discord</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Instagram</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Twitter</Link>
            </li>
            <li className="hover:underline hover:text-blue-500">
              <Link href="#">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 flex flex-col items-center md:flex-row md:justify-between text-gray-600 text-sm">
        <p>©2025 Mashinalar. Barcha huquqlar himoyalangan</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Maxfiylik siyosati
          </a>
          <a href="#" className="hover:underline">
            Shartlar va shartlar
          </a>
        </div>
      </div>
    </footer>
  );
}
