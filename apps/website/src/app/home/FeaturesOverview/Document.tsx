export default function VuesaxBoldDocument(props: VuesaxBoldDocumentProps) {
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
          d="M 17.082 8.492 H 14.674 C 12.699 8.492 11.09 6.883 11.09 4.908 V 2.5 C 11.09 2.042 10.715 1.667 10.257 1.667 H 6.724 C 4.157 1.667 2.082 3.333 2.082 6.308 V 13.692 C 2.082 16.667 4.157 18.333 6.724 18.333 H 13.274 C 15.84 18.333 17.915 16.667 17.915 13.692 V 9.325 C 17.915 8.867 17.54 8.492 17.082 8.492 Z"
          fill="white"
         />
        <path
          d="M 13.168 1.842 C 12.826 1.5 12.234 1.733 12.234 2.208 V 5.117 C 12.234 6.333 13.268 7.342 14.526 7.342 C 15.318 7.35 16.418 7.35 17.359 7.35 C 17.834 7.35 18.084 6.792 17.751 6.458 C 16.551 5.25 14.401 3.075 13.168 1.842 Z"
          fill="white"
         />
      </svg>
    </div>
  );
}

VuesaxBoldDocument.defaultProps = {
  className: "",
  style: {},
};

interface VuesaxBoldDocumentProps {
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