import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'
import { Copy, Check } from 'lucide-react'
import UserIcon from '../../assets/user_icon.svg'

const MessageItems = ({message}) => {
  const [copiedCode, setCopiedCode] = useState(null);
 
  useEffect(()=>{
    Prism.highlightAll()
  },[message.content])

  const copyToClipboard = async (code, codeId) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const CodeBlock = ({ children, className, language }) => {
    const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
    const codeString = String(children).replace(/\n$/, '');
    
    return (
      <div className="relative my-4 group">
        <div className="flex items-center justify-between mb-2 bg-slate-800 px-4 py-2 rounded-t-lg border border-slate-700">
          <span className="text-xs text-slate-400 uppercase tracking-wide font-medium">
            {language || 'text'}
          </span>
          <button
            onClick={() => copyToClipboard(codeString, codeId)}
            className="flex items-center gap-2 px-3 py-1 text-xs text-slate-400 hover:text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            {copiedCode === codeId ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="bg-slate-900 rounded-b-lg p-4 overflow-x-auto border border-t-0 border-slate-700">
          <code className={`language-${language || 'text'} text-sm leading-relaxed`}>
            {children}
          </code>
        </pre>
      </div>
    );
  };

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
           <div className='flex flex-col gap-2 p-2 px-4 bg-[#57317C]/30 border border-[#80609F]/30 rounded-2xl rounded-tr-none max-w-2xl'>
               <p className='text-sm text-slate-300 whitespace-pre-wrap break-words'>{message.content}</p>
               <span className='text-xs text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
           </div>
           <img src={UserIcon} className='h-5 w-5' alt="" />
        </div>
      ):(
        <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-slate-600/30 border border-[#80609F]/30 rounded-2xl rounded-tl-none my-4'>
            <div className='text-sm text-[#c8bcd8] prose prose-invert max-w-none prose-headings:text-white prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-blue-300 prose-em:text-blue-200'>
              <Markdown 
                components={{
                  code: ({node, inline, className, children, ...props}) => {
                    const match = className?.match(/language-(\w+)/);
                    const language = match ? match[1] : '';
                    
                    return inline ? (
                      <code className="inline-code bg-slate-700 px-2 py-1 rounded text-cyan-400 text-sm font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <CodeBlock language={language} className={className}>
                        {children}
                      </CodeBlock>
                    );
                  },
                  pre: ({children}) => children,
                  h1: ({children}) => <h1 className="text-2xl font-bold text-white mb-4 mt-6 pb-2 border-b border-slate-600">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-white mb-3 mt-5 pb-1 border-b border-slate-700">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-semibold text-white mb-3 mt-4">{children}</h3>,
                  ul: ({children}) => <ul className="list-disc list-inside my-3 space-y-2 text-slate-300">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside my-3 space-y-2 text-slate-300">{children}</ol>,
                  li: ({children}) => <li className="ml-2">{children}</li>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-slate-400 bg-slate-800/50 py-2 rounded-r">
                      {children}
                    </blockquote>
                  ),
                  table: ({children}) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border-collapse border border-slate-600">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({children}) => <thead className="bg-slate-800">{children}</thead>,
                  th: ({children}) => <th className="border border-slate-600 px-4 py-3 text-left font-semibold text-slate-300">{children}</th>,
                  td: ({children}) => <td className="border border-slate-600 px-4 py-3 text-slate-300">{children}</td>,
                  a: ({children, href}) => (
                    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </Markdown>
            </div>
            <span className='text-xs text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default MessageItems