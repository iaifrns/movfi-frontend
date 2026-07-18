const MenuIcon = ({
  w,
  h,
  color,
}: {
  w?: string;
  h?: string;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w ? w : "1em"}
      height={h ? h : "1em"}
      viewBox="-5 -7 24 24"
    >
      <path d="M-5 -7h24v24H-5z" fill="none" />
      <path
        fill={color ? color : "currentColor"}
        d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"
      />
    </svg>
  );
};

export default MenuIcon;
