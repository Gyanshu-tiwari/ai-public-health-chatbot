import React, { useEffect } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import UserIcon from '../../assets/user_icon.svg'

const MessageItems = ({message}) => {
 
  useEffect(()=>{
    Prism.highlightAll()
  },[message.content])

  const formatMessageContent = (content) => {
    // Enhanced formatting for better display
    return content
      .replace(/```(\w+)?\n?([\s\S]*?)\n?```/g, (match, lang, code) => {
        if (code) {
          return `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``;
        }
        return match;
      })
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^#{1,6}\s/gm, (match) => {
        return `<h${match.length} class="text-lg font-bold text-white mb-2">${match.substring(match.length).trim()}</h${match.length}>`;
      })
      .replace(/^\d+\.\s/gm, (match) => {
        return `<span class="text-blue-400 font-semibold">${match}</span>`;
      });
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
            <div className='text-sm text-[#c8bcd8] prose prose-invert max-w-none'>
              <Markdown 
                components={{
                  code: ({node, inline, className, children, ...props}) => {
                    const match = className?.match(/language-(\w+)/);
                    const language = match ? match[1] : '';
                    
                    return inline ? (
                      <code className="inline-code bg-slate-700 px-1 py-0.5 rounded text-cyan-400" {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="relative my-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400 uppercase tracking-wide">{language || 'text'}</span>
                        </div>
                        <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
                          <code className={`language-${language} text-sm`} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  pre: ({children}) => children,
                }}
              >
                {formatMessageContent(message.content)}
              </Markdown>
            </div>
            <span className='text-xs text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default MessageItems