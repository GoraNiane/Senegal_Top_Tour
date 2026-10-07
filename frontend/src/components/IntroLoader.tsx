import React from 'react';
import { IntroExperience, IntroExperienceProps } from './IntroExperience';

export interface IntroLoaderProps extends IntroExperienceProps {}

export const IntroLoader: React.FC<IntroLoaderProps> = (props) => {
  return <IntroExperience {...props} />;
};

export default IntroLoader;
