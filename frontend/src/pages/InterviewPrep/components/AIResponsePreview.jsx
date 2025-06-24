import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIResponsePreview = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto text-[14px] prose dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >{content}</ReactMarkdown>
    </div>
  );
};
export default AIResponsePreview;
