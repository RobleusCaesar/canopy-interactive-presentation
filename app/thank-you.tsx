/* oxlint-disable next/no-img-element -- Preserve the full-resolution PDF rendering on this static site. */
import { ExternalLink, Mail, Phone } from 'lucide-react';
import './bio-outro.css';

export default function ThankYou() {
  return <div className="bio-outro">
    <a className="bio-outro-preview" href="./rob-carpenter-canopy-bio.png" target="_blank" rel="noopener noreferrer" aria-label="View Rob Carpenter's full Canopy bio">
      <div className="bio-outro-paper"><img src="./rob-carpenter-canopy-bio.png" width="2376" height="1836" loading="lazy" decoding="async" alt="Rob T. Carpenter, Artificial Intelligence and Sales Executive. His completed Canopy bio includes his portrait, education, skills and biography."/></div>
      <span className="bio-outro-preview-caption"><span>Created with Canopy Bio Builder</span><span>View full bio <ExternalLink size={13}/></span></span>
    </a>
    <div className="bio-outro-signoff">
      <p className="bio-outro-callback">Yes, it made<br/>my bio, too.</p>
      <h2>Questions?</h2>
      <address className="bio-outro-contact">
        <p className="bio-outro-name">Rob Carpenter</p>
        <p className="bio-outro-company">Canopy Consulting</p>
        <div className="bio-outro-links">
          <a href="mailto:rob@frostrivercapital.com"><Mail aria-hidden="true"/><span>rob@frostrivercapital.com</span></a>
          <a href="tel:+13033586128"><Phone aria-hidden="true"/><span>(303) 358-6128</span></a>
        </div>
      </address>
    </div>
  </div>;
}
