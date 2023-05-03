export default function VuesaxBoldFrame(props: VuesaxBoldFrameProps) {
  return (
    <div className="w-5 h-5">
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10.001 1.667 C 7.818 1.667 6.043 3.442 6.043 5.625 C 6.043 7.767 7.718 9.5 9.901 9.575 C 9.968 9.567 10.035 9.567 10.085 9.575 C 10.101 9.575 10.11 9.575 10.126 9.575 C 10.135 9.575 10.135 9.575 10.143 9.575 C 12.276 9.5 13.951 7.767 13.96 5.625 C 13.96 3.442 12.185 1.667 10.001 1.667 Z"
          fill="white"
         />
        <path
          d="M 14.233 11.792 C 11.908 10.242 8.116 10.242 5.774 11.792 C 4.716 12.5 4.133 13.458 4.133 14.483 C 4.133 15.508 4.716 16.458 5.766 17.158 C 6.933 17.942 8.466 18.333 9.999 18.333 C 11.533 18.333 13.066 17.942 14.233 17.158 C 15.283 16.45 15.866 15.5 15.866 14.467 C 15.858 13.442 15.283 12.492 14.233 11.792 Z"
          fill="white"
         />
      </svg>
    </div>
  );
}

VuesaxBoldFrame.defaultProps = {
  className: "",
  style: {},
};

interface VuesaxBoldFrameProps {
  className: string;
  style: Object;
}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */