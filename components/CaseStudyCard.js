import Link from 'next/link';

export default function CaseStudyCard({ title, industry, solution, impact, image, slug }) {
  return (
    <div className="bg-white shadow-lg rounded-md p-6">
      <img src={image} alt={title} className="w-full h-48 object-contain mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 font-semibold text-gray-600">Industry: {industry}</p>
      <p className="text-sm text-gray-600">Solution: {solution}</p>
      <p className="mt-2 text-gray-800 font-medium">{impact}</p>
        <Link href={slug} className="text-blue-500 mt-4 inline-block">
          Read More →
        </Link>
    </div>
  );
}
