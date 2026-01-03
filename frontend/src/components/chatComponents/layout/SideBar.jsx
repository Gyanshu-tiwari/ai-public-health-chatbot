import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Library, ChevronRight } from 'lucide-react';
import { SidebarLink } from '../ui/SideBarLink';
import { ChatNavItem } from '../navigation/ChatNavItem';
import { FolderItem } from '../navigation/FolderItem';
import { SearchDialog, NewFolderDialog } from '../ui/Dialogs';
import { AccountMenu } from '../ui/ContextMenu';
import { AnimatePresence } from 'framer-motion';

const Sidebar = ({ chats, setChats }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat = { id: newId, title: 'New Conversation', folder: null };
    setChats([newChat, ...chats]);
    navigate(`/chat/${newId}`);
  };

  return (
    <aside className="w-72 border-r border-white/20 p-6 flex flex-col bg-white/10 relative">
      

      <button 
        onClick={createNewChat}
        className="w-full bg-neutral-600/40 hover:bg-neutral-500/40 text-zinc-100 text-sm group transition-all py-3 rounded-2xl border border-white/50 shadow-sm flex items-center justify-center gap-2 mb-6 font-semibold"
      >
        <Plus size={20} /> New chat
      </button>

      <nav className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
        <SidebarLink icon={<Search size={18}/>} label="Search chat" onClick={() => setShowSearch(true)} />
        <SidebarLink icon={<Library size={18}/>} label="Library" />
        
        <div className="pt-6 pb-2 flex justify-between items-center px-3">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Your chats</span>
        </div>
        {chats.filter(c => !c.folder).map(chat => (
          <ChatNavItem key={chat.id} chat={chat} />
        ))}

        <div className="pt-6 pb-2 flex justify-between items-center px-3">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Folders</span>
          <Plus size={14} className="text-zinc-400 cursor-pointer hover:text-slate-600" onClick={() => setShowFolderDialog(true)} />
        </div>
        <FolderItem label="Branding" color="text-pink-500" items={chats.filter(c => c.folder === 'Branding')} />
        <FolderItem label="Web Development" color="text-blue-500" items={chats.filter(c => c.folder === 'Web Development')} />
      </nav>

      {/* Account Profile Box */}
      <div 
        onClick={(e) => setAccountMenuAnchor(e.currentTarget)}
        className="mt-6 bg-neutral-600/40 p-4 rounded-3xl flex items-center gap-3 border border-white/50 shadow-sm group cursor-pointer hover:bg-neutral-500/40 transition-all"
      >
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-md">GT</div>
        <div className="flex-1">
          <p className="text-sm font-bold leading-none">Gyanshu Tiwari</p>
          <p className="text-[10px] text-slate-400 mt-1 font-medium">Go</p>
        </div>
        <ChevronRight size={16} className="text-slate-400" />
      </div>
      
      {/* Modals Overlay */}
      <AnimatePresence>
        {showSearch && (
          <SearchDialog 
            onClose={() => setShowSearch(false)} 
            items={chats} 
            onSelect={(id) => { navigate(`/chat/${id}`); setShowSearch(false); }} 
          />
        )}
        {showFolderDialog && <NewFolderDialog onClose={() => setShowFolderDialog(false)} />}
        {accountMenuAnchor && <AccountMenu anchor={accountMenuAnchor} onClose={() => setAccountMenuAnchor(null)} />}
      </AnimatePresence>
    </aside>
  );
};

export default Sidebar;