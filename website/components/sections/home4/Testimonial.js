import TestimonialSlider11 from '@/components/slider/TestimonialSlider11'

export default function Testimonial() {
    return (
        <>
  {/* testimonial-style-four */}
  <section className="testimonial-style-four">
    <div
      className="pattern-layer"
      style={{ backgroundImage: "url(assets/images/shape/shape-37.png)" }}
    />
    <div className="auto-container">
      <div className="sec-title centred">
        <span className="sub-title">Testimonials</span>
        <h2>Words from Our Customers</h2>
      </div>
    </div>
    <div className="outer-container">
      <TestimonialSlider11 />
      <div className="scroll-option">
        <div className="icon-box">
          <i className="flaticon-scroll" />
        </div>
      </div>
    </div>
  </section>
  {/* testimonial-style-four end */}
</>


    )
}
