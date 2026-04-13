import Link from "next/link";

export default function Pricing() {
    return (
        <>
            {/* pricing-section */}
            <section className="pricing-section sec-pad">
                <div className="auto-container">
                <div className="sec-title centred">
                    <span className="sub-title">Plan &amp; pricing</span>
                    <h2>Effective &amp; Flexible Pricing</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 pricing-block">
                    <div className="pricing-block-one">
                        <div className="pricing-table">
                        <div className="table-header">
                            <div className="icon-box">
                            <i className="flaticon-idea" />
                            </div>
                            <h3>
                            Basic <br />
                            Package
                            </h3>
                            <p>Pricing plan for small business</p>
                        </div>
                        <div className="table-content">
                            <ul className="feature-list clearfix">
                            <li>Traditional Consulting</li>
                            <li>Investment Management</li>
                            <li>Data Aggregation</li>
                            <li className="light">Tax Planning &amp; Preparation</li>
                            </ul>
                            <h2>
                            49 <span className="symble">$</span>
                            <span className="fraction">.99</span>
                            <span className="text">Billed Monthly</span>
                            </h2>
                            <Link href="/Services" className="theme-btn btn-two">
                            Get Started Now
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pricing-block">
                    <div className="pricing-block-one active-block">
                        <div className="pricing-table">
                        <span className="discount-text">10% Discount, Start Today</span>
                        <div className="table-header">
                            <div className="icon-box">
                            <i className="flaticon-star" />
                            </div>
                            <h3>
                            Basic <br />
                            Package
                            </h3>
                            <p>Pricing plan for small business</p>
                        </div>
                        <div className="table-content">
                            <ul className="feature-list clearfix">
                            <li>Traditional Consulting</li>
                            <li>Investment Management</li>
                            <li>Data Aggregation</li>
                            <li>Tax Planning &amp; Preparation</li>
                            </ul>
                            <h2>
                            129 <span className="symble">$</span>
                            <span className="fraction">.99</span>
                            <span className="text">Billed Monthly</span>
                            </h2>
                            <Link href="/Services" className="theme-btn btn-two">
                            Get Started Now
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pricing-block">
                    <div className="pricing-block-one">
                        <div className="pricing-table">
                        <div className="table-header">
                            <div className="icon-box">
                            <i className="flaticon-diamond" />
                            </div>
                            <h3>
                            Pro <br />
                            Package
                            </h3>
                            <p>Pricing plan for small business</p>
                        </div>
                        <div className="table-content">
                            <ul className="feature-list clearfix">
                            <li>Traditional Consulting</li>
                            <li>Investment Management</li>
                            <li>Data Aggregation</li>
                            <li>Tax Planning &amp; Preparation</li>
                            </ul>
                            <h2>
                            189 <span className="symble">$</span>
                            <span className="fraction">.99</span>
                            <span className="text">Billed Monthly</span>
                            </h2>
                            <Link href="/Services" className="theme-btn btn-two">
                            Get Started Now
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* pricing-section */}
        </>

    )
}
