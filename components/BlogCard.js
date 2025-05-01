import Link from 'next/link';

export default function BlogCard({ title, category, date, excerpt, image, slug }) {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 font-semibold text-sm text-gray-600">Category: {category}</p>
        <p className="text-sm text-gray-600">Date: {date}</p>
        <p className="mt-2 text-sm text-gray-600">{excerpt}</p>
        <Link href={slug} className="text-blue-500 mt-4 inline-block">
          Read More →
        </Link>
      </div>
    </div>
  );
}
