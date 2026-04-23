import { imageURL } from "@/api/GlobalData";
import Layout from "@/components/layout/Layout";
import {
  ProjectCards,
  SectionTitle,
  ServiceRequestModal,
  Testimonials,
} from "@/components/website/PublicSections";
import {
  asset,
  getServiceBySlug,
  getWebsiteData,
  localize,
  truncate,
} from "@/components/website/websiteUtils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ListBlock({ title, items = [] }) {
  if (!items.length) return null;
  return (
    <div className="jadwa-detail-card">
      <h3 className="mb-3">{title}</h3>
      <ul className="ms-0 ps-0">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Testimonial({ testimonial, lang = "en" }) {
  if (!testimonial) return null;

  return (
    <section className="site-band site-testimonial-showcase">
      <div className="auto-container">
        <SectionTitle
          eyebrow="Testimonials"
          title="What clients say"
          text="Clear feedback from the people and teams who trusted Jadir."
        />

        <article className="site-testimonial-featured">
          <div className="site-quote-mark">"</div>
          <p>
            {localize(
              testimonial?.quote ||
                testimonial?.content ||
                testimonial?.description,
              lang,
            )}
          </p>
          <h3>
            {localize(testimonial?.clientName || testimonial?.name, lang)}
          </h3>
          <span>
            {localize(testimonial?.clientRole || testimonial?.role, lang)}
          </span>
        </article>
      </div>
    </section>
  );
}

export default function ServiceDetailsPage({
  service,
  projects = [],
  relatedServices = [],
}) {
  const router = useRouter();
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const [requestOpen, setRequestOpen] = useState(false);

  if (!service) return null;

  const features = service?.features?.[lang] || service?.features?.en || [];
  const steps = service?.steps?.[lang] || service?.steps?.en || [];
  const sectors =
    service?.targetingSectors?.[lang] || service?.targetingSectors?.en || [];
  const relatedProjects = projects.filter((project) =>
    (service?.relatedProjects || []).some(
      (item) => (item?._id || item) === project?._id,
    ),
  );

  return (
    <Layout
      breadcrumbTitle={localize(service?.title, lang)}
      image={`${imageURL}ourServices/${service.bannerImage}`}
    >
      <section className="jadwa-detail-page sec-pad">
        <div className="auto-container">
          <div className="jadwa-detail-hero">
            <div className="jadwa-detail-image-wrap">
              <img
                className="jadwa-detail-image"
                src={`${imageURL}ourServices/${service.bannerImage}`}
                alt={localize(service?.title, lang)}
              />
            </div>
            <div className="jadwa-detail-hero-content">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>Services</span>
              </div>
              <h1>{localize(service?.title, lang)}</h1>
              <p>{truncate(localize(service?.description, lang))}</p>
              <button
                type="button"
                className="jadwa-detail-link"
                // onClick={() => setRequestOpen(true)}
                onClick={() => router.push("/contact")}
              >
                <span>Request this service</span>
                <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </div>

          <section className="jadwa-description-section">
            <div className="jadwa-description-shell">
              <div className="jadwa-description-head">
                <div className="jadwa-pill">
                  <span className="jadwa-pill-dot" />
                  <span>Service Description</span>
                </div>
                <h2 className="jadwa-description-title">
                  {localize(service?.title, lang)}
                </h2>
              </div>

              <div className="jadwa-description-body">
                <div className="jadwa-description-bar" />
                <div className="jadwa-description-content">
                  {localize(service?.description, lang)}
                </div>
              </div>
            </div>
          </section>

          <div className="jadwa-detail-card-grid">
            <ListBlock title="Advantages" items={features} />
            <ListBlock title="Stages of provision" items={steps} />
            <ListBlock title="Targeting sectors" items={sectors} />
          </div>

          <div className="jadwa-detail-section">
            <div className="jadwa-testimonials-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>Projects</span>
              </div>
              <h2 className="jadwa-testimonials-title">Related projects</h2>
            </div>
            <ProjectCards
              projects={
                relatedProjects.length ? relatedProjects : projects.slice(0, 3)
              }
            />
          </div>

          <div className="jadwa-detail-section">
            <div className="jadwa-testimonials-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>Services</span>
              </div>
              <h2 className="jadwa-testimonials-title">Related services</h2>
            </div>
            <div className="jadwa-detail-related-grid">
              {relatedServices.map((item) => {
                return (
                  <Link
                    className="site-media-card"
                    href={`/projects/${item?.slug || item?._id}`}
                    key={item?._id || item?.slug}
                  >
                    <img
                      src={asset(
                        "ourServices",
                        item.bannerImage,
                        "/assets/images/project/project-5.jpg",
                      )}
                      alt={localize(item?.title, lang)}
                    />
                    <div>
                      <h3>{localize(item?.title, lang)}</h3>
                      <p>{truncate(localize(item?.description, lang), 120)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {service?.testimonial ? (
        <Testimonial testimonial={service.testimonial} />
      ) : null}
      {requestOpen ? (
        <ServiceRequestModal
          service={service}
          onClose={() => setRequestOpen(false)}
        />
      ) : null}
    </Layout>
  );
}

export async function getStaticPaths() {
  const data = await getWebsiteData();
  return {
    paths: (data.services || [])
      .filter((service) => service?.slug)
      .map((service) => ({ params: { slug: service.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const [service, data] = await Promise.all([
    getServiceBySlug(params?.slug),
    getWebsiteData(),
  ]);
  if (!service) return { notFound: true, revalidate: 60 };
  const relatedIds = (service.relatedServices || []).map(
    (item) => item?._id || item,
  );
  return {
    props: {
      service,
      projects: data.projects || [],
      relatedServices: (data.services || [])
        .filter(
          (item) =>
            relatedIds.includes(item?._id) || item?._id !== service?._id,
        )
        .slice(0, 3),
    },
    revalidate: 300,
  };
}
