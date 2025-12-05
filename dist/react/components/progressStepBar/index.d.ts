import React from 'react';
interface ProgressStepBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
    color?: 'blue' | 'red';
}
export declare function ProgressStepBar({ currentStep, totalSteps, className, color }: ProgressStepBarProps): React.JSX.Element;
export type { ProgressStepBarProps };
