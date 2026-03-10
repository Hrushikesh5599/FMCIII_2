import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Article } from '../../types';
import { useAuthStore } from '../../store/auth.store';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Plus, Search, BookOpen } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export default function KnowledgeBasePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);
  const { user } = useAuthStore();
  const { register, handleSubmit, reset } = useForm<{ title: string; content: string }>();

  useEffect(() => {
    api.get('/articles').then(r => setArticles(r.data.data || [])).catch(console.error);
  }, []);

  const onSubmit = async (data: { title: string; content: string }) => {
    try {
      const { data: res } = await api.post('/articles', data);
      setArticles(prev => [res.data, ...prev]);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        {(user?.role === 'ADMIN' || user?.role === 'MENTOR') && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-gray-300 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      </div>

      {selected ? (
        <div className="space-y-4">
          <button onClick={() => setSelected(null)} className="text-sm text-primary-600 hover:text-primary-700">
            ← Back to articles
          </button>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selected.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <span>{selected.author?.name || 'Unknown'}</span>
                <span>•</span>
                <span>{formatDate(selected.createdAt)}</span>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selected.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <Card
              key={article.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(article)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary-50 p-2">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{article.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-3">{article.content}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                      <span>{article.author?.name}</span>
                      <span>•</span>
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 py-12 text-center text-gray-500">
              No articles found
            </div>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Article" className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register('title', { required: true })}
              placeholder="Article title"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              {...register('content', { required: true })}
              rows={8}
              placeholder="Write your article content..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Publish</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
