import './Header.css';

function Header(props) {
  const firstName = props.firstName;

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-b-lg shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
          <span className="animate-wave inline-block mr-2">👋</span>
          Hello {firstName || 'User'},
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-200">
          Welcome to the BuildUp Dashboard!
        </h2>
      </div>
    </header>
  );
}

export default Header;
