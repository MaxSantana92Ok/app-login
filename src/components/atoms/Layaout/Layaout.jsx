import './Layaout.css';
export const Layaout = ({children}) => {
  return <div className="LP-Layout">{children}</div>;
};
export const LayaoutItem = ({children}) => {
  return <div className="LI-Layout animate__animated animate__fadeIn">{children}</div>;
};
