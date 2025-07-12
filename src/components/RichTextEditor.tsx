import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-400 underline hover:text-blue-300',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[200px] p-4 bg-slate-700/50 rounded-lg border border-slate-600 focus-within:border-blue-500',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    if (showLinkInput) {
      if (linkUrl) {
        editor.chain().focus().setLink({ href: linkUrl }).run();
        setLinkUrl('');
      }
      setShowLinkInput(false);
    } else {
      setShowLinkInput(true);
    }
  };

  const addEmoji = () => {
    const emoji = window.prompt('Enter emoji:');
    if (emoji) {
      editor.chain().focus().insertContent(emoji).run();
    }
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-700/30 rounded-lg border border-slate-600">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`text-slate-400 hover:text-white ${editor.isActive('bold') ? 'bg-slate-600 text-white' : ''}`}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`text-slate-400 hover:text-white ${editor.isActive('italic') ? 'bg-slate-600 text-white' : ''}`}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`text-slate-400 hover:text-white ${editor.isActive('strike') ? 'bg-slate-600 text-white' : ''}`}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-slate-600 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`text-slate-400 hover:text-white ${editor.isActive('bulletList') ? 'bg-slate-600 text-white' : ''}`}
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`text-slate-400 hover:text-white ${editor.isActive('orderedList') ? 'bg-slate-600 text-white' : ''}`}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-slate-600 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`text-slate-400 hover:text-white ${editor.isActive({ textAlign: 'left' }) ? 'bg-slate-600 text-white' : ''}`}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`text-slate-400 hover:text-white ${editor.isActive({ textAlign: 'center' }) ? 'bg-slate-600 text-white' : ''}`}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`text-slate-400 hover:text-white ${editor.isActive({ textAlign: 'right' }) ? 'bg-slate-600 text-white' : ''}`}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-6 bg-slate-600 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addLink}
          className="text-slate-400 hover:text-white"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
          className="text-slate-400 hover:text-white"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addEmoji}
          className="text-slate-400 hover:text-white"
        >
          <Smile className="h-4 w-4" />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="bg-slate-700/50 border-slate-600 focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addLink()}
          />
          <Button type="button" onClick={addLink} size="sm">
            Add Link
          </Button>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};