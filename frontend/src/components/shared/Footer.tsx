export default function Footer() {
  return (
    <footer className="mt-auto bg-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-4 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-blue-600">MORENT</h2>
          <p className="text-gray-600 mt-4">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">About</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>How it works</li>
            <li>Featured</li>
            <li>Partnership</li>
            <li>Business Relation</li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">Community</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>Events</li>
            <li>Blog</li>
            <li>Podcast</li>
            <li>Invite a friend</li>
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900">Socials</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>Discord</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 flex flex-col items-center md:flex-row md:justify-between text-gray-600 text-sm">
        <p>©2022 MORENT. All rights reserved</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy & Policy
          </a>
          <a href="#" className="hover:underline">
            Terms & Condition
          </a>
        </div>
      </div>
    </footer>
  );
}
