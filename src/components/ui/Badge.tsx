import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 shadow-xs shadow-indigo-950/50',
        secondary:
          'bg-slate-800/80 text-slate-300 border border-slate-700/60',
        success:
          'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60',
        warning:
          'bg-amber-950/80 text-amber-300 border border-amber-800/60',
        outline:
          'text-slate-300 border border-slate-700 bg-slate-900/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
