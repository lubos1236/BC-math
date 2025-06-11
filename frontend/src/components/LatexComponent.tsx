import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function LatexComponent({ markDown }: { markDown: string }) {
    return (
        <div className="max-w-none prose dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {markDown}
            </ReactMarkdown>
        </div>
    );
}
export default LatexComponent;
