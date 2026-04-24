import Link from 'next/link';

interface CallToActionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CallToAction({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref
}: CallToActionProps) {
  return (
    <section>
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="cta-buttons">
              <Link href={primaryButtonHref} className="btn-primary">
                {primaryButtonText}
              </Link>
              {secondaryButtonText && secondaryButtonHref && (
                <Link href={secondaryButtonHref} className="btn-secondary">
                  {secondaryButtonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
