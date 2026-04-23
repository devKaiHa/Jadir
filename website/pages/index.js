import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import About from "@/components/sections/home3/About";
import Statistics from "@/components/sections/home3/Statistics";
import News from "@/components/sections/home2/News";
import { getHomeData } from "@/api/getHomeData";
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03";
import { getOtherData } from "@/api/getOtherData";
import Services from "@/components/sections/home3/Services";
import { ConsultCTA, TrustedLogos } from "@/components/website/PublicSections";

export async function getStaticProps() {
  try {
    const data = await getHomeData();
    const otherData = await getOtherData();

    return {
      props: {
        data,
        otherData,
      },
      revalidate: 300,
    };
  } catch (err) {
    console.error("Home data error:", err);

    return {
      props: {
        data: {},
        otherData: {},
      },
      revalidate: 300,
    };
  }
}

export default function Home({ data = {}, otherData = {} }) {
  const {
    banners = [],
    about = {},
    partners = [],
    news = [],
    statistics = [],
    services = [],
  } = data;

  const { testimonials = [], companies = [] } = otherData;

  return (
    <div className="homePage">
      <Layout>
        <Banner HomeSlides={banners} />
        <About aboutUs={about} ishomePage={true} />
        <Statistics statistics={statistics} />
        <Services services={services} />

        <ConsultCTA />
        <TrustedLogos partners={partners} companies={companies} />

        <TestimonialSlider03 testimonials={testimonials} />

        <News news={news} />
      </Layout>
    </div>
  );
}
