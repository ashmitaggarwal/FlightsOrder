import './spinner.component.css'

interface SpinnerProps {
  size?: string;
  position?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ position, size }): JSX.Element => {
  const modifierPosition = position ? `spinner-${position}` : "";
  const modifierSize = size ? `spinner-${size}` : "";

  return (
    <div
      data-testid="spinner"
      className={`spinner ${modifierPosition} ${modifierSize}`}
      title={'Loading'}
    ></div>
  );
};

export default Spinner;
