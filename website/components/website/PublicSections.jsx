import Link from "next/link";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import {
  asset,
  localize,
  siteLinks,
  stripHtml,
  truncate,
} from "./websiteUtils";
import { formatDate } from "@/GlobalHooks/GlobalHooks";
import baseURL, { imageURL } from "@/api/GlobalData";
import ShareArticle from "@/components/elements/ShareArticle";
import { useIsMobile } from "@/lib/helpers";

const fallbackHero = [
  { image: "banner-4.jpg", folder: "banner" },
  { image: "banner-5.jpg", folder: "banner" },
  { image: "banner-6.jpg", folder: "banner" },
];

export function SectionTitle({ eyebrow, title, text, light = false }) {
  return (
    <div className={`site-section-title ${light ? "is-light" : ""}`}>
      {eyebrow ? (
        <div className="site-pill">
          <span className="site-pill-dot" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function EmptyState({ title = "No content available yet." }) {
  return <div className="site-empty">{title}</div>;
}

export function HeroImages({ slides = [] }) {
  const items = slides.length ? slides : fallbackHero;

  return (
    <section className="site-hero-images" aria-label="Hero images">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={items.length > 1}
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="site-hero-swiper"
      >
        {items?.map((slide, index) => {
          const src = slide?.img
            ? `${imageURL}homeSlider/${slide.img}`
            : `/assets/images/${slide?.folder || "banner"}/${slide?.image}`;

          return (
            <SwiperSlide key={slide?._id || `${src}-${index}`}>
              <div className="site-hero-slide">
                <img src={src} alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export function AboutPreview({ about, isAboutPage = false }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const title =
    localize(about?.aboutUsTitle?.title, lang) ||
    localize(about?.title, lang) ||
    "About Jadir";
  const text =
    localize(about?.content, lang) ||
    localize(about?.description, lang) ||
    "We support companies and investors with structured advisory, practical planning, and reliable execution.";

  return (
    <section className="site-band site-about-preview">
      <div className="auto-container site-about-split">
        <div className="site-about-media">
          <figure className="site-about-image site-about-image-main">
            <img src="/assets/images/about-2.jpg" alt="" />
          </figure>
          <figure className="site-about-image site-about-image-float">
            <img src="/assets/images/about-1.jpg" alt="" />
          </figure>
          <div className="site-about-badge">
            <strong>Jadir</strong>
            <span>Consulting with clear execution</span>
          </div>
        </div>
        <div className="site-about-content">
          <SectionTitle
            eyebrow="About"
            title={title}
            text={isAboutPage ? text : truncate(text, 260)}
          />
          <div className="site-about-mini-panel">
            <h3>Focused consults for growth decisions</h3>
            <p>{isAboutPage ? text : truncate(text, 360)}</p>
          </div>
          {!isAboutPage && (
            <Link className="site-btn" href="/about">
              About us
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutOverview({ data = {} }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const about = data.about || {};
  const values = Array.isArray(data.values) ? data.values : [];
  const aboutTitle =
    localize(about?.aboutUsTitle?.title, lang) ||
    localize(about?.title, lang) ||
    "About";
  const items = [
    {
      id: "about",
      title: "About",
      content:
        localize(about?.content, lang) || localize(about?.description, lang),
    },
    {
      id: "vision",
      title: localize(about?.vision, lang) || "Vision",
      content: localize(about?.visionDescription, lang),
    },
    {
      id: "message",
      title: localize(about?.message, lang) || "Message",
      content: localize(about?.messageDescription, lang),
    },
    {
      id: "values",
      title: "Values",
      values,
    },
    {
      id: "business-approach",
      title: "Business approach",
      content: localize(about?.businessApproach, lang),
    },
    {
      id: "who-we-serve",
      title: "Who we serve",
      content: localize(about?.whoWeServe, lang),
    },
    {
      id: "why-us",
      title: "Why us",
      content: localize(about?.whyUs, lang),
    },
  ];

  return (
    <section className="site-band">
      <div className="auto-container">
        <SectionTitle eyebrow="About" title={aboutTitle} />

        <div className="site-about-overview-grid">
          {items.map((item) => (
            <article className="site-info-panel" key={item.id}>
              <h3>{item.title}</h3>
              {item.id === "values" ? (
                item.values.length ? (
                  <ul className="site-about-value-list">
                    {item.values.map((value) => (
                      <li key={value?._id || localize(value?.name, lang)}>
                        <strong>
                          {localize(value?.name, lang) || "Value"}
                        </strong>
                        <span>
                          {truncate(
                            localize(value?.content, lang) ||
                              localize(value?.description, lang),
                            120,
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null
              ) : stripHtml(item.content) ? (
                <div>{parse(item.content)}</div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Statistics({ statistics = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  if (!statistics.length) return null;

  return (
    <section className="site-dark-band">
      <div className="auto-container site-stat-grid">
        {statistics.slice(0, 4).map((item) => (
          <div
            className="site-stat"
            key={item?._id || localize(item?.title, lang)}
          >
            <strong>
              {item?.value}
              {localize(item?.suffix, lang)}
            </strong>
            <span>
              {localize(item?.title, lang) || localize(item?.description, lang)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview({ services = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  if (!services.length) return null;

  return (
    <section className="site-band site-services-showcase">
      <div className="auto-container">
        <div className="site-title-row">
          <SectionTitle
            eyebrow="Services"
            title="What we can help with"
            text="Advisory services organized around practical decisions, staged delivery, and measurable outcomes."
          />
          <Link className="site-link" href="/services">
            All services
          </Link>
        </div>

        <div className="site-service-grid">
          {services.slice(0, 6).map((service, index) => (
            <Link
              className="site-service-card"
              href={`/services/${service?.slug || service?._id}`}
              key={service?._id || service?.slug}
            >
              <span className="site-service-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="site-service-topline" />
              <h3>{localize(service?.title, lang)}</h3>
              <p>{truncate(localize(service?.description, lang), 130)}</p>
              <span className="site-service-arrow" aria-hidden="true">
                <i className="fa-solid fa-arrow-right" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConsultCTA() {
  return (
    <section className="site-cta">
      <div className="auto-container site-cta-inner">
        <h2>Need a custom consult?</h2>
        <Link className="site-btn site-btn-light" href="/contact">
          Request a consult
        </Link>
      </div>
    </section>
  );
}

export function TrustedLogos({ partners = [], companies = [] }) {
  const isMobile = useIsMobile();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const items = partners.length
    ? partners.map((item) => ({
        id: item?._id,
        title: localize(item?.title || item?.name, lang),
        image: `${imageURL}/partners/${item.img}`,
      }))
    : companies.map((item) => ({
        id: item?._id,
        title: localize(item?.companyName || item?.name, lang),
        image: asset("companies", item?.logo, "/assets/images/logos/jadir.png"),
      }));

  if (!items.length) return null;

  return (
    <section className="site-band site-band-soft site-trusted-showcase">
      <div className="auto-container">
        <SectionTitle
          eyebrow="Trusted by"
          title="Partners and people who trusted us"
        />

        <Swiper
          key={"trusted-logos"}
          modules={[Autoplay]}
          spaceBetween={isMobile ? 10 : 20}
          slidesPerView={isMobile ? 2 : 5}
          loop={true}
          speed={5000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 5 },
          }}
          className="trusted-logos-swiper"
        >
          {[...items, ...items].map((item, index) => (
            <SwiperSlide key={`${item.id || item.title}-${index}`}>
              <div className="site-logo-card">
                <img src={item.image} alt={item.title || "Partner"} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function Testimonials({ testimonials = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  if (!testimonials.length) return null;
  const featured = testimonials[0];
  const side = testimonials.slice(1, 3);
  const rest = testimonials.slice(3);

  return (
    <section className="site-band site-testimonial-showcase">
      <div className="auto-container">
        <SectionTitle
          eyebrow="Testimonials"
          title="What clients say"
          text="Clear feedback from the people and teams who trusted Jadir."
        />
        <div className="site-testimonial-layout">
          <article className="site-testimonial-featured">
            <div className="site-quote-mark">"</div>
            <p>
              {localize(
                featured?.quote || featured?.content || featured?.description,
                lang,
              )}
            </p>
            <h3>{localize(featured?.clientName || featured?.name, lang)}</h3>
            <span>
              {localize(featured?.clientRole || featured?.role, lang)}
            </span>
          </article>
          <div className="site-testimonial-stack">
            {side.map((item) => (
              <article className="site-testimonial-card" key={item?._id}>
                <p>
                  {truncate(
                    localize(
                      item?.quote || item?.content || item?.description,
                      lang,
                    ),
                    150,
                  )}
                </p>
                <h3>{localize(item?.clientName || item?.name, lang)}</h3>
                <span>{localize(item?.clientRole || item?.role, lang)}</span>
              </article>
            ))}
          </div>
        </div>
        {rest.length > 0 && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {rest.map((item) => (
              <article className="site-testimonial-card mt-4" key={item?._id}>
                <p>
                  {truncate(
                    localize(
                      item?.quote || item?.content || item?.description,
                      lang,
                    ),
                    150,
                  )}
                </p>
                <h3>{localize(item?.clientName || item?.name, lang)}</h3>
                <span>{localize(item?.clientRole || item?.role, lang)}</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProjectCards({ projects = [], limit }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const items = limit ? projects.slice(0, limit) : projects;

  if (!items.length) return <EmptyState title="No projects available yet." />;

  return (
    <div className="site-card-grid">
      {items.map((project) => (
        <Link
          className="site-media-card"
          href={`/projects/${project?.slug || project?._id}`}
          key={project?._id || project?.slug}
        >
          <img
            src={asset(
              "projects",
              project?.image,
              "/assets/images/project/project-5.jpg",
            )}
            alt={localize(project?.title, lang)}
          />
          <div>
            <h3>{localize(project?.title, lang)}</h3>
            <p>
              {truncate(
                localize(project?.brief, lang) ||
                  localize(project?.challenge, lang),
                120,
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function BlogCards({ blogs = [], limit }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const items = limit ? blogs.slice(0, limit) : blogs;

  if (!items.length) return <EmptyState title="No blogs available yet." />;

  return (
    <div className="site-card-grid">
      {items.map((blog) => (
        <Link
          className="site-media-card"
          href={`/blogs/${blog?.slug || blog?._id}`}
          key={blog?._id || blog?.slug}
        >
          <img
            src={asset(
              "blogs",
              blog?.image || blog?.photo,
              "/assets/images/news/news-1.jpg",
            )}
            alt={localize(blog?.title, lang)}
          />
          <div>
            <span>{blog?.author?.name || "Jadir"}</span>
            <h3>{localize(blog?.title, lang)}</h3>
            <p>
              {truncate(
                localize(blog?.excerpt, lang) || localize(blog?.content, lang),
                110,
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function HomeProjects({ projects }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const items = (projects || []).slice(0, 4);

  return (
    <section className="site-band site-project-showcase">
      <div className="auto-container">
        <SectionTitle eyebrow="Projects" title="Latest projects" />
        <ProjectCards projects={items} />
      </div>
    </section>
  );
}

export function HomeBlogs({ blogs }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const items = (blogs || []).slice(0, 3);

  return (
    <section className="site-band site-band-soft site-blog-showcase">
      <div className="auto-container">
        <div className="site-title-row">
          <SectionTitle eyebrow="Blogs" title="Latest insights" />
          <Link className="site-link" href="/blogs">
            Go to blogs
          </Link>
        </div>
        <BlogCards blogs={items} />
      </div>
    </section>
  );
}

export function AboutTabs({ data }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [active, setActive] = useState("team");
  const tabs = [
    { id: "team", label: "Team" },
    { id: "customers", label: "Customers & Partners" },
    { id: "statistics", label: "Statistics" },
  ];

  return (
    <section className="site-band">
      <div className="auto-container">
        <div className="site-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={active === tab.id ? "active" : ""}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "team" && (
          <div className="site-card-grid">
            {data.members?.map((member) => (
              <article className="site-person-card" key={member?._id}>
                <img
                  src={asset(
                    "boardMember",
                    member?.image,
                    "/assets/images/team/1.jpg",
                  )}
                  alt={localize(member?.name, lang)}
                />
                <h3>{localize(member?.name, lang)}</h3>
                <p>
                  {truncate(
                    localize(
                      member?.brief || member?.description || member?.position,
                      lang,
                    ),
                    120,
                  )}
                </p>
              </article>
            ))}
          </div>
        )}

        {active === "customers" && (
          <div className="site-card-grid">
            {data.companies?.map((company) => (
              <article className="site-card" key={company?._id}>
                <img
                  className="site-card-logo"
                  src={asset(
                    "companies",
                    company?.logo,
                    "/assets/images/logos/jadir.png",
                  )}
                  alt={localize(company?.companyName, lang)}
                />
                <h3>{localize(company?.companyName, lang)}</h3>
                <p>
                  {truncate(
                    localize(
                      company?.about || company?.content || company?.aboutus,
                      lang,
                    ),
                    150,
                  )}
                </p>
              </article>
            ))}
          </div>
        )}

        {active === "statistics" && <Statistics statistics={data.statistics} />}
      </div>
    </section>
  );
}

export function ServiceRequestModal({ service, onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  async function submit(event) {
    event.preventDefault();
    await fetch(`${baseURL}messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        subject: `Service request: ${localize(service?.title, "en")}`,
        requestType: "service-request",
        service: service?._id,
      }),
    }).catch(() => null);
    setSent(true);
  }

  return (
    <div className="site-modal" role="dialog" aria-modal="true">
      <div className="site-modal-card">
        <button
          className="site-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        {sent ? (
          <div className="site-thanks">
            <h2>Thank you</h2>
            <p>Your service request has been received.</p>
          </div>
        ) : (
          <form className="site-form" onSubmit={submit}>
            <h2>Request this service</h2>
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button className="site-btn" type="submit">
              Send request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function BlogFilters({ blogs = [], categories = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return blogs.filter((blog) => {
      const titleMatch = localize(blog?.title, lang)
        .toLowerCase()
        .includes(query.toLowerCase());
      const categoryMatch =
        !category ||
        blog?.category?._id === category ||
        blog?.category === category;
      const tagMatch =
        !query ||
        (blog?.tags || []).some((tag) =>
          localize(tag, lang).toLowerCase().includes(query.toLowerCase()),
        );
      return (titleMatch || tagMatch) && categoryMatch;
    });
  }, [blogs, category, lang, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div className="site-toolbar">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search by title or tag"
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item?._id} value={item?._id}>
              {localize(item?.name || item?.title, lang)}
            </option>
          ))}
        </select>
      </div>
      <BlogCards blogs={visible} />
      <div className="site-pagination">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index + 1}
            type="button"
            className={page === index + 1 ? "active" : ""}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export function BlogDetails({ blog, related = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const title = localize(blog?.title, lang);
  const content = localize(blog?.content, lang);

  return (
    <section className="site-band">
      <div className="auto-container site-detail-layout">
        <main className="site-detail-main">
          <img
            className="site-detail-image"
            src={asset(
              "blogs",
              blog?.image || blog?.photo,
              "/assets/images/news/news-1.jpg",
            )}
            alt={title}
          />
          <h1>{title}</h1>
          <div className="site-detail-meta">
            <span>{blog?.author?.name || "Jadir"}</span>
            <span>{formatDate(blog?.createdAt)}</span>
          </div>
          <article className="site-richtext">{parse(content || "")}</article>
        </main>
        <aside className="site-detail-side">
          <div className="site-card">
            <h3>Tags</h3>
            <div className="site-tags">
              {(blog?.tags || []).map((tag, index) => (
                <span key={index}>{localize(tag, lang)}</span>
              ))}
            </div>
          </div>
          <div className="site-card">
            <h3>Share</h3>
            <ShareArticle
              title={title}
              description={stripHtml(content).slice(0, 120)}
            />
          </div>
          <div className="site-card">
            <h3>Related blogs</h3>
            {related.map((item) => (
              <Link
                href={`/blogs/${item?.slug || item?._id}`}
                key={item?._id || item?.slug}
              >
                {localize(item?.title, lang)}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ContactExperience({ contact = {}, services = [] }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "consult-inquiry",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const branches = Array.isArray(contact?.branches) ? contact.branches : [];

  async function submit(event) {
    event.preventDefault();
    await fetch(`${baseURL}messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => null);
    setSent(true);
  }

  if (sent) {
    return (
      <section className="site-band">
        <div className="auto-container site-thanks">
          <h1>Thank you</h1>
          <p>Your message has been received. Our team will contact you soon.</p>
          <Link className="site-btn" href="/">
            Back home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="site-band">
      <div className="auto-container site-contact-grid">
        <form className="site-form" onSubmit={submit}>
          <h2>Contact us</h2>
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <select
            value={form.requestType}
            onChange={(e) => setForm({ ...form, requestType: e.target.value })}
          >
            <option value="consult-inquiry">Consult Inquiry</option>
            <option value="partnership">Partnership</option>
            <option value="media">Media</option>
            <option value="support">Support</option>
            <option value="service-request">Service request</option>
            <option value="complaint">Complaint</option>
          </select>
          {form.requestType === "service-request" ? (
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">Select service</option>
              {services.map((service) => (
                <option key={service?._id} value={service?._id}>
                  {localize(service?.title, "en")}
                </option>
              ))}
            </select>
          ) : null}
          <textarea
            required
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button className="site-btn" type="submit">
            Send message
          </button>
        </form>

        <div className="site-info-panel">
          <h2>Company branches</h2>
          <p>{localize(contact?.address, "en")}</p>
          {contact?.mapLink ? (
            <a href={contact.mapLink} target="_blank" rel="noreferrer">
              Open main branch
            </a>
          ) : null}
          {contact?.whatsapp ? (
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp support: {contact.whatsapp}
            </a>
          ) : null}
          {(contact?.phones || []).map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
              {phone}
            </a>
          ))}
          {branches.map((branch) => (
            <div className="site-branch" key={branch?._id}>
              <h3>{localize(branch?.name, "en")}</h3>
              <p>{localize(branch?.address, "en")}</p>
              {(branch?.phones || []).map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`}>
                  {phone}
                </a>
              ))}
              {branch?.mapLink ? (
                <a href={branch.mapLink} target="_blank" rel="noreferrer">
                  Branch link
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FooterLinks({ policies = [] }) {
  return policies.length
    ? policies.map((policy) => (
        <li key={policy?._id || policy?.slug}>
          <Link href={`/policies/${policy?.slug}`}>
            {localize(policy?.title, "en")}
          </Link>
        </li>
      ))
    : siteLinks.map((link) => (
        <li key={link.href}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ));
}
