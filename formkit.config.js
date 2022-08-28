import { generateClasses } from '@formkit/themes';
import { createAutoAnimatePlugin } from '@formkit/addons';
import { createThemePlugin } from '@formkit/themes';

export default {
  plugins: [
    createAutoAnimatePlugin(),
    createThemePlugin()
  ],
  // config: {
  //   classes: generateClasses({
  //     global: {
  //       help: 'text-xs text-gray-500',
  //       messages: 'list-none p-0 mt-1 mb-0',
  //       message: 'text-red-500 mb-1 text-xs'
  //     },
  //     text: {
  //       outer: 'w-10/12',
  //       label: 'block mb-1 font-bold text-sm',
  //       inner: 'w-full rounded-xl mb-1 lg:mb-4 overflow-hidden focus-within:border-secondary focus-within:shadow-lg formkit-invalid:border-red-500',
  //       input: 'w-full h-[50px] px-3 border-none text-base text-pri-dark bg-orange-bg focus:bg-white placeholder-gray-400',
  //     },
  //   })
  // }
}