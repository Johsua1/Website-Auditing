import {
  Building2,
  Users,
  TrendingUp,
  Scale,
  Lightbulb,
  Briefcase,
  Hammer,
} from "lucide-react";
import { ExpandingCards } from "../components/ui/expanding-cards";

const kgcPortfolio = [
  {
    id: "brains-infinite",
    title: "Brains Infinite Innovations",
    description:
      "A group of competent professionals dedicated to creating reliable solutions for you, your company, and the nation through technology and innovation.",
    imgSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    icon: <Lightbulb size={24} />,
    linkHref: "#",
  },
  {
    id: "klassic-solutions",
    title: "Klassic Solutions Inc.",
    description:
      "Creative manpower solutions for Philippine business, dedicated to providing quality staffing and human resource services across industries.",
    imgSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    icon: <Users size={24} />,
    linkHref: "#",
  },
  {
    id: "klassic-marketing",
    title: "Klassic Marketing Inc.",
    description:
      "Your gateway to global market access, formed to serve as an avenue for enterprises having global reach in importation and trading.",
    imgSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    icon: <TrendingUp size={24} />,
    linkHref: "#",
  },
  {
    id: "westwood-development",
    title: "Westwood Development Corp.",
    description:
      "Premier construction and development corporation delivering innovative building solutions and infrastructure projects with excellence and integrity.",
    imgSrc:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    icon: <Hammer size={24} />,
    linkHref: "#",
  },
  {
    id: "westwood-law",
    title: "Westwood Law Firm",
    description:
      "Professional legal services providing expert counsel, representation, and comprehensive legal solutions for businesses and individuals.",
    imgSrc:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    icon: <Scale size={24} />,
    linkHref: "#",
  },
  {
    id: "connector",
    title: "Connector",
    description:
      "Technology and innovation solutions connecting businesses with cutting-edge digital transformation and modern enterprise solutions.",
    imgSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    icon: <Building2 size={24} />,
    linkHref: "#",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex w-full flex-col items-center justify-center space-y-8 p-4 md:p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white light:text-gray-900 sm:text-4xl">
              Our Portfolio
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[#859496] light:text-gray-600">
              Discover the KGC Group of Companies - diverse businesses united in delivering excellence, 
              innovation, and reliable solutions across multiple industries.
            </p>
          </div>
          <ExpandingCards items={kgcPortfolio} defaultActiveIndex={0} />
        </div>
      </div>
    </div>
  );
}
