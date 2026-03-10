import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { EvaluationCriteria, Application } from '../../types';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useForm } from 'react-hook-form';
import { Modal } from '../../components/ui/Modal';
import { Plus } from 'lucide-react';

interface ScorecardForm {
  applicationId: string;
  remarks: string;
  scores: Array<{ criteriaId: string; score: number }>;
}

export default function ScorecardPage() {
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<ScorecardForm>({
    defaultValues: { scores: [] },
  });

  useEffect(() => {
    api.get('/scorecards/criteria').then(r => setCriteria(r.data.data || [])).catch(console.error);
    api.get('/applications').then(r => setApplications(r.data.data || [])).catch(console.error);
  }, []);

  useEffect(() => {
    if (criteria.length > 0) {
      setValue('scores', criteria.map(c => ({ criteriaId: c.id, score: 0 })));
    }
  }, [criteria, setValue]);

  const onSubmit = async (data: ScorecardForm) => {
    try {
      await api.post('/scorecards', data);
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create scorecard:', error);
    }
  };

  const handleSeedCriteria = async () => {
    try {
      const { data } = await api.post('/scorecards/criteria/seed');
      setCriteria(data.data || []);
    } catch (error) {
      console.error('Failed to seed criteria:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Evaluation Scorecards</h1>
        <div className="flex gap-3">
          {criteria.length === 0 && (
            <Button variant="outline" onClick={handleSeedCriteria}>Initialize Criteria</Button>
          )}
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Scorecard
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Evaluation Criteria</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((c) => (
              <div key={c.id} className="rounded-lg border border-gray-200 p-4">
                <p className="font-medium text-gray-900">{c.name}</p>
                <p className="mt-1 text-sm text-gray-500">Weight: {c.weight}x</p>
              </div>
            ))}
            {criteria.length === 0 && (
              <p className="col-span-3 text-center text-gray-500 py-4">
                No criteria defined. Click "Initialize Criteria" to add defaults.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Scorecard" className="max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application</label>
            <select
              {...register('applicationId', { required: true })}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="">Select an application</option>
              {applications.map(a => (
                <option key={a.id} value={a.id}>{a.startup?.name} - {a.status}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Scores (0-10)</p>
            {criteria.map((c, idx) => (
              <div key={c.id} className="flex items-center gap-3">
                <input type="hidden" {...register(`scores.${idx}.criteriaId`)} value={c.id} />
                <span className="flex-1 text-sm text-gray-700">{c.name}</span>
                <input
                  {...register(`scores.${idx}.score`, { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  defaultValue={0}
                  className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm text-center focus:border-primary-500 focus:outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
            <textarea
              {...register('remarks')}
              rows={3}
              placeholder="Add evaluation remarks..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">Submit Scorecard</Button>
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
