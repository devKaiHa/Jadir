import { imageURL } from "@/api/GlobalData";
import Layout from "@/components/layout/Layout";
import {
  ProjectCards,
  SectionTitle,
  ServiceRequestModal,
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

const copyMap = {
  en: {
    service: "Service",
    request: "Request this service",
    description: "Service Description",
    advantages: "Advantages",
    stages: "Stages of provision",
    sectors: "Targeting sectors",
    projects: "Projects",
    relatedProjects: "Related projects",
    services: "Services",
    relatedServices: "Related services",
    testimonials: "Testimonials",
    testimonialsTitle: "What clients say",
    testimonialsText:
      "Clear feedback from the people and teams who trusted Jadir.",
    openService: "View service",
  },
  ar: {
    service: "خدمة",
    request: "طلب هذه الخدمة",
    description: "وصف الخدمة",
    advantages: "المزايا",
    stages: "مراحل التقديم",
    sectors: "القطاعات المستهدفة",
    projects: "المشاريع",
    relatedProjects: "مشاريع ذات صلة",
    services: "الخدمات",
    relatedServices: "خدمات ذات صلة",
    testimonials: "آراء العملاء",
    testimonialsTitle: "ماذا يقول العملاء",
    testimonialsText: "آراء واضحة من الجهات والفرق التي وثقت بجدير.",
    openService: "عرض الخدمة",
  },
  tr: {
    service: "Hizmet",
    request: "Bu hizmeti talep et",
    description: "Hizmet Açıklaması",
    advantages: "Avantajlar",
    stages: "Sunum aşamaları",
    sectors: "Hedef sektörler",
    projects: "Projeler",
    relatedProjects: "İlgili projeler",
    services: "Hizmetler",
    relatedServices: "İlgili hizmetler",
    testimonials: "Referanslar",
    testimonialsTitle: "Müşterilerimiz ne söylüyor",
    testimonialsText:
      "Jadir’e güvenen kişi ve ekiplerden net geri bildirimler.",
    openService: "Hizmeti görüntüle",
  },
};

function ListBlock({ title, items = [], index }) {
  if (!items.length) return null;

  return (
    <article className="jadir-service-list-card">
      <div className="jadir-service-list-card-top">
        <span className="jadir-service-list-count">
          {String(index).padStart(2, "0")}
        </span>
        <h3>{title}</h3>
      </div>

      <ul>
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>
            <span />
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function TestimonialsList({ testimonials = [], lang = "en" }) {
  if (!testimonials.length) return null;

  const copy = copyMap[lang] || copyMap.en;

  return (
    <section
      className={`jadir-service-testimonials ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="auto-container">
        <SectionTitle
          eyebrow={copy.testimonials}
          title={copy.testimonialsTitle}
          text={copy.testimonialsText}
        />

        <div className="jadir-service-testimonial-grid">
          {testimonials.map((testimonial, index) => {
            const name = localize(
              testimonial?.clientName || testimonial?.name,
              lang,
            );
            const role = localize(
              testimonial?.clientRole || testimonial?.role,
              lang,
            );
            const quote = localize(
              testimonial?.quote ||
                testimonial?.content ||
                testimonial?.description,
              lang,
            );

            return (
              <article
                className="jadir-service-testimonial-card"
                key={`service-testimonial-${index}`}
              >
                <div className="jadir-service-quote">"</div>
                <p>{quote}</p>

                <div className="jadir-service-testimonial-person">
                  <h3>{name}</h3>
                  {role ? <span>{role}</span> : null}
                </div>
              </article>
            );
          })}
        </div>
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
  const isRtl = lang === "ar";
  const copy = copyMap[lang] || copyMap.en;
  const [requestOpen, setRequestOpen] = useState(false);

  if (!service) return null;

  const title = localize(service?.title, lang);
  const description = localize(service?.description, lang);
  const image = `${imageURL}ourServices/${service.bannerImage}`;

  const features = service?.features?.[lang] || service?.features?.en || [];
  const steps = service?.steps?.[lang] || service?.steps?.en || [];
  const sectors =
    service?.targetingSectors?.[lang] || service?.targetingSectors?.en || [];

  const testimonials = Array.isArray(service?.testimonials)
    ? service.testimonials
    : service?.testimonial
      ? [service.testimonial]
      : [];

  const relatedProjects = projects.filter((project) =>
    (service?.relatedProjects || []).some(
      (item) => (item?._id || item) === project?._id,
    ),
  );

  const listBlocks = [
    { title: copy.advantages, items: features },
    { title: copy.stages, items: steps },
    { title: copy.sectors, items: sectors },
  ].filter((item) => item.items?.length);

  return (
    <Layout breadcrumbTitle={title} image={image}>
      <section
        className={`jadir-service-detail-page sec-pad ${isRtl ? "rtl" : "ltr"}`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <div className="jadir-service-detail-hero">
            <div className="jadir-service-detail-media">
              <img
                className="jadir-service-detail-image"
                src={image}
                alt={title}
              />
            </div>

            <div className="jadir-service-detail-intro">
              <div className="jadir-service-detail-eyebrow">
                <span />
                {copy.service}
              </div>

              <h1>{title}</h1>

              {description ? (
                <p className="jadir-service-detail-summary">
                  {truncate(description, 220)}
                </p>
              ) : null}

              <button
                type="button"
                className="jadir-service-detail-action"
                onClick={() => router.push("/contact")}
              >
                <span>{copy.request}</span>
                <i
                  className={`fa-solid ${
                    isRtl ? "fa-arrow-left" : "fa-arrow-right"
                  }`}
                />
              </button>
            </div>
          </div>

          {description ? (
            <section className="jadir-service-description">
              <div className="jadir-service-section-head">
                <div className="jadir-service-detail-eyebrow">
                  <span />
                  {copy.description}
                </div>

                <h2>{title}</h2>
              </div>

              <div className="jadir-service-description-card">
                <div
                  className="jadir-service-description-richtext"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            </section>
          ) : null}

          {!!listBlocks.length && (
            <div className="jadir-service-list-grid">
              {listBlocks.map((block, index) => (
                <ListBlock
                  key={block.title}
                  title={block.title}
                  items={block.items}
                  index={index + 1}
                />
              ))}
            </div>
          )}

          <div className="jadir-service-detail-section">
            <div className="jadir-service-section-head centered">
              <div className="jadir-service-detail-eyebrow">
                <span />
                {copy.projects}
              </div>
              <h2>{copy.relatedProjects}</h2>
            </div>

            <ProjectCards
              projects={
                relatedProjects.length ? relatedProjects : projects.slice(0, 3)
              }
            />
          </div>

          {!!relatedServices.length && (
            <div className="jadir-service-detail-section">
              <div className="jadir-service-section-head centered">
                <div className="jadir-service-detail-eyebrow">
                  <span />
                  {copy.services}
                </div>
                <h2>{copy.relatedServices}</h2>
              </div>

              <div className="jadir-service-related-grid">
                {relatedServices.map((item) => (
                  <Link
                    className="jadir-service-related-card"
                    href={`/Services/${item?.slug || item?._id}`}
                    key={item?._id || item?.slug}
                  >
                    <div className="jadir-service-related-image">
                      <img
                        src={asset(
                          "ourServices",
                          item.bannerImage,
                          "/assets/images/project/project-5.jpg",
                        )}
                        alt={localize(item?.title, lang)}
                      />
                    </div>

                    <div className="jadir-service-related-content">
                      <span>{copy.openService}</span>
                      <h3>{localize(item?.title, lang)}</h3>
                      <p>{truncate(localize(item?.description, lang), 120)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {testimonials.length ? (
        <TestimonialsList testimonials={testimonials} lang={lang} />
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
            relatedIds.includes(item?._id) ||
            (!relatedIds.length && item?._id !== service?._id),
        )
        .slice(0, 3),
    },
    revalidate: 300,
  };
}
