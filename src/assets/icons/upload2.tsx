const Upload2Icon = ({
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
        stroke-width="2"
        d="M8 9H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2m-4-6v11m2.5-8.5L12 3L9.5 5.5"
      />
    </svg>
  );
};

export default Upload2Icon;
