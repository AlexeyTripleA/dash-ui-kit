import React from 'react';
import { type TimeDeltaFormat } from '../../utils/datetime';
export interface TimeDeltaProps {
    /** Start date for delta calculation, defaults to now */
    startDate?: Date | number | string;
    /** End date or timestamp */
    endDate: Date | number | string;
    /** Show tooltip with exact timestamp */
    showTimestampTooltip?: boolean;
    /** Override date for tooltip instead of endDate */
    tooltipDate?: Date | number | string;
    /** Format mode: 'default' shows delta and tooltip, 'detailed' suppresses tooltip */
    format?: TimeDeltaFormat;
}
/**
 * TimeDelta component renews a human-readable delta string periodically,
 * and optionally wraps it in a tooltip showing the exact date/time.
 */
export declare const TimeDelta: React.FC<TimeDeltaProps>;
export default TimeDelta;
