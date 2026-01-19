type StaProps = {
  tag?: React.ElementType;
  children?: React.ReactNode;
};

export default function Sta({ tag: HTMLTag = 'div', children }: StaProps) {
  return <HTMLTag>{children}</HTMLTag>;
}
