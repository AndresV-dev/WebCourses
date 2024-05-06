import Typewriter from "../components/Typewriter";

export default function NotFoundPage() {
  return (
    <div className="PNF-container">
      <div className="PNF-">
        <p>
          <Typewriter text="404, Page Not Found" delay={100} />
        </p>
      </div>
      <span className="handle"></span>
    </div>
  );
}
