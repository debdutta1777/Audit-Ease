import { useState } from 'react';
import { Check, Star, Lock, Users, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useSubscription } from '@/hooks/useSubscription';

export default function Billing() {
    const [loading, setLoading] = useState<string | null>(null);
    const [isAnnual, setIsAnnual] = useState(false);
    const { subscription, upgradePlan, refreshSubscription } = useSubscription();

    const handleSubscribe = async (planId: string) => {
        if (planId === 'starter') {
            toast.info('You are already on the free plan');
            return;
        }

        setLoading(planId);
        try {
            const planTier = planId as 'professional' | 'enterprise';
            await upgradePlan(planTier, isAnnual ? 'annual' : 'monthly');

            toast.success(`Successfully upgraded to ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`, {
                description: isAnnual ? 'Annual billing activated' : 'Monthly billing activated',
            });

            await refreshSubscription();
        } catch (error) {
            console.error('Upgrade error:', error);
            toast.error('Failed to upgrade plan', {
                description: error instanceof Error ? error.message : 'Please try again later',
            });
        } finally {
            setLoading(null);
        }
    };

    const currentPlanId = subscription?.plan_tier === 'professional' ? 'pro' :
        subscription?.plan_tier === 'enterprise' ? 'enterprise' : 'starter';

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            monthlyPrice: 0,
            description: 'Essential compliance tools for small teams.',
            features: ['10 Free Audits', 'Basic Compliance Standards', 'PDF Export', 'Email Support'],
            current: currentPlanId === 'starter',
            popular: false,
        },
        {
            id: 'pro',
            name: 'Professional',
            monthlyPrice: 49,
            description: 'Advanced AI analysis for growing legal teams.',
            features: [
                'Unlimited Audits',
                'Advanced Gap Analysis',
                'Chat with Contract (AI)',
                'Priority Support',
                'Custom Standards'
            ],
            current: currentPlanId === 'pro',
            popular: true,
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            monthlyPrice: null,
            description: 'Full-scale automation for large organizations.',
            features: [
                'Dedicated Success Manager',
                'API Access',
                'SSO & Advanced Security',
                'Custom AI Model Training',
                'SLA & Audit Logs'
            ],
            current: currentPlanId === 'enterprise',
            popular: false,
        }
    ];

    const getPrice = (monthlyPrice: number | null) => {
        if (monthlyPrice === null) return 'Custom';
        if (monthlyPrice === 0) return '$0';
        if (isAnnual) {
            return `$${Math.round(monthlyPrice * 0.8)}`;
        }
        return `$${monthlyPrice}`;
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto space-y-12 pb-16">
                {/* Header */}
                <div className="text-center space-y-4 animate-slide-up">
                    <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
                        Pricing
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Simple, Transparent
                        </span>
                        {' '}Pricing
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that fits your team's needs. All plans include a 14-day free trial.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
                        Monthly
                    </span>
                    <Switch
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
                    />
                    <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                        Annual
                    </span>
                    {isAnnual && (
                        <span className="ml-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400 animate-fade-in">
                            Save 20%
                        </span>
                    )}
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {plans.map((plan, i) => (
                        <div
                            key={plan.id}
                            className={`animate-slide-up relative rounded-2xl border p-8 backdrop-blur-md transition-all duration-300 ${plan.popular
                                ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 lg:scale-105 shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                                : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600'
                                }`}
                            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="mb-2 text-xl font-semibold text-white">{plan.name}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{getPrice(plan.monthlyPrice)}</span>
                                    {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
                                        <span className="text-gray-400">/{isAnnual ? 'month' : 'mo'}</span>
                                    )}
                                </div>
                                {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && isAnnual && (
                                    <p className="mt-1 text-sm text-emerald-400">
                                        Billed annually (${Math.round(plan.monthlyPrice * 0.8 * 12)}/year)
                                    </p>
                                )}
                            </div>

                            <ul className="mb-8 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full py-6 font-semibold transition-all ${plan.popular
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'
                                    : 'border-slate-600 bg-slate-800 text-white hover:bg-slate-700'
                                    }`}
                                variant={plan.popular ? 'default' : 'outline'}
                                disabled={plan.current || loading === plan.id}
                                onClick={() => !plan.current && handleSubscribe(plan.id)}
                            >
                                {loading === plan.id ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : plan.current ? (
                                    'Current Plan'
                                ) : plan.id === 'enterprise' ? (
                                    'Contact Sales'
                                ) : (
                                    'Start Free Trial'
                                )}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Trust badges */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    {[
                        { icon: Lock, text: 'SOC 2 Type II Certified' },
                        { icon: Shield, text: 'GDPR Compliant' },
                        { icon: Star, text: '4.9/5 on G2 Reviews' },
                        { icon: Users, text: '24/7 Support' },
                    ].map((badge) => (
                        <div key={badge.text} className="flex items-center gap-2 transition-colors hover:text-gray-300">
                            <badge.icon className="h-4 w-4 text-cyan-400" />
                            {badge.text}
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
