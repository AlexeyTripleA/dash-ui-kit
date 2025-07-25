import React from 'react';
interface ProgressStepBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}
export declare function ProgressStepBar({ currentStep, totalSteps, className }: ProgressStepBarProps): React.JSX.Element;
export type { ProgressStepBarProps };
