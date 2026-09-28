import React from 'react';
import { UIPost, UIPostProps } from './UIPost';

export interface CreatePostModalProps extends UIPostProps {}

export const CreatePostModal: React.FC<CreatePostModalProps> = (props) => {
  return <UIPost {...props} />;
};

export { UIPost };
export default CreatePostModal;
