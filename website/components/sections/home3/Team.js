import Link from "next/link";
import TeamlSlider from "@/components/pages/AboutUs/TeamlSlider";

export default function Team() {
  return (
    <>
      {/* team-section */}
      <section className="team-section sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">Leadership</span>
            <h2>Team Behind Company</h2>
          </div>
          <TeamlSlider />
          <div className="more-text centred">
            <h5>
              <Link href="/team">
                View All Members
                <i className="flaticon-right-chevron" />
              </Link>
            </h5>
          </div>
        </div>
      </section>
      {/* team-section end */}
    </>
  );
}
