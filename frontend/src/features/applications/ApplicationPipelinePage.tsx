import { useEffect, useState } from 'react';
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, closestCorners,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { api } from '../../lib/api';
import { Application, ApplicationStatus } from '../../types';
import { useAuthStore } from '../../store/auth.store';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { GripVertical, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useForm } from 'react-hook-form';
import { useStartupStore } from '../../store/startup.store';

const STAGES: { id: ApplicationStatus; label: string; color: string }[] = [
  { id: 'APPLIED', label: 'Applied', color: 'bg-blue-50 border-blue-200' },
  { id: 'INTERVIEW', label: 'Interview', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'SELECTED', label: 'Selected', color: 'bg-green-50 border-green-200' },
];

function ApplicationCard({ application, isDragging }: { application: Application; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-2">
        <button {...attributes} {...listeners} className="mt-0.5 cursor-grab text-gray-300 hover:text-gray-500">
          <GripVertical className="h-5 w-5" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{application.startup?.name || 'Unknown Startup'}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(application.submittedAt).toLocaleDateString()}
          </p>
          {application.pitchDeckUrl && (
            <a href={application.pitchDeckUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:text-primary-700 mt-1 block">
              View Pitch Deck
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplicationPipelinePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { startups, fetchStartups } = useStartupStore();
  const { register, handleSubmit, reset } = useForm<{ startupId: string; pitchDeckUrl: string }>();
  const isAdmin = user?.role === 'ADMIN';

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  useEffect(() => {
    api.get('/applications').then(r => setApplications(r.data.data || [])).catch(console.error);
    fetchStartups();
  }, [fetchStartups]);

  const getAppsByStage = (stage: ApplicationStatus) =>
    applications.filter(a => a.status === stage);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !isAdmin) return;

    const overId = over.id as string;
    const stage = STAGES.find(s => s.id === overId);
    if (!stage) return;

    const app = applications.find(a => a.id === active.id);
    if (!app || app.status === stage.id) return;

    try {
      await api.patch(`/applications/${active.id}/stage`, { stage: stage.id });
      setApplications(prev => prev.map(a => a.id === active.id ? { ...a, status: stage.id } : a));
    } catch (error) {
      console.error('Failed to update application stage:', error);
    }
  };

  const onSubmit = async (data: { startupId: string; pitchDeckUrl: string }) => {
    try {
      const { data: res } = await api.post('/applications', data);
      setApplications(prev => [...prev, res.data]);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create application:', error);
    }
  };

  const activeApp = activeId ? applications.find(a => a.id === activeId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Application Pipeline</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STAGES.map((stage) => {
            const stageApps = getAppsByStage(stage.id);
            return (
              <div key={stage.id} className={`rounded-lg border-2 p-4 ${stage.color}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">{stage.label}</h2>
                  <Badge variant="default">{stageApps.length}</Badge>
                </div>
                <SortableContext
                  id={stage.id}
                  items={stageApps.map(a => a.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 min-h-[200px]">
                    {stageApps.map((app) => (
                      <ApplicationCard key={app.id} application={app} />
                    ))}
                    {stageApps.length === 0 && (
                      <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm text-gray-400">Drop here</p>
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeApp && <ApplicationCard application={activeApp} isDragging />}
        </DragOverlay>
      </DndContext>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Application">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup</label>
            <select
              {...register('startupId', { required: true })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="">Select a startup</option>
              {startups.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pitch Deck URL</label>
            <input
              {...register('pitchDeckUrl')}
              type="url"
              placeholder="https://..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Submit</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
