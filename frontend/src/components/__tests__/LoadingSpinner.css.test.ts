import fs from 'fs';
import path from 'path';

const readCss = (fileName: string) =>
  fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');

// jsdom doesn't apply real stylesheets, so these theme-token checks read the
// CSS source directly rather than asserting on computed styles.
describe('LoadingSpinner.css and Skeleton.css theme tokens', () => {
  it('LoadingSpinner.css has no hardcoded hex colors', () => {
    const css = readCss('LoadingSpinner.css');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('Skeleton.css has no hardcoded hex colors', () => {
    const css = readCss('Skeleton.css');
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('.spinner uses the shared --border and --primary design tokens', () => {
    const css = readCss('LoadingSpinner.css');
    expect(css).toMatch(/\.spinner\s*{[^}]*border:\s*3px solid var\(--border\)/);
    expect(css).toMatch(/\.spinner\s*{[^}]*border-top:\s*3px solid var\(--primary\)/);
  });

  it('.skeleton uses the shared --surface-2 and --border design tokens', () => {
    const css = readCss('Skeleton.css');
    expect(css).toMatch(
      /\.skeleton\s*{[^}]*background:\s*linear-gradient\(90deg, var\(--surface-2\) 25%, var\(--border\) 50%, var\(--surface-2\) 75%\)/
    );
  });
});
