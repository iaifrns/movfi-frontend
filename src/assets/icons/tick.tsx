const TickIcon = ({
  color,
  w,
  h,
}: {
  color?: string;
  w?: string;
  h?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w ? w : "1em"}
      height={h ? h : "1em"}
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        fill="none"
        stroke={color ? color : "currentColor"}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11"
      />
    </svg>
  );
};

export default TickIcon;
