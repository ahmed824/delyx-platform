interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section>
      <div className="page-hero">
        <div className="overlay">
          <div className="container">
            <div className="overlay__text">
              <h1 className="animate-text">{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
