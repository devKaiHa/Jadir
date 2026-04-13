import TeamlSlider from "@/components/pages/AboutUs/TeamlSlider";

export default function Team() {
  return (
    <>
      {/* team-style-two */}
      <section className="team-style-two">
        <div
          className="pattern-layer"
          style={{ backgroundImage: "url(assets/images/shape/shape-37.png)" }}
        />
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">Leadership</span>
            <h2>Team Behind Company</h2>
          </div>
          <TeamlSlider />
        </div>
      </section>
      {/* team-style-two end */}
    </>
  );
}
