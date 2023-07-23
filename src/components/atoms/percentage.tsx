const percentage = (children) => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="-25 -25 250 250"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={"transform:rotate(-90deg)"}>
      <circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke="#e0e0e0"
        stroke-width="16px"
        stroke-dasharray="565.48px"
        stroke-dashoffset="0"></circle>
      <circle
        r="90"
        cx="100"
        cy="100"
        stroke="#76e5b1"
        stroke-width="16px"
        stroke-linecap="round"
        stroke-dashoffset="118.692px"
        fill="transparent"
        stroke-dasharray="565.48px"></circle>
      <text
        x="73px"
        y="118px"
        fill="#6bdba7"
        font-size="52px"
        font-weight="bold"
        style="transform:rotate(90deg) translate(0px, -196px)">
        {children}
      </text>
    </svg>
  );
};

export default percentage;
