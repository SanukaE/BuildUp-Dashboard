import './Footer.css';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-blue-100 py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">
          &copy; 2024 BuildUp. All rights reserved.
        </p>
        <p className="flex items-center">
          Made with{' '}
          <span className="text-red-500 mx-1 animate-pulse text-xl">❤</span> by{' '}
          <a
            href="https://github.com/SanukaE"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-semibold hover:text-white transition-colors duration-300"
          >
            ItzSanuka
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
