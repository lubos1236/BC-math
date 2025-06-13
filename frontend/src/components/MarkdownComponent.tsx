import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

function MarkdownComponent({ markDown }: { markDown: string }) {
    return (
        <div className="max-w-none prose dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
                {markDown}
            </ReactMarkdown>
        </div>
    );
}
export default MarkdownComponent;
