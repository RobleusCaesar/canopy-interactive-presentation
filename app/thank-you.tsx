/* oxlint-disable next/no-img-element -- Preserve the full-resolution PDF rendering on this static site. */
import './bio-outro.css';

export default function ThankYou() {
  return <div className="bio-outro">
    <a className="bio-outro-preview" href="./rob-carpenter-canopy-bio.png" target="_blank" rel="noopener noreferrer" aria-label="View Rob Carpenter's full Canopy bio">
      <div className="bio-outro-paper"><img src="./rob-carpenter-canopy-bio.png" width="2376" height="1836" loading="lazy" decoding="async" alt="Rob T. Carpenter, Artificial Intelligence and Sales Executive. His completed Canopy bio includes his portrait, education, skills and biography."/></div>
    </a>
    <p className="bio-outro-thanks" aria-hidden="true">Thank you.</p>
  </div>;
}
