import { AnimatePresence, motion } from "framer-motion";
import { } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AnswerDrawer = ({ answer }) => {
  return (
    <AnimatePresence>
      <div >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stifness: 100,
            delay: 0.2,
            damping: 8,
          }}
        >
           <h2 className="text-lg p-2 font-semibold color-black">
                  Answer
                </h2>
          <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
            <div className="max-w-4xl mx-auto text-[15px] prose dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {answer}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default AnswerDrawer;
