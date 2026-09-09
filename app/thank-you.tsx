import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function ThankYou() {
  return <div className="thank-you-layout">
    <div className="thank-you-questions"><MessageCircle strokeWidth={1}/><h2>Questions?</h2></div>
    <address className="thank-you-contact">
      <p className="contact-name">Rob Carpenter</p>
      <p className="contact-company">Canopy Consulting</p>
      <div className="contact-links">
        <a href="mailto:rob@frostrivercapital.com"><Mail aria-hidden="true"/><span>rob@frostrivercapital.com</span></a>
        <a href="tel:+13033586128"><Phone aria-hidden="true"/><span>(303) 358-6128</span></a>
      </div>
    </address>
  </div>;
}
