import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import About from "@/components/sections/home3/About";
import Sectors from "@/components/sections/home1/Sectors";
import Statistics from "@/components/sections/home3/Statistics";
import Services from "@/components/sections/home3/Services";
import News from "@/components/sections/home2/News";
import Project from "@/components/sections/home1/Project";
import Industries from "@/components/sections/home1/Industries";
import Partners from "@/components/sections/home2/Partners";
import Working from "@/components/sections/home2/Working";
import { getHomeData } from "@/api/getHomeData";
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03";
import { getOtherData } from "@/api/getOtherData";

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
    services = [],
    sectors = [],
    news = [],
    projects = [],
    funds = [],
    statistics = [],
    partners = [],
    values = [],
    companies = [],
  } = data;

  const { testimonials = [] } = otherData;
  console.log("testimonials", testimonials);

  return (
    <div className="homePage">
      <Layout>
        <Banner HomeSlides={banners} />
        <About aboutUs={about} />
        <Statistics statistics={statistics} />
        <Working funds={funds} />
        {/* <Services services={services} /> */}

        {/* <Sectors values={values} /> */}

        {/* <Industries sectors={sectors} /> */}

        <TestimonialSlider03 testimonials={testimonials} />

        <News news={news} />

        <Project projects={projects} companies={companies} />

        <Partners partners={partners} />
      </Layout>
    </div>
  );
}
