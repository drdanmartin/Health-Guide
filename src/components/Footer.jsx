export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--black)' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '56px 28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 32 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>Intellectual Property</div>
            <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>
              © 2026 Radius Chiropractic PLLC. All rights reserved. Radius™, Radius Red Light Therapy™, Radius Super Stack™, and The Protocol™ are trademarks of Radius Chiropractic PLLC.
            </p>
            <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, marginTop: 10 }}>
              No part of this guide may be reproduced, distributed, resold, or transmitted in any form or by any means — electronic, mechanical, photocopying, recording, or otherwise — without the prior written permission of Radius Chiropractic PLLC. Unauthorized use is strictly prohibited.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>Third-Party Trademarks</div>
            <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>
              Dr. Mercola® is a registered trademark of Dr. Joseph Mercola. Pure Encapsulations® and Renual® are registered trademarks of Pure Encapsulations, LLC. Earth Harmony™ and its methylene blue formulations are trademarks of Earth Harmony Naturals. Renue Blue™ is a trademark of its respective owner. Drink HRW™ and Rejuvenation™ hydrogen water tablets are trademarks of Natural Wellness Now Health Products, Inc. Toniiq® is a registered trademark of Toniiq, Inc. Dahlia Health™ and Dahlia Pinnacle™ are trademarks of Dahlia Health, Inc.
            </p>
            <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, marginTop: 10 }}>
              All third-party trademarks are the property of their respective owners. Use of these names does not imply endorsement, affiliation, or sponsorship.
            </p>
            <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, marginTop: 10 }}>
              Guided practice videos referenced in this guide are the intellectual property of their respective creators: Wim Hof (Wim Hof Method®), Master Faye Yip / Li Hui, Dr. Melissa Gallagher (Lymphatic Therapy Services), and Stanley Rosenberg. Linked with attribution for educational reference only; Radius Chiropractic PLLC is not affiliated with and does not endorse these creators.
            </p>
          </div>
        </div>

        <div style={{ paddingTop: 24, paddingBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', fontWeight: 600, marginBottom: 8 }}>Educational Use — Not Medical Advice</div>
          <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.6, margin: 0 }}>
            The information in this guide is intended for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have. Never disregard professional medical advice or delay in seeking it because of something you have read in this guide.
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '28px', background: 'var(--bg-raised)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src="/assets/logo-lockup.png" alt="Radius Red Light Therapy" style={{ height: 40, width: 'auto' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 'var(--tr-eyebrow)', color: 'var(--fg-3)', borderLeft: '1px solid var(--border)', paddingLeft: 20 }}>
              Asheville, NC
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase' }}>
            © 2026 Radius Chiropractic PLLC
          </div>
        </div>
      </div>
    </footer>
  );
}
