export default function Highlight({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-full md:w-1/3 justify-center text-center">
      {icon}
      <h3 className="text-2xl font-bold text-gray-800 mt-4 font-['Space_Grotesk']">{title}</h3>
      <p className="text-gray-600 mt-2 font-[Satoshi]">{description}</p>
    </div>
  )
}