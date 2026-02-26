const STORAGE_KEY = "nox-theme";

export function ThemeScript() {
  const script = `
    (function() {
      try {
        const stored = localStorage.getItem('${STORAGE_KEY}');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = stored === 'light' || stored === 'dark' ? stored : (systemDark ? 'dark' : 'light');
        document.documentElement.classList.add(theme);
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
