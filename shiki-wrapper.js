import { getHighlighter } from 'shiki';

export async function highlightCode(code, lang) {
  const highlighter = await getHighlighter({
    theme: 'github-dark',
  });

  const tokens = highlighter.codeToThemedTokens(code, lang);
  const lines = tokens.map((line) => {
    const lineNumber = `<span class="line-number">${line.lineNumber}</span>`;
    const codeLine = line.map((token) => token.content).join('');
    return `<span class="code-line">${lineNumber}${codeLine}</span>`;
  });

  return `<pre class="shiki" style="background-color: ${highlighter.getBackgroundColor()}">
            <code>${lines.join('\n')}</code>
          </pre>`;
}