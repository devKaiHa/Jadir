import Link from "next/link"
import CaseStudiesSlider from "@/components/slider/CaseStudiesSlider"

export default function CaseStudies() {
    return (
        <>
        {/* project-section */}
        <section className="project-section style-two sec-pad">
            <div className="auto-container">
            <div className="sec-title">
                <span className="sub-title">Case Studies</span>
                <h2>Thinking Forward for your Results</h2>
            </div>
            </div>
            <div className="outer-container">
            <CaseStudiesSlider />
            </div>
        </section>
        {/* project-section end */}
        </>

    )
}
