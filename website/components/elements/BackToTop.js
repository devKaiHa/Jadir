export default function BackToTop({ scroll }) {
  return (
    <>
      {scroll && (
        <a
          className="scroll-top scroll-to-target"
          href="#top"
          style={{ backgroundColor: "var(--site-blue)" }}
        >
          <i className="flaticon-up-arrow"></i>
        </a>
      )}
    </>
  );
}
