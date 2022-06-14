<template>
  <svg
    version="1.1"
    id="L9"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enable-background="new 0 0 0 0"
    xml:space="preserve"
    width="32"
    height="32"
  >
    <defs>
      <linearGradient id="Gradient1">
        <stop class="stop1" offset="0%"></stop>
        <stop class="stop2" offset="25%"></stop>
        <stop class="stop3" offset="50%"></stop>
        <stop class="stop4" offset="100%"></stop>
      </linearGradient>
    </defs>

    <path
      id="loader"
      d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      stroke-width="2"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="1s"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      ></animateTransform>
    </path>
  </svg>
</template>

<style>
#loader {
  fill: url(#Gradient1);
}
.stop1 {
  stop-color: #4285f4;
}
.stop2 {
  stop-color: #34a853;
}
.stop3 {
  stop-color: #fbbc05;
}
.stop4 {
  stop-color: #ea4335;
}
</style>
