import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Manager
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Your all-in-one solution for managing and organizing AI prompts. 
        Create, save, and optimize your prompts in one place.
      </p>
      <Link 
        href="/prompts" 
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
