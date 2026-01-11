import React, { useEffect } from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import UserIcon from '../../assets/user_icon.svg'


const MessageItems = ({message}) => {
  
  useEffect(()=>{
     Prism.highlightAll()
  },[message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
           <div className='flex flex-col gap-2 p-2 px-4 bg-[#57317C]/30 border border-[#80609F]/30 rounded-2xl rounded-tr-none max-w-2xl'>
               <p className='text-sm text-slate-300'>{message.content}</p>
               <span className='text-xs text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
           </div>
           <img src={UserIcon} className='h-5 w-5' alt="" />
        </div>
      ):(
        <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-slate-600/30 border border-[#80609F]/30 rounded-2xl rounded-tl-none my-4'>
            <div className='text-sm text-[#c8bcd8] reset-tw'>
              <Markdown>{message.content}</Markdown>
            </div>
            <span className='text-xs text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default MessageItems