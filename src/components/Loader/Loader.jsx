import { Hourglass } from 'react-loader-spinner';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <Hourglass
        visible={true}
        height="60"
        width="60"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#383848']}
      />
    </div>
  );
};

export default Loader;
