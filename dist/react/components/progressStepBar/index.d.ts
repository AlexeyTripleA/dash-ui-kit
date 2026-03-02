import React from 'react';
type ProgressColor = 'blue' | 'red' | 'orange';
interface ProgressStepBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
    color?: ProgressColor;
    colorLight?: ProgressColor;
    colorDark?: ProgressColor;
}
export declare function ProgressStepBar({ currentStep, totalSteps, className, color, colorLight, colorDark }: ProgressStepBarProps): React.JSX.Element;
export type { ProgressStepBarProps };
