import fs from 'fs';
import path from 'path';

// jsdom doesn't apply real stylesheets, so this reads the CSS source
// directly rather than asserting on computed styles.
const css = fs.readFileSync(
  path.join(__dirname, '..', '..', 'styles', 'landing.css'),
  'utf8'
);

describe('landing.css touch targets', () => {
  it('gives .nav-menu a a 44px minimum touch target', () => {
    const rule = css.match(/\.nav-menu a\s*{[^}]*}/)?.[0];
    expect(rule).toBeDefined();
    expect(rule).toMatch(/min-height:\s*44px/);
    expect(rule).toMatch(/display:\s*inline-flex/);
  });

  it('gives .footer-section ul a a 44px minimum touch target', () => {
    const rule = css.match(/\.footer-section ul a\s*{[^}]*}/)?.[0];
    expect(rule).toBeDefined();
    expect(rule).toMatch(/min-height:\s*44px/);
    expect(rule).toMatch(/display:\s*inline-flex/);
  });
});
