/// <reference types="react" />

declare namespace React {
  interface Attributes {
    key?: Key | null;
  }
}

declare namespace JSX {
  interface IntrinsicAttributes extends React.Attributes {}
}
