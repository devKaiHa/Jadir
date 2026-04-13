"use client";

import Link from "next/link";
import { turkishCitizenship } from "@/StaticData/TurkishCitzinShip";
import { useTranslation } from "react-i18next";

export default function Appointment() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const appointment = turkishCitizenship.appointment;

  return (
    <section className="appointment-section">
      <div className="outer-container sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{appointment.section_title[lang]}</span>
            <h2>{appointment.section_subtitle[lang]}</h2>
          </div>

          <div className="row clearfix">
            {/* Form Column */}
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="form-inner">
                  <form method="post" action="#" className="default-form">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder={
                              appointment.form.name_placeholder[lang]
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder={
                              appointment.form.email_placeholder[lang]
                            }
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name="phone"
                            placeholder={
                              appointment.form.phone_placeholder[lang]
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                        <div className="form-group">
                          <div className="select-box">
                            <select className="selectmenu" name="subject">
                              <option value="">
                                {appointment.form.subject_placeholder[lang]}
                              </option>
                              {appointment.form.subject_options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt[lang]}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <textarea
                            name="message"
                            placeholder={
                              appointment.form.message_placeholder[lang]
                            }
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                        <button type="submit" className="theme-btn btn-two">
                          {appointment.form.submit_text[lang]}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-box">
                <div className="shape"></div>
                <div className="icon-box">
                  <i className="flaticon-customer-service"></i>
                </div>

                <ul className="info-list clearfix">
                  <li>
                    <h6>{appointment.contact_info.office_hours_title[lang]}</h6>
                    <h4>{appointment.contact_info.office_hours_value[lang]}</h4>
                  </li>
                  <li>
                    <h6>{appointment.contact_info.phone_title[lang]}</h6>
                    <h4>
                      <a href={`tel:${appointment.contact_info.phone_value}`}>
                        {appointment.contact_info.phone_value}
                      </a>
                    </h4>
                  </li>
                  <li>
                    <h6>{appointment.contact_info.email_title[lang]}</h6>
                    <h4>
                      <a
                        href={`mailto:${appointment.contact_info.email_value}`}
                      >
                        {appointment.contact_info.email_value}
                      </a>
                    </h4>
                  </li>
                </ul>

                <ul className="social-links clearfix">
                  {appointment.social_links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} target="_blank">
                        <i className={`fa-brands ${link.icon}`}></i>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
