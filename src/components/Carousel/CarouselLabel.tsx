interface Props {
  name: string;
}

const CarouselLabel: React.FC<Props> = ({ name }) => {
  return <div className="carousel__label">{name}</div>;
};

export default CarouselLabel;
