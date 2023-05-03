export default function VuesaxBoldSearchNormal(
  props: VuesaxBoldSearchNormalProps
) {
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
          d="M 9.176 16.683 C 13.323 16.683 16.685 13.322 16.685 9.175 C 16.685 5.028 13.323 1.667 9.176 1.667 C 5.03 1.667 1.668 5.028 1.668 9.175 C 1.668 13.322 5.03 16.683 9.176 16.683 Z"
          fill="white"
         />
        <path
          d="M 18.327 15.792 C 18.052 15.283 17.468 15 16.685 15 C 16.093 15 15.585 15.242 15.285 15.658 C 14.985 16.075 14.918 16.633 15.102 17.192 C 15.46 18.275 16.085 18.517 16.427 18.558 C 16.477 18.567 16.527 18.567 16.585 18.567 C 16.952 18.567 17.518 18.408 18.068 17.583 C 18.51 16.942 18.593 16.3 18.327 15.792 Z"
          fill="white"
         />
      </svg>
    </div>
  );
}

VuesaxBoldSearchNormal.defaultProps = {
  className: "",
  style: {},
};

interface VuesaxBoldSearchNormalProps {
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