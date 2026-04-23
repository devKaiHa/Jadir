import { Link } from "react-router-dom";

const sectionCards = [
  {
    title: "About",
    description:
      "Manage the company story, values, team profiles, and trust sections from the PDF structure.",
    links: [
      { label: "About Page", to: "/edit-about-home" },
      { label: "Team Members", to: "/all-board-members" },
      { label: "Trusted Companies", to: "/all-companies" },
      { label: "Partners", to: "/all-partners" },
      { label: "Values", to: "/all-values" },
    ],
  },
  {
    title: "Services",
    description: "Maintain service pages, sector coverage, statistics, and supporting service-page copy.",
    links: [
      { label: "Our Services", to: "/all-our-services" },
      { label: "About Services", to: "/about-services" },
      { label: "Sectors", to: "/all-sectors" },
      { label: "Statistics", to: "/all-statistics" },
    ],
  },
  {
    title: "Content",
    description:
      "Keep homepage highlights, projects, news, testimonials, and legal pages aligned with the site map.",
    links: [
      { label: "News", to: "/all-blogs" },
      { label: "News Categories", to: "/categories" },
      { label: "Projects", to: "/all-projects" },
      { label: "Home Sliders", to: "/all-home-sliders" },
      { label: "Testimonials", to: "/all-testimonials" },
      { label: "Policies", to: "/all-policies" },
    ],
  },
  {
    title: "Communication",
    description:
      "Control inbound requests, contact details, careers content, footer settings, and admin access.",
    links: [
      { label: "Messages", to: "/all-messages" },
      { label: "Contact Us", to: "/edit-contact-us" },
      { label: "Careers", to: "/careers" },
      { label: "Footer", to: "/edit-footer" },
      { label: "Users", to: "/all-users" },
    ],
  },
];

const DefaultPage = () => {
  return (
    <div className="space-y-6 p-5">
      <section className="card bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="card-body space-y-3">
          <span className="inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
            Jadir Dashboard
          </span>
          <h1 className="text-2xl font-semibold">
            Backend and dashboard controls aligned around the website structure
          </h1>
          <p className="max-w-3xl text-sm text-slate-200">
            This dashboard is now organized around the PDF sitemap: homepage,
            about, services, projects, news, contact, careers, and policies.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {sectionCards.map((section) => (
          <div key={section.title} className="card">
            <div className="card-body space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  {section.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="btn btn-sm btn-light-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export { DefaultPage };
