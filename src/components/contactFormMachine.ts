import { Step } from '../types/contactTypes';

const steps: Step[] = ['name', 'service', 'email', 'message', 'done'];

export function getNextStep(current: Step): Step {
  const currentIndex = steps.indexOf(current);
  return steps[currentIndex + 1] || 'done';
}