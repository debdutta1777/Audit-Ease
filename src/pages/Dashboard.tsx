import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, ArrowUpRight, Shield, Activity, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import { HealthScoreGauge } from '@/components/dashboard/HealthScoreGauge';
import { LiabilityCounter } from '@/components/dashboard/LiabilityCounter';
import { RiskClusterChart } from '@/components/dashboard/RiskClusterChart';
import { RecentAuditCard } from '@/components/dashboard/RecentAuditCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

export default function Dashboard() {
  const { user } = useAuth();
  const { subscription, auditsRemaining, isPaidPlan, isLoading: subLoading } = useSubscription();
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ healthScore: 0, totalLiability: 0, auditCount: 0 });

  useEffect(() => {
    if (user) fetchAudits();
  }, [user]);

  const fetchAudits = async () => {
    const { data } = await supabase
      .from('audits')
      .select(`*, standard:documents!audits_standard_document_id_fkey(name), subject:documents!audits_subject_document_id_fkey(name)`)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) {
      setAudits(data);
      const completed = data.filter(a => a.status === 'completed');
      if (completed.length > 0) {
        const avgHealth = completed.reduce((acc, a) => acc + (a.health_score || 0), 0) / completed.length;
        const totalLiab = completed.reduce((acc, a) => acc + (Number(a.total_liability_usd) || 0), 0);
        setStats({
          healthScore: Math.round(avgHealth),
          totalLiability: totalLiab,
          auditCount: data.length
        });
      }
    }
    setLoading(false);
  };

  const mockRiskData = [
    { name: 'Data Privacy', value: 40 },
    { name: 'Liability', value: 25 },
    { name: 'Termination', value: 20 },
    { name: 'IP Rights', value: 15 },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 pb-8">
        {/* Welcome Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent border border-cyan-500/20 p-8 md:p-12 animate-fade-in">
          {/* Decorative background elements */}
          <div className="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl filter" />
          <div className="absolute left-0 bottom-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl filter" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Good evening,{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {user?.email?.split('@')[0]}
                </span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Your compliance posture is looking stable. You have{' '}
                {subLoading ? (
                  <span className="font-semibold text-foreground">...</span>
                ) : isPaidPlan ? (
                  <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                    unlimited audits
                  </span>
                ) : (
                  <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {auditsRemaining} of {subscription?.free_audits_limit || 10} free audits
                  </span>
                )}{' '}
                {!isPaidPlan && 'remaining'}.
              </p>
            </div>
            <Link to="/audit/new">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-lg font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                  Start New Audit
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
            <Skeleton className="h-64 rounded-3xl" />
          </div>
        ) : audits.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-muted-foreground/25 bg-card/50 p-12 text-center">
            <div className="mb-6 rounded-full bg-primary/10 p-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">No audits yet</h2>
            <p className="mb-8 max-w-sm text-muted-foreground">Get started by uploading your first contract for AI-powered compliance analysis.</p>
            <Link to="/audit/new">
              <Button size="lg" className="rounded-full">Run Your First Audit</Button>
            </Link>
          </div>
        ) : (
          <div className="animate-slide-up grid gap-6 lg:grid-cols-3">
            {/* Health Score Card - Large (2 cols on large screens) */}
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 lg:col-span-1 border-primary/20 bg-gradient-to-b from-card/80 to-card/40">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Health Score</h3>
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                  +2.5% vs last week
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <HealthScoreGauge score={stats.healthScore} />
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Based on {stats.auditCount} active audits
                </p>
              </div>
            </div>

            {/* Liability Exposure Card */}
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 lg:col-span-1 border-destructive/20 bg-gradient-to-b from-card/80 to-card/40">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-destructive/10 p-2">
                    <TrendingUp className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground">Liability Exposure</h3>
                </div>
              </div>
              <div className="flex h-full flex-col justify-center pb-8">
                <LiabilityCounter amount={stats.totalLiability} planTier={subscription?.plan_tier || 'free'} />
                <p className="mt-2 text-center text-sm text-muted-foreground">Potential financial risk detected</p>
              </div>
            </div>

            {/* Risk Distribution Card */}
            <div className="glass-card relative overflow-hidden rounded-3xl p-6 lg:col-span-1 border-border/50 bg-gradient-to-b from-card/80 to-card/40">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Shield className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Risk Categories</h3>
              </div>
              <RiskClusterChart data={mockRiskData} />
            </div>

            {/* Recent Audits List - Full Width */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                <Link to="/vault" className="group flex items-center text-sm font-medium text-primary hover:text-primary/80">
                  View All Documents
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {audits.map((audit) => (
                  <RecentAuditCard
                    key={audit.id}
                    id={audit.id}
                    standardName={audit.standard?.name || 'Unknown'}
                    subjectName={audit.subject?.name || 'Unknown'}
                    healthScore={audit.health_score}
                    status={audit.status}
                    createdAt={audit.created_at}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout >
  );
}