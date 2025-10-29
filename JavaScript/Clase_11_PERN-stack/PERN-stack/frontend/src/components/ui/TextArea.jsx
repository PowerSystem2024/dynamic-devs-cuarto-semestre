import { forwardRef } from 'react';

export const TextArea = forwardRef(({ props, ref }) => {
  return (
    <textarea type="text" className='bg-zinc-800 px-3 py-2 block my-2 w-full' {...props} ref={ref}>
      {props.children}
    </textarea>
  );
});

export default TextArea;