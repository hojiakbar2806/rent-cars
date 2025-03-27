type SectionHeaderProps = {
  title: string;
  step?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, step }) => {
  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-lg font-medium">{title}</h2>
      {step && <span className="text-gray-400 text-sm">Step {step} of 3</span>}
    </div>
  );
};

export default SectionHeader;
