import katex from 'katex';

export function MathFormula({ children, display = true }: { children: string; display?: boolean }) {
    const html = katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        output: 'htmlAndMathml',
    });
    return (
        <span
            className={display ? 'math-formula' : 'math-inline'}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
