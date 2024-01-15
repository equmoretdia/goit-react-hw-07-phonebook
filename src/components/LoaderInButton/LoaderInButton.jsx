import { Hourglass } from 'react-loader-spinner';

import css from './LoaderInButton.module.css';

const LoaderInButton = () => {
  return (
    <div className={css.wrapper}>
      <Hourglass
        visible={true}
        height="18"
        width="18"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#e3e3ee', '#e3e3ee']}
      />
    </div>
  );
};

export default LoaderInButton;
