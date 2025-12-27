import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <h2 className="about__title">About This Project</h2>

        <p className="about__text">
          This project was created to practice building a frontend application
          using React. It demonstrates component-based structure, routing, and
          clean markup.
        </p>

        <p className="about__text">
          The goal is to create a clear and user-friendly interface following
          modern web development standards.
        </p>
      </div>
    </section>
  );
}

export default About;
