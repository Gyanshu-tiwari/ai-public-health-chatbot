import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { SidebarLink } from '../ui/SideBarLink';
import { ChatContextMenu } from '../ui/ContextMenu';
import { AnimatePresence } from 'framer-motion';

export const ChatNavItem = ({ chat }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  return (
    <div className="relative group px-2">
      <Link to={`/chat/${chat.id}`}>
        <SidebarLink label={chat.title} />
      </Link>
      <button 
        onClick={(e) => { e.preventDefault(); setMenuAnchor(e.currentTarget); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/50 rounded-lg transition-all"
      >
        <MoreHorizontal size={16} />
      </button>
      <AnimatePresence>
        {menuAnchor && (
          <ChatContextMenu 
            anchor={menuAnchor} 
            onClose={() => setMenuAnchor(null)} 
            isFolder={false} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};